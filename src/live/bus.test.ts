import { test, expect } from "vitest";
import { sql } from "../builder/sql";
import { driver, setupDb } from "../test-helpers";
import { Bus, CursorTooOldError, type Subscription } from "./bus";
import { type Cursor, parseSnapshot } from "./snapshot";
import { setupLiveEvents } from "./test-helpers";

setupDb();
setupLiveEvents();

const grabSnapshot = async (): Promise<Cursor> => {
  const r = await driver.execute(sql`SELECT pg_current_snapshot()::text AS s`);
  return parseSnapshot((r.rows as { s: string }[])[0]!.s);
};

const insertEvent = async (table: string, before: object | null, after: object | null) => {
  await driver.execute(sql`
    INSERT INTO _typegres_live_events (xid, "table", before, after)
    VALUES (
      pg_current_xact_id(),
      ${sql.param(table)}::text,
      ${before === null ? sql`NULL::jsonb` : sql`${sql.param(JSON.stringify(before))}::jsonb`},
      ${after === null ? sql`NULL::jsonb` : sql`${sql.param(JSON.stringify(after))}::jsonb`}
    )
  `);
};

// Race the sub's wait promise against a short timeout — sufficient for tests
// to distinguish "bus signaled" from "bus didn't signal" without flake.
const waitedWithin = async (sub: Subscription, ms = 50): Promise<boolean> =>
  Promise.race([
    sub.wait.then(() => true),
    new Promise<boolean>((r) => setTimeout(() => r(false), ms)),
  ]);

test("Bus signals a subscription whose cursor doesn't see a matching event", async () => {
  const bus = new Bus(driver);
  await bus.start();

  const sub = bus.subscribe(
    await grabSnapshot(),
    new Map([["users", new Map([["id", new Set(["5"])]])]]),
  );
  expect(sub).toBeDefined();

  await insertEvent("users", null, { id: "5", name: "Rex" });
  await insertEvent("users", null, { id: "99", name: "X" });   // non-matching
  await bus.pollNow();
  expect(await waitedWithin(sub!)).toBe(true);

  await bus.stop();
});

test("Bus does not signal when the cursor already sees the event", async () => {
  const bus = new Bus(driver);
  await bus.start();

  // Insert event FIRST, then capture cursor — sub's snapshot sees it.
  await insertEvent("users", null, { id: "5", name: "Rex" });
  const sub = bus.subscribe(
    await grabSnapshot(),
    new Map([["users", new Map([["id", new Set(["5"])]])]]),
  );
  expect(sub).toBeDefined();
  await bus.pollNow();
  expect(await waitedWithin(sub!)).toBe(false);

  sub!.unsubscribe();
  await bus.stop();
});

test("subscribe returns undefined when in-memory backfill already shows a matching event", async () => {
  const bus = new Bus(driver);
  await bus.start();

  // Capture cursor BEFORE the event commits (sub won't see it).
  const subCursor = await grabSnapshot();
  await insertEvent("users", null, { id: "7", name: "Backfill" });
  // Bus polls and buffers the event before subscribe.
  await bus.pollNow();

  // Buffered event matches → no Subscription returned, caller reruns now.
  expect(
    bus.subscribe(subCursor, new Map([["users", new Map([["id", new Set(["7"])]])]])),
  ).toBeUndefined();

  // Non-matching predicates still get a real Subscription back.
  const noMatch = bus.subscribe(
    subCursor,
    new Map([["users", new Map([["id", new Set(["999"])]])]]),
  );
  expect(noMatch).toBeDefined();

  noMatch!.unsubscribe();
  await bus.stop();
});

test("subscribe throws CursorTooOldError when cursor is older than the buffer floor", async () => {
  // Tiny window of 2 — easy to roll the floor past an old cursor.
  const bus = new Bus(driver, { windowSize: 2 });
  await bus.start();

  // Snapshot held by an "ancient" cursor predating any committed events.
  const oldCursor = await grabSnapshot();

  // Three events; window only holds two → first one evicted, floor advances.
  await insertEvent("a", null, { id: "1" });
  await insertEvent("a", null, { id: "2" });
  await insertEvent("a", null, { id: "3" });
  await bus.pollNow();

  expect(() =>
    bus.subscribe(oldCursor, new Map([["a", new Map([["id", new Set(["1"])]])]])),
  ).toThrow(CursorTooOldError);

  await bus.stop();
});

test("subscribe throws if bus is not started", () => {
  const bus = new Bus(driver);
  expect(() =>
    bus.subscribe({ xmin: 0n, xmax: 0n, xip: new Set() }, new Map()),
  ).toThrow(/not started/);
});
