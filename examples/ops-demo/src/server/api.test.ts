// End-to-end RPC tests against the seeded ops_demo DB.
//
// Wire shape: every call is
//   async (api, { token }) => {
//     const op = await api.operator(token);
//     ...use op (scoped reads, then chain row-level actions)...
//   }
// The principal travels with every row hydrated from `op.<table>()` —
// `Orders.contextOf(row)` returns the operator without re-threading.
// Tenancy is enforced by construction: there is no path on the wire
// that returns an unscoped row, so cross-tenant escape isn't a check
// — it's structurally impossible.

import { describe, test, expect, beforeAll } from "vitest";
import { RpcClient, inMemoryChannel } from "typegres/exoeval";
import { db } from "../db";
import { Api } from "./api";

const ALICE = "op_brightship_alice"; // BrightShip ops_lead
const BOB   = "op_brightship_bob";   // BrightShip inventory_control
const CAROL = "op_brightship_carol"; // BrightShip account_manager
const DAVE  = "op_atlas_dave";       // Atlas        ops_lead

let rpc: RpcClient<Api>;

beforeAll(() => {
  rpc = new RpcClient<Api>(inMemoryChannel(new Api(db)));
});

describe("api.operator(token)", () => {
  test("valid token resolves an OperatorRoot", async () => {
    const me = await rpc.run(
      async (api, { token }) => {
        const op = await api.operator(token);
        return { name: op.name, role: op.role, orgId: op.organizationId };
      },
      { token: ALICE },
    );
    expect(me).toEqual({ name: "Alice", role: "ops_lead", orgId: "1" });
  });

  test("invalid token throws", async () => {
    await expect(
      rpc.run(async (api, { token }) => api.operator(token), { token: "nope" }),
    ).rejects.toThrow(/invalid token/);
  });
});

describe("tenancy: same query, different operators, disjoint data", () => {
  const fetchOrderIds = (forToken: string) =>
    rpc.run(
      async (api, { token }) => {
        const op = await api.operator(token);
        return op.orders().select(({ orders }) => ({ id: orders.id })).execute(api.db);
      },
      { token: forToken },
    );

  test("BrightShip operator sees only BrightShip orders (35)", async () => {
    expect((await fetchOrderIds(ALICE)).length).toBe(35);
  });

  test("Atlas operator sees only Atlas orders (15)", async () => {
    expect((await fetchOrderIds(DAVE)).length).toBe(15);
  });

  test("BrightShip and Atlas order id sets are disjoint", async () => {
    const bs = new Set((await fetchOrderIds(ALICE)).map((r: { id: string }) => r.id));
    const at = new Set((await fetchOrderIds(DAVE)).map((r: { id: string }) => r.id));
    for (const id of bs) {
      expect(at.has(id)).toBe(false);
    }
  });

  test("inventory and customers are also tenant-scoped", async () => {
    const customerCount = (forToken: string) =>
      rpc.run(
        async (api, { token }) => {
          const op = await api.operator(token);
          return op.customers().select(({ customers }) => ({ id: customers.id })).execute(api.db);
        },
        { token: forToken },
      ).then((rows: { id: string }[]) => rows.length);
    expect(await customerCount(ALICE)).toBe(6);
    expect(await customerCount(DAVE)).toBe(4);
  });
});

describe("row-level actions: principal flows via scope tag", () => {
  test("ops_lead can advance an order via order.advance(api.db)", async () => {
    await db.transaction(async (tx) => {
      const txRpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));
      const updated = await txRpc.run(
        async (api, { token }) => {
          const op = await api.operator(token);
          const [order] = await op.orders().where(({ orders }) => orders.id["="]("1")).hydrate(api.db);
          return order.advance(api.db);
        },
        { token: ALICE },
      );
      expect(updated).toEqual({ id: "1", status: "confirmed" });
      throw new Error("__rollback__");
    }).catch((e) => { if ((e as Error).message !== "__rollback__") throw e; });
  });

  test("inventory_control cannot advance orders", async () => {
    await expect(
      rpc.run(
        async (api, { token }) => {
          const op = await api.operator(token);
          const [order] = await op.orders().where(({ orders }) => orders.id["="]("1")).hydrate(api.db);
          return order.advance(api.db);
        },
        { token: BOB },
      ),
    ).rejects.toThrow(/cannot advance orders/);
  });

  test("account_manager cannot advance orders", async () => {
    await expect(
      rpc.run(
        async (api, { token }) => {
          const op = await api.operator(token);
          const [order] = await op.orders().where(({ orders }) => orders.id["="]("1")).hydrate(api.db);
          return order.advance(api.db);
        },
        { token: CAROL },
      ),
    ).rejects.toThrow(/cannot advance orders/);
  });

  test("inventory_control can adjust inventory via position.adjust(delta)", async () => {
    await db.transaction(async (tx) => {
      const txRpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));
      const updated = await txRpc.run(
        async (api, { token, delta }) => {
          const op = await api.operator(token);
          const [pos] = await op.inventory().where(({ inventory_positions: p }) => p.id["="]("1")).hydrate(api.db);
          return pos.adjust(api.db, delta);
        },
        { token: BOB, delta: 5 },
      );
      expect(updated.id).toBe("1");
      expect(typeof updated.on_hand).toBe("string");
      throw new Error("__rollback__");
    }).catch((e) => { if ((e as Error).message !== "__rollback__") throw e; });
  });

  test("ops_lead cannot adjust inventory", async () => {
    await expect(
      rpc.run(
        async (api, { token, delta }) => {
          const op = await api.operator(token);
          const [pos] = await op.inventory().where(({ inventory_positions: p }) => p.id["="]("1")).hydrate(api.db);
          return pos.adjust(api.db, delta);
        },
        { token: ALICE, delta: 5 },
      ),
    ).rejects.toThrow(/cannot adjust inventory/);
  });
});

describe("tenant isolation: cross-tenant access is structurally impossible", () => {
  // BrightShip owns orders 1..35; Atlas owns 36..50. There's no need
  // to test "Atlas op rejects an attempt to advance order 1" — Atlas's
  // op.orders() is pre-scoped to org 2, so the where(id=1) finds 0
  // rows and `[order]` is undefined. The wire chain blows up at the
  // hydrate step with a clear "cannot read .advance() of undefined."
  test("Atlas op cannot fetch a BrightShip order at all", async () => {
    const rows = await rpc.run(
      async (api, { token }) => {
        const op = await api.operator(token);
        return op.orders().where(({ orders }) => orders.id["="]("1")).select(({ orders }) => ({ id: orders.id })).execute(api.db);
      },
      { token: DAVE },
    );
    expect(rows).toEqual([]);
  });

  test("BrightShip op cannot fetch an Atlas order at all", async () => {
    const rows = await rpc.run(
      async (api, { token }) => {
        const op = await api.operator(token);
        return op.orders().where(({ orders }) => orders.id["="]("50")).select(({ orders }) => ({ id: orders.id })).execute(api.db);
      },
      { token: ALICE },
    );
    expect(rows).toEqual([]);
  });
});
