// End-to-end RPC tests against the seeded ops_demo DB.
//
// Each test composes a typegres expression client-side and ships it
// through `inMemoryChannel` (same wire shape exoeval uses for the HTTP
// /rpc endpoint — string in, JSON out). Mutation tests use a transaction
// rollback so the DB stays at its seeded state.

import { describe, test, expect, beforeAll } from "vitest";
import { RpcClient, inMemoryChannel } from "typegres/exoeval";
import { db } from "../db";
import { Api } from "./api";

let rpc: RpcClient<Api>;

beforeAll(() => {
  rpc = new RpcClient<Api>(inMemoryChannel(new Api(db)));
});

describe("RPC: read", () => {
  test("orders().select(...) returns seeded rows with predictable shape", async () => {
    const rows = await rpc.run((api) =>
      api
        .orders()
        .select(({ orders }) => ({ id: orders.id, status: orders.status }))
        .execute(api.db),
    );
    expect(rows.length).toBe(50);
    for (const r of rows.slice(0, 5)) {
      expect(typeof r.id).toBe("string");
      expect(typeof r.status).toBe("string");
    }
  });

  test("orders().where(status='packed') returns the 10 packed orders", async () => {
    const rows = await rpc.run((api) =>
      api
        .orders()
        .where(({ orders }) => orders.status["="]("packed"))
        .select(({ orders }) => ({ id: orders.id }))
        .execute(api.db),
    );
    expect(rows.length).toBe(10);
  });

  test("captures pass through to typegres expression", async () => {
    const status = "shipped";
    const rows = await rpc.run(
      (api) =>
        api
          .orders()
          .where(({ orders }) => orders.status["="](status))
          .select(({ orders }) => ({ id: orders.id }))
          .execute(api.db),
      { status },
    );
    expect(rows.length).toBe(10);
  });
});

describe("RPC: relation traversal (verifies @tool() on relation methods)", () => {
  test("customer().select() from an order returns the linked customer", async () => {
    // Order id=1 → customer_id=1 → "Acme Corp"
    const rows = await rpc.run((api) =>
      api
        .orders()
        .where(({ orders }) => orders.id["="]("1"))
        .select(({ orders }) => ({
          orderId: orders.id,
          customer: orders.customer().select(({ customers }) => ({ name: customers.name })).scalar(),
        }))
        .execute(api.db),
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]!.customer).toEqual({ name: "Acme Corp" });
  });
});

describe("RPC: mutation capability", () => {
  test("advanceOrder('1') moves draft → confirmed", async () => {
    // Order 1 is seeded as 'draft'. Wrap in a savepoint-style txn that
    // rolls back so the seed stays intact for other tests.
    await db.transaction(async (tx) => {
      const txRpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));
      const updated = await txRpc.run((api) => api.advanceOrder("1"));
      expect(updated).toEqual({ id: "1", status: "confirmed" });
      throw new Error("__rollback__");
    }).catch((e) => {
      if ((e as Error).message !== "__rollback__") throw e;
    });

    // After rollback the original status is back.
    const [row] = await rpc.run((api) =>
      api.orders().where(({ orders }) => orders.id["="]("1"))
        .select(({ orders }) => ({ status: orders.status }))
        .execute(api.db),
    );
    expect(row!.status).toBe("draft");
  });

  test("advanceOrder rejects when already at terminal status", async () => {
    // Order 46+ are 'delivered' (5 delivered after 5 draft + 10 confirmed + 10 picking + 10 packed + 10 shipped = 45).
    await expect(rpc.run((api) => api.advanceOrder("46"))).rejects.toThrow(/terminal/);
  });
});
