import { test, expect, describe, beforeEach, afterEach } from "vitest";
import { Int8, Text } from "../types";
import { db } from "../builder/test-helper";
import { sql } from "../builder/sql";
import { wrapInsertWithEvents, wrapUpdateWithEvents } from "./wrap";
import { createShadowTableSql } from "./shadow";
import { LiveBus, CursorTooOldError } from "./bus";
import type { PredicateSet } from "./types";

// Tests run on the real database (not inside a tx) because the bus needs to
// poll committed events across connections. Each test cleans its own tables.

const cleanupAndSetup = async () => {
  await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS _live_events CASCADE`);
  await db.execute(sql`CREATE TABLE dogs (id int8 PRIMARY KEY, user_id int8 NOT NULL, name text NOT NULL)`);
  await db.execute(createShadowTableSql);
};

const cleanup = async () => {
  await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS _live_events CASCADE`);
};

const makeDogs = () =>
  class Dogs extends db.Table("dogs") {
    id = (Int8<1>).column(this, "id", { nonNull: true });    user_id = (Int8<1>).column(this, "user_id", { nonNull: true });    name = (Text<1>).column(this, "name", { nonNull: true });  };

const takeSnapshot = async (): Promise<string> => {
  const r = await db.execute(sql`SELECT pg_current_snapshot()::text AS s`);
  return (r.rows as { s: string }[])[0]!.s;
};

describe("Phase 3: bus + subscription", () => {
  let bus: LiveBus;

  beforeEach(async () => {
    await cleanupAndSetup();
    bus = new LiveBus(db, { pollIntervalMs: 5 });
    await bus.syncNow(); // initialize floor + last-seen id
  });

  afterEach(async () => {
    bus.stop();
    await cleanup();
  });

  // Test 1: Admit, deliver on match.
  test("waitNext resolves when a matching event arrives", async () => {
    const Dogs = makeDogs();

    // Capture cursor before any mutation.
    const cursor = await takeSnapshot();
    const preds: PredicateSet = new Map([
      ["dogs", new Map([["user_id", new Set(["5"])]])],
    ]);

    const sub = bus.subscribe();
    const waitP = sub.waitNext(preds, cursor);

    // Commit a matching mutation.
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
    ));
    await bus.syncNow();

    await expect(Promise.race([
      waitP.then(() => "resolved"),
      new Promise((r) => setTimeout(() => r("timeout"), 1000)),
    ])).resolves.toBe("resolved");
    sub.close();
  });

  // Test 2: Skip on no match.
  test("waitNext does not resolve for non-matching events", async () => {
    const Dogs = makeDogs();
    const cursor = await takeSnapshot();
    const preds: PredicateSet = new Map([
      ["dogs", new Map([["user_id", new Set(["5"])]])],
    ]);

    const sub = bus.subscribe();
    const waitP = sub.waitNext(preds, cursor);

    // Commit a NON-matching mutation (user_id=9, preds watch 5).
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 2n, user_id: 9n, name: "Max" }),
    ));
    await bus.syncNow();

    const result = await Promise.race([
      waitP.then(() => "resolved"),
      new Promise((r) => setTimeout(() => r("timeout"), 200)),
    ]);
    expect(result).toBe("timeout");
    sub.close();
  });

  // Test 3: Event visible in cursor (pre-cursor commit) is skipped.
  test("committed-before-cursor event is not delivered", async () => {
    const Dogs = makeDogs();

    // Insert FIRST, then capture cursor.
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
    ));
    await bus.syncNow();
    const cursor = await takeSnapshot();

    const preds: PredicateSet = new Map([
      ["dogs", new Map([["user_id", new Set(["5"])]])],
    ]);
    const sub = bus.subscribe();
    const waitP = sub.waitNext(preds, cursor);

    // Already-committed event is visible in cursor → should not fire.
    const result = await Promise.race([
      waitP.then(() => "resolved"),
      new Promise((r) => setTimeout(() => r("timeout"), 200)),
    ]);
    expect(result).toBe("timeout");
    sub.close();
  });

  // Test 4: Event not visible in cursor → delivered via backfill from ring.
  test("committed-after-cursor event is delivered via ring", async () => {
    const Dogs = makeDogs();

    // Capture cursor FIRST, then insert.
    const cursor = await takeSnapshot();
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
    ));
    await bus.syncNow(); // event is in the ring now

    const preds: PredicateSet = new Map([
      ["dogs", new Map([["user_id", new Set(["5"])]])],
    ]);
    const sub = bus.subscribe();
    await sub.waitNext(preds, cursor); // should resolve immediately from ring
    sub.close();
  });

  // Test 7: Match on BEFORE or AFTER.
  test("UPDATE fires when before matches, even if after doesn't", async () => {
    const Dogs = makeDogs();

    // Seed a dog with user_id=5 and let its event go past our snapshot.
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
    ));
    await bus.syncNow();
    // Now take cursor — the insert is visible, won't fire.
    const cursor = await takeSnapshot();

    // Update to user_id=9. `before.user_id=5` matches our preds.
    await db.execute(wrapUpdateWithEvents(
      Dogs.update()
        .where(({ dogs }) => dogs.id["="](1n))
        .set(() => ({ user_id: 9n })),
      { primaryKey: ["id"] },
    ));
    await bus.syncNow();

    const preds: PredicateSet = new Map([
      ["dogs", new Map([["user_id", new Set(["5"])]])],
    ]);
    const sub = bus.subscribe();
    await sub.waitNext(preds, cursor);
    sub.close();
  });

  // Test 5: CursorTooOldError when xmin(cursor) < F.
  test("stale cursor triggers CursorTooOldError", async () => {
    const Dogs = makeDogs();

    // Use a tiny ring so we force eviction.
    bus.stop();
    bus = new LiveBus(db, { pollIntervalMs: 5, ringMax: 1 });
    await bus.syncNow();

    // Capture stale cursor BEFORE any mutations.
    const staleCursor = await takeSnapshot();

    // Commit 2 events to trigger eviction (ring holds 1, floor bumps past first xid).
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
    ));
    await bus.syncNow();
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 2n, user_id: 5n, name: "Max" }),
    ));
    await bus.syncNow();

    // Retention floor should now be past the stale cursor's xmin.
    expect(bus.retentionFloor).toBeGreaterThan(0n);

    const preds: PredicateSet = new Map([
      ["dogs", new Map([["user_id", new Set(["5"])]])],
    ]);
    const sub = bus.subscribe();
    await expect(sub.waitNext(preds, staleCursor)).rejects.toBeInstanceOf(CursorTooOldError);
    sub.close();
  });
});
