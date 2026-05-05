// End-to-end test of the playground demo. Boots the in-browser
// runtime (PGlite + migrations + seed) and exercises the cap-rooted
// API + exoeval RPC the way the playground UI does at runtime.
//
// Same module graph the UI loads:
//   widgets/main.ts → rpc.ts → server/api.ts + runtime.ts → schema/*

import { describe, expect, test } from "vitest";
import { rpc } from "./rpc";

describe("playground demo: cap-rooted API over exoeval RPC", () => {
  test("scoped read returns only the operator's tenant rows", async () => {
    const alice = await rpc(async (api) => {
      const op = await api.operator("op_brightship_alice");
      return op.orders()
        .select(({ orders }) => ({ id: orders.id, org: orders.organization_id }))
        .execute(api.db);
    });
    expect(alice.length).toBeGreaterThan(0);
    expect(new Set(alice.map((r) => r.org))).toEqual(new Set(["1"]));

    const dave = await rpc(async (api) => {
      const op = await api.operator("op_atlas_dave");
      return op.orders()
        .select(({ orders }) => ({ id: orders.id, org: orders.organization_id }))
        .execute(api.db);
    });
    expect(dave.length).toBeGreaterThan(0);
    expect(new Set(dave.map((r) => r.org))).toEqual(new Set(["2"]));
  });

  test("status filter via Any.in compiles and matches", async () => {
    const result = await rpc(async (api) => {
      const op = await api.operator("op_brightship_alice");
      return op.orders()
        .where(({ orders }) => orders.status.in("packed", "shipped"))
        .select(({ orders }) => ({ id: orders.id, status: orders.status }))
        .execute(api.db);
    });
    for (const row of result) {
      expect(["packed", "shipped"]).toContain(row.status);
    }
  });

  test("relation traversal carries scope tag (orders → customer)", async () => {
    const result = await rpc(async (api) => {
      const op = await api.operator("op_brightship_alice");
      return op.orders()
        .select(({ orders }) => ({
          id: orders.id,
          customer: orders.customer().select(({ customers }) => ({ name: customers.name })).scalar(),
        }))
        .execute(api.db);
    });
    expect(result.length).toBeGreaterThan(0);
    for (const row of result) {
      expect(typeof row.customer.name).toBe("string");
    }
  });

  test("groupBy + count aggregates", async () => {
    const result = await rpc(async (api) => {
      const op = await api.operator("op_brightship_alice");
      return op.orders()
        .groupBy(({ orders }) => [orders.status])
        .select(({ orders }) => ({
          status: orders.status,
          count: orders.id.count(),
        }))
        .execute(api.db);
    });
    expect(result.length).toBeGreaterThan(0);
    for (const row of result) {
      expect(typeof row.status).toBe("string");
      expect(BigInt(row.count)).toBeGreaterThan(0n);
    }
  });

  test("invalid token rejects", async () => {
    await expect(
      rpc(async (api) => {
        const op = await api.operator("op_does_not_exist");
        return op.organizationId;
      }),
    ).rejects.toThrow(/invalid token/);
  });
});
