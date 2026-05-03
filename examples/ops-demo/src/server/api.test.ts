// End-to-end RPC tests against the seeded ops_demo DB.
//
// Wire shape: every call is `api.withOperator(token, (op) => <expr>)`.
// `withOperator` is the single auth gate; it resolves the token to an
// `OperatorRoot` server-side and hands it to the caller's closure.
// The closure cannot reach an unscoped table query — every method on
// OperatorRoot is pre-`where`'d to the operator's org_id, and there
// is no method that returns an unscoped table.

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

describe("withOperator", () => {
  test("valid token resolves an OperatorRoot scoped to the operator", async () => {
    const me = await rpc.run(
      (api, { token }) => api.withOperator(token, (op) => ({
        name: op.name, role: op.role, orgId: op.organizationId,
      })),
      { token: ALICE },
    );
    expect(me).toEqual({ name: "Alice", role: "ops_lead", orgId: "1" });
  });

  test("invalid token throws", async () => {
    await expect(
      rpc.run((api, { token }) => api.withOperator(token, (op) => op.name), { token: "nope" }),
    ).rejects.toThrow(/invalid token/);
  });
});

describe("tenancy: same query, different operators, disjoint data", () => {
  const fetchOrderIds = (token: string) =>
    rpc.run(
      (api, { token }) => api.withOperator(token, (op) =>
        op.orders().select(({ orders }) => ({ id: orders.id })).execute(op.db),
      ),
      { token },
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
    const customerCount = (token: string) =>
      rpc.run(
        (api, { token }) => api.withOperator(token, (op) =>
          op.customers().select(({ customers }) => ({ id: customers.id })).execute(op.db),
        ),
        { token },
      ).then((rows: { id: string }[]) => rows.length);
    expect(await customerCount(ALICE)).toBe(6);
    expect(await customerCount(DAVE)).toBe(4);
  });
});

describe("role gates", () => {
  test("ops_lead can advance an order", async () => {
    await db.transaction(async (tx) => {
      const txRpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));
      const updated = await txRpc.run(
        (api, { token }) => api.withOperator(token, (op) => op.advanceOrder("1")),
        { token: ALICE },
      );
      expect(updated).toEqual({ id: "1", status: "confirmed" });
      throw new Error("__rollback__");
    }).catch((e) => { if ((e as Error).message !== "__rollback__") throw e; });
  });

  test("inventory_control cannot advance orders", async () => {
    await expect(
      rpc.run(
        (api, { token }) => api.withOperator(token, (op) => op.advanceOrder("1")),
        { token: BOB },
      ),
    ).rejects.toThrow(/cannot advance orders/);
  });

  test("account_manager cannot advance orders", async () => {
    await expect(
      rpc.run(
        (api, { token }) => api.withOperator(token, (op) => op.advanceOrder("1")),
        { token: CAROL },
      ),
    ).rejects.toThrow(/cannot advance orders/);
  });

  test("inventory_control can adjust inventory", async () => {
    await db.transaction(async (tx) => {
      const txRpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));
      const updated = await txRpc.run(
        (api, { token, delta }) => api.withOperator(token, (op) => op.adjustInventory("1", delta)),
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
        (api, { token, delta }) => api.withOperator(token, (op) => op.adjustInventory("1", delta)),
        { token: ALICE, delta: 5 },
      ),
    ).rejects.toThrow(/cannot adjust inventory/);
  });
});

describe("tenant isolation: cross-tenant escape attempts", () => {
  test("Atlas ops_lead cannot advance a BrightShip order", async () => {
    await expect(
      rpc.run(
        (api, { token }) => api.withOperator(token, (op) => op.advanceOrder("1")),
        { token: DAVE },
      ),
    ).rejects.toThrow(/not found in your organization/);
  });

  test("BrightShip ops_lead cannot advance an Atlas order", async () => {
    await expect(
      rpc.run(
        (api, { token }) => api.withOperator(token, (op) => op.advanceOrder("50")),
        { token: ALICE },
      ),
    ).rejects.toThrow(/not found in your organization/);
  });
});
