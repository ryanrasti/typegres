import { test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { Database, type Connection } from "../../database";
import { SqliteDriver } from "../../drivers/sqlite";
import { DoSqliteDriver } from "../../drivers/do";
import BetterSqlite3 from "better-sqlite3";
import { sql } from "../../builder/sql";
import { Integer, Real, Text } from "../../types/sqlite";

// End-to-end live queries over better-sqlite3 — mirrors the pg suite in
// ../pg/db-live.test.ts. No pollNow/interval anywhere: dispatch is
// synchronous with the mutation, so every re-yield below resolves without
// timers. The same backend drives DoSqliteDriver (Durable Objects).

const db = new Database({ dialect: "sqlite" });

let driver: SqliteDriver;
let conn: Connection;

beforeAll(async () => {
  driver = await SqliteDriver.create(":memory:");
  conn = db.attach(driver);
});

afterAll(async () => {
  await conn.close();
});

afterEach(async () => {
  await conn.execute(sql`DROP TABLE IF EXISTS notes`);
  await conn.execute(sql`DROP TABLE IF EXISTS users`);
  await conn.execute(sql`DROP TABLE IF EXISTS readings`);
});

const makeNotesTable = async () => {
  await conn.execute(sql`CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    body TEXT NOT NULL
  )`);
  return class Notes extends db.Table("notes", { live: true }) {
    id = Integer.column({ nonNull: true });
    user_id = Integer.column({ nonNull: true });
    body = Text.column({ nonNull: true });
  };
};

const takeNext = async <T>(iter: AsyncIterator<T>): Promise<T> => {
  const r = await iter.next();
  if (r.done) { throw new Error("iterator exhausted"); }
  return r.value;
};

test("yields current rows then re-yields on a matching commit (insert path)", async () => {
  const Notes = await makeNotesTable();

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id, body: notes.body }))
    .live(conn)[Symbol.asyncIterator]();

  expect(await takeNext(iter)).toEqual([]);

  await Notes.insert({ id: 1, user_id: 1, body: "hello" }).execute(conn);

  const second = await takeNext(iter);
  expect(second).toHaveLength(1);
  expect(second[0]!.body).toBe("hello");

  // Non-matching insert (user 99) shouldn't trigger a re-yield…
  const racing = iter.next();
  await Notes.insert({ id: 2, user_id: 99, body: "irrelevant" }).execute(conn);
  // …but the next matching insert should win the race.
  await Notes.insert({ id: 3, user_id: 1, body: "world" }).execute(conn);

  const third = await racing;
  expect(third.done).toBe(false);
  const bodies = (third.value as { body: string }[]).map((r) => r.body).sort();
  expect(bodies).toEqual(["hello", "world"]);

  await iter.return?.();
}, 10_000);

test("UPDATE on a matching row re-yields with new values", async () => {
  const Notes = await makeNotesTable();
  await Notes.insert({ id: 1, user_id: 1, body: "first" }).execute(conn);

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id, body: notes.body }))
    .live(conn)[Symbol.asyncIterator]();

  const first = await takeNext(iter);
  expect(first[0]!.body).toBe("first");

  await Notes.update()
    .where(({ notes }) => notes.user_id.eq(1))
    .set(() => ({ body: "edited" }))
    .execute(conn);

  const second = await takeNext(iter);
  expect(second[0]!.body).toBe("edited");

  await iter.return?.();
}, 10_000);

test("UPDATE moving a row OUT of the watched set re-yields (before-image path)", async () => {
  const Notes = await makeNotesTable();
  await Notes.insert({ id: 1, user_id: 1, body: "mine" }).execute(conn);

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id, body: notes.body }))
    .live(conn)[Symbol.asyncIterator]();

  expect(await takeNext(iter)).toHaveLength(1);

  // After this update the row no longer matches user_id = 1. The
  // after-image (user_id = 2) doesn't intersect the watched set — only
  // the pre-SELECT'd before-image can trigger the re-yield.
  await Notes.update()
    .where(({ notes }) => notes.id.eq(1))
    .set(() => ({ user_id: 2 }))
    .execute(conn);

  expect(await takeNext(iter)).toEqual([]);

  await iter.return?.();
}, 10_000);

test("DELETE on a matching row re-yields with the row removed", async () => {
  const Notes = await makeNotesTable();
  await Notes.insert(
    { id: 1, user_id: 1, body: "keep-1" },
    { id: 2, user_id: 1, body: "delete-me" },
  ).execute(conn);

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id, body: notes.body }))
    .live(conn)[Symbol.asyncIterator]();

  const first = await takeNext(iter);
  expect(first).toHaveLength(2);

  await Notes.delete()
    .where(({ notes }) => notes.body.eq("delete-me"))
    .execute(conn);

  const second = await takeNext(iter);
  expect(second).toHaveLength(1);
  expect(second[0]!.body).toBe("keep-1");

  await iter.return?.();
}, 10_000);

test("join: mutation on either side triggers re-yield (literal propagates across edge)", async () => {
  await conn.execute(sql`CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  )`);
  const Notes = await makeNotesTable();

  class Users extends db.Table("users", { live: true }) {
    id = Integer.column({ nonNull: true });
    name = Text.column({ nonNull: true });
  }

  await Users.insert({ id: 5, name: "alice" }).execute(conn);

  const iter = Users.from()
    .join(Notes, ({ users, notes }) => notes.user_id.eq(users.id))
    .where(({ users }) => users.id.eq(5))
    .select(({ users, notes }) => ({ user_name: users.name, body: notes.body }))
    .live(conn)[Symbol.asyncIterator]();

  const first = await takeNext(iter);
  expect(first).toEqual([]);

  // Insert a note matching user 5 — should fire even though the predicate
  // graph never had a literal anchor on notes.user_id directly.
  await Notes.insert({ id: 1, user_id: 5, body: "hello" }).execute(conn);

  const second = await takeNext(iter);
  expect(second).toHaveLength(1);
  expect(second[0]!).toEqual({
    user_name: "alice",
    body: "hello",
  });

  // Update on the users side also fires.
  await Users.update()
    .where(({ users }) => users.id.eq(5))
    .set(() => ({ name: "ALICE" }))
    .execute(conn);

  const third = await takeNext(iter);
  expect(third[0]!.user_name).toBe("ALICE");

  await iter.return?.();
}, 10_000);

test("canonicalization parity: real + text anchors match captured images", async () => {
  // If the extractor's CAST(col AS text) rendering ever diverged from the
  // capture's json_object(CAST(col AS text)) rendering, the dispatcher's
  // string matching would silently miss and these next() calls would hang
  // (failing the test timeout).
  await conn.execute(sql`CREATE TABLE readings (
    id INTEGER PRIMARY KEY,
    sensor TEXT NOT NULL,
    value REAL NOT NULL
  )`);
  class Readings extends db.Table("readings", { live: true }) {
    id = Integer.column({ nonNull: true });
    sensor = Text.column({ nonNull: true });
    value = Real.column({ nonNull: true });
  }

  const bySensor = Readings.from()
    .where(({ readings }) => readings.sensor.eq("temp"))
    .select(({ readings }) => ({ value: readings.value }))
    .live(conn)[Symbol.asyncIterator]();
  const byValue = Readings.from()
    .where(({ readings }) => readings.value.eq(1.5))
    .select(({ readings }) => ({ sensor: readings.sensor }))
    .live(conn)[Symbol.asyncIterator]();

  expect(await takeNext(bySensor)).toEqual([]);
  expect(await takeNext(byValue)).toEqual([]);

  await Readings.insert({ id: 1, sensor: "temp", value: 1.5 }).execute(conn);

  expect(await takeNext(bySensor)).toEqual([{ value: 1.5 }]);
  expect(await takeNext(byValue)).toEqual([{ sensor: "temp" }]);

  await bySensor.return?.();
  await byValue.return?.();
}, 10_000);

test("mutations RETURNING still yields only user columns (images stripped)", async () => {
  const Notes = await makeNotesTable();

  const returned = await Notes.insert({ id: 1, user_id: 1, body: "hi" })
    .returning(({ notes }) => ({ id: notes.id, body: notes.body }))
    .execute(conn);
  expect(returned).toEqual([{ id: 1, body: "hi" }]);
}, 10_000);


test("cancelLiveSubscriptions ends an iterator that is MID-RERUN (not parked)", async () => {
  const Notes = await makeNotesTable();

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id }))
    .live(conn)[Symbol.asyncIterator]();
  await takeNext(iter);

  const racing = iter.next();
  // The insert signals the parked sub synchronously (same-tick flush),
  // queueing the generator's rerun; cancelling right after lands while
  // the rerun is in flight — there is no parked Subscription to reject,
  // only the epoch check can end the iterator.
  await Notes.insert({ id: 1, user_id: 1, body: "wake" }).execute(conn);
  conn.cancelLiveSubscriptions();
  expect((await racing).done).toBe(true);
}, 10_000);

test("cancelLiveSubscriptions releases a parked consumer cleanly", async () => {
  const Notes = await makeNotesTable();

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id }))
    .live(conn)[Symbol.asyncIterator]();
  await takeNext(iter);

  const parked = iter.next();
  conn.cancelLiveSubscriptions();
  expect((await parked).done).toBe(true);
}, 10_000);

test("close() stops the live engine and releases a parked consumer", async () => {
  const ownDriver = await SqliteDriver.create(":memory:");
  const ownConn = db.attach(ownDriver);
  await ownConn.execute(sql`CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    body TEXT NOT NULL
  )`);
  class Notes extends db.Table("notes", { live: true }) {
    id = Integer.column({ nonNull: true });
    user_id = Integer.column({ nonNull: true });
    body = Text.column({ nonNull: true });
  }

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id }))
    .live(ownConn)[Symbol.asyncIterator]();
  await takeNext(iter);

  const parked = iter.next();
  await ownConn.close();
  expect((await parked).done).toBe(true);
}, 10_000);

test("live over DoSqliteDriver (fake SqlStorage backed by better-sqlite3)", async () => {
  // Faithful-enough DurableObjectStorage fake: synchronous exec with
  // positional bindings, native JS values out, SqlStorage's BigInt
  // rejection, and the storage.transaction() protocol (workerd rejects
  // SQL BEGIN — see DoStorageLike).
  const raw = new BetterSqlite3(":memory:");
  const storage = {
    sql: {
      exec(query: string, ...bindings: unknown[]) {
        if (bindings.some((b) => typeof b === "bigint")) {
          throw new TypeError("SqlStorage does not support BigInt bindings");
        }
        if (/^\s*(BEGIN|COMMIT|ROLLBACK|SAVEPOINT)/i.test(query)) {
          throw new Error("To execute a transaction, please use the state.storage.transaction() API");
        }
        const stmt = raw.prepare(query);
        const rows = stmt.reader ? (stmt.all(...bindings) as { [k: string]: unknown }[]) : (stmt.run(...bindings), []);
        return { toArray: () => rows };
      },
    },
    async transaction<T>(cb: () => Promise<T>): Promise<T> {
      raw.exec("BEGIN");
      try {
        const result = await cb();
        raw.exec("COMMIT");
        return result;
      } catch (e) {
        raw.exec("ROLLBACK");
        throw e;
      }
    },
  };
  const doConn = db.attach(new DoSqliteDriver(storage));

  await doConn.execute(sql`CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    body TEXT NOT NULL
  )`);
  class Notes extends db.Table("notes", { live: true }) {
    id = Integer.column({ nonNull: true });
    user_id = Integer.column({ nonNull: true });
    body = Text.column({ nonNull: true });
  }

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id, body: notes.body }))
    .live(doConn)[Symbol.asyncIterator]();

  expect(await takeNext(iter)).toEqual([]);
  await Notes.insert({ id: 1, user_id: 1, body: "from-do" }).execute(doConn);
  expect(await takeNext(iter)).toEqual([{ id: 1, body: "from-do" }]);

  await iter.return?.();
  raw.close();
}, 10_000);


test("transaction: captured events are withheld mid-tx and flush at COMMIT", async () => {
  const Notes = await makeNotesTable();

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id, body: notes.body }))
    .live(conn)[Symbol.asyncIterator]();
  expect(await takeNext(iter)).toEqual([]);

  const racing = iter.next();
  await conn.transaction(async (tx) => {
    await Notes.insert({ id: 1, user_id: 1, body: "in-tx" }).execute(tx);
    await Notes.insert({ id: 2, user_id: 1, body: "also-in-tx" }).execute(tx);
    // Events buffer until COMMIT — the subscriber must not have been
    // signaled yet. (The signal would have resolved `racing` well within
    // one microtask; racing an immediately-resolving probe is enough.)
    const state = await Promise.race([
      racing.then(() => "resolved"),
      Promise.resolve().then(() => "pending"),
    ]);
    expect(state).toBe("pending");
  });

  const woke = await racing;
  expect(woke.done).toBe(false);
  expect((woke.value as { body: string }[]).map((r) => r.body).sort()).toEqual(["also-in-tx", "in-tx"]);

  await iter.return?.();
}, 10_000);

test("transaction: ROLLBACK discards captured events", async () => {
  const Notes = await makeNotesTable();

  const iter = Notes.from()
    .where(({ notes }) => notes.user_id.eq(1))
    .select(({ notes }) => ({ id: notes.id, body: notes.body }))
    .live(conn)[Symbol.asyncIterator]();
  expect(await takeNext(iter)).toEqual([]);

  const racing = iter.next();
  await conn
    .transaction(async (tx) => {
      await Notes.insert({ id: 1, user_id: 1, body: "doomed" }).execute(tx);
      throw new Error("__rollback__");
    })
    .catch((e) => {
      if ((e as Error).message !== "__rollback__") { throw e; }
    });

  // The rolled-back insert must not have signaled; the next commit wins
  // the race and its rowset must not contain the doomed row.
  await Notes.insert({ id: 2, user_id: 1, body: "committed" }).execute(conn);
  const woke = await racing;
  expect(woke.done).toBe(false);
  expect(woke.value).toEqual([{ id: 2, body: "committed" }]);

  await iter.return?.();
}, 10_000);

test("transaction({ isolation }) is rejected on sqlite", async () => {
  await expect(
    conn.transaction({ isolation: "serializable" }, async () => {}),
  ).rejects.toThrow(/pg-only/);
});
