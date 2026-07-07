// End-to-end test of the playground demo. Boots the in-browser
// runtime (PGlite + migrations + seed) and exercises the cap-rooted
// API + exoeval RPC the way the playground UI does at runtime.

import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { client, setCurrentUserToken } from "./server/api";

const rpc = client.run.bind(client);

// Default ambient user for tests — same as the playground's default
// dropdown selection. Tests that need a different user override at
// the start of the body. Reset between tests so leakage is visible.
const DEFAULT_TOKEN = "user_brightship_alice";
beforeEach(() => setCurrentUserToken(DEFAULT_TOKEN));
afterEach(() => setCurrentUserToken(null));

describe("playground demo: cap-rooted API over exoeval RPC", () => {
  test("scoped read returns only the user's tenant rows", async () => {
    const alice = await rpc(async (api) => {
      const user = await api.currentUser();
      return user.orders()
        .select(({ orders }) => ({ id: orders.id, org: orders.organization_id }))
        .execute(api.conn);
    });
    expect(alice.length).toBeGreaterThan(0);
    expect(new Set(alice.map((r) => r.org))).toEqual(new Set(["1"]));

    setCurrentUserToken("user_atlas_dave");
    const dave = await rpc(async (api) => {
      const user = await api.currentUser();
      return user.orders()
        .select(({ orders }) => ({ id: orders.id, org: orders.organization_id }))
        .execute(api.conn);
    });
    expect(dave.length).toBeGreaterThan(0);
    expect(new Set(dave.map((r) => r.org))).toEqual(new Set(["2"]));
  });

  test("status filter via Any.in compiles and matches", async () => {
    const result = await rpc(async (api) => {
      const user = await api.currentUser();
      return user.orders()
        .where(({ orders }) => orders.status.in("packed", "shipped"))
        .select(({ orders }) => ({ id: orders.id, status: orders.status }))
        .execute(api.conn);
    });
    for (const row of result) {
      expect(["packed", "shipped"]).toContain(row.status);
    }
  });

  test("relation traversal carries scope tag (orders → customer)", async () => {
    const result = await rpc(async (api) => {
      const user = await api.currentUser();
      return user.orders()
        .select(({ orders }) => ({
          id: orders.id,
          customer: orders.customer().select(({ customers }) => ({ name: customers.name })).scalar(),
        }))
        .execute(api.conn);
    });
    expect(result.length).toBeGreaterThan(0);
    for (const row of result) {
      expect(typeof row.customer.name).toBe("string");
    }
  });

  test("groupBy + count aggregates", async () => {
    const result = await rpc(async (api) => {
      const user = await api.currentUser();
      return user.orders()
        .groupBy(({ orders }) => [orders.status])
        .select(({ orders }) => ({
          status: orders.status,
          count: orders.id.count(),
        }))
        .execute(api.conn);
    });
    expect(result.length).toBeGreaterThan(0);
    for (const row of result) {
      expect(typeof row.status).toBe("string");
      expect(BigInt(row.count)).toBeGreaterThan(0n);
    }
  });

  test("live query re-yields after a mutation against the watched table", async () => {
    // Start watching orders for the default user (Alice, org=1).
    const iter = rpc(async (api) => {
      const user = await api.currentUser();
      return user.orders()
        .where(({ orders }) => orders.status["="]("draft"))
        .select(({ orders }) => ({ id: orders.id }))
        .live(api.conn);
    });
    const it = (iter as AsyncIterable<{ id: string }[]>)[Symbol.asyncIterator]();

    const first = await it.next();
    expect(first.done).toBe(false);
    const before = first.value!.length;

    // Insert a new draft order in the user's tenant. The live
    // transformer on Orders fires an event into
    // `_typegres_live_events`; the bus wakes the subscription; the
    // iterator yields again with the new row included.
    const inserted = await rpc(async (api) => {
      const user = await api.currentUser();
      return (await user.insertDraftOrder(api.conn)).id;
    });

    const second = await it.next();
    expect(second.done).toBe(false);
    expect(second.value!.length).toBe(before + 1);
    expect(second.value!.some((r: { id: string }) => r.id === inserted)).toBe(true);

    await it.return?.();
  });

  test("db.live(qb) streams the current rowset over the rpc wire", async () => {
    const iter = rpc(async (api) => {
      const user = await api.currentUser();
      return user.orders()
        .select(({ orders }) => ({ id: orders.id, status: orders.status }))
        .live(api.conn);
    });
    const it = (iter as AsyncIterable<{ id: string; status: string }[]>)[Symbol.asyncIterator]();
    const first = await it.next();
    expect(first.done).toBe(false);
    expect(Array.isArray(first.value)).toBe(true);
    expect(first.value!.length).toBeGreaterThan(0);
    await it.return?.();
  });

  test("stop: cancelling resetLive + iter.return ends the live stream", async () => {
    const iter = rpc(async (api) => {
      const user = await api.currentUser();
      return user.orders()
        .select(({ orders }) => ({ id: orders.id }))
        .live(api.conn);
    });
    const it = (iter as AsyncIterable<{ id: string }[]>)[Symbol.asyncIterator]();

    const first = await it.next();
    expect(first.done).toBe(false);

    // Parked on `await currentSub.wait` server-side. UI's stop:
    // ask the server to cancel + drain locally.
    await rpc(async (api) => api.resetLive());

    const settled = await Promise.race([
      it.next(),
      new Promise<{ done: true; value: undefined; timeout: true }>((r) =>
        setTimeout(() => r({ done: true, value: undefined, timeout: true }), 1500),
      ),
    ]);
    expect((settled as { timeout?: true }).timeout).toBeUndefined();
    expect(settled.done).toBe(true);
  });

  test("qb.debug() logs the compiled SQL via console.log", async () => {
    // The play page's SQL tab works by shimming console.log: typegres'
    // QueryBuilder.debug() emits `console.log("Debugging query:", { sql, parameters })`
    // and returns the unchanged builder.
    const captured: Array<unknown[]> = [];
    const original = console.log;
    console.log = (...args: unknown[]) => captured.push(args);
    try {
      const result = await rpc(async (api) => {
        const u = await api.currentUser();
        return u.orders()
          .select(({ orders }) => ({ id: orders.id }))
          .debug()
          .execute(api.conn);
      });
      expect(Array.isArray(result)).toBe(true);
    } finally {
      console.log = original;
    }
    const debugCalls = captured.filter((args) => args[0] === "Debugging query:");
    expect(debugCalls.length).toBe(1);
    const payload = debugCalls[0]![1] as { sql: string; parameters?: unknown[] };
    expect(typeof payload.sql).toBe("string");
    expect(payload.sql).toMatch(/SELECT/i);
    expect(payload.sql.toLowerCase()).toContain("orders");
    expect(Array.isArray(payload.parameters)).toBe(true);
  });

  test("invalid token rejects", async () => {
    setCurrentUserToken("op_does_not_exist");
    await expect(
      rpc(async (api) => {
        const user = await api.currentUser();
        return user.organizationId;
      }),
    ).rejects.toThrow(/invalid token/);
  });
});
