import { test, expect, afterEach } from "vitest";
import { Int8, Text } from "../types";
import { sql } from "../builder/sql";
import { Table } from "../table";
import { db, driver, setupDb } from "../test-helpers";
import { TypegresLiveEvents } from "./events";
import { setupLiveEvents } from "./test-helpers";
setupDb();
setupLiveEvents();

// All tests run outside withinTransaction so committed mutations are
// visible to the bus's polling connection. afterEach tears down the
// per-test artifacts.
afterEach(async () => {
  // db.stopLive may have already been called by the test — guarded by
  // its idempotent semantics.
  await db.stopLive();
  await driver.execute(sql`DROP TABLE IF EXISTS notes`);
  await driver.execute(sql`DROP TABLE IF EXISTS users`);
  await driver.execute(sql`DROP TABLE IF EXISTS dogs`);
});

const makeNotesTable = async () => {
  await driver.execute(sql`CREATE TABLE notes (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id int8 NOT NULL,
    body text NOT NULL
  )`);
  return class Notes extends Table("notes", { transformer: TypegresLiveEvents.makeTransformer() }) {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    user_id = (Int8<1>).column({ nonNull: true });
    body = (Text<1>).column({ nonNull: true });
  };
};

const takeNext = async <T>(iter: AsyncIterator<T>): Promise<T> => {
  const r = await iter.next();
  if (r.done) { throw new Error("iterator exhausted"); }
  return r.value;
};

test("yields current rows then re-yields on a matching commit (insert path)", async () => {
  const Notes = await makeNotesTable();
  await db.startLive({ intervalMs: 25 });

  const iter = db.live(
    Notes.from()
      .where(({ notes }) => notes.user_id.eq("1"))
      .select(({ notes }) => ({ id: notes.id, body: notes.body })),
  )[Symbol.asyncIterator]();

  expect(await takeNext(iter)).toEqual([]);

  await Notes.insert({ user_id: "1", body: "hello" }).execute(db);

  const second = await takeNext(iter);
  expect(second).toHaveLength(1);
  expect(second[0]!.body).toBe("hello");

  // Non-matching insert (user 99) shouldn't trigger a re-yield.
  const racing = iter.next();
  await Notes.insert({ user_id: "99", body: "irrelevant" }).execute(db);
  // …but the second matching insert should win the race.
  await Notes.insert({ user_id: "1", body: "world" }).execute(db);

  const third = await racing;
  expect(third.done).toBe(false);
  const bodies = (third.value as { body: string }[]).map((r) => r.body).sort();
  expect(bodies).toEqual(["hello", "world"]);

  await iter.return?.();
}, 10_000);

test("UPDATE on a matching row re-yields with new values", async () => {
  const Notes = await makeNotesTable();
  await Notes.insert({ user_id: "1", body: "first" }).execute(db);
  await db.startLive({ intervalMs: 25 });

  const iter = db.live(
    Notes.from()
      .where(({ notes }) => notes.user_id.eq("1"))
      .select(({ notes }) => ({ id: notes.id, body: notes.body })),
  )[Symbol.asyncIterator]();

  const first = await takeNext(iter);
  expect(first[0]!.body).toBe("first");

  await Notes.update()
    .where(({ notes }) => notes.user_id.eq("1"))
    .set(() => ({ body: "edited" }))
    .execute(db);

  const second = await takeNext(iter);
  expect(second[0]!.body).toBe("edited");

  await iter.return?.();
}, 10_000);

test("DELETE on a matching row re-yields with the row removed", async () => {
  const Notes = await makeNotesTable();
  await Notes.insert(
    { user_id: "1", body: "keep-1" },
    { user_id: "1", body: "delete-me" },
  ).execute(db);
  await db.startLive({ intervalMs: 25 });

  const iter = db.live(
    Notes.from()
      .where(({ notes }) => notes.user_id.eq("1"))
      .select(({ notes }) => ({ id: notes.id, body: notes.body })),
  )[Symbol.asyncIterator]();

  const first = await takeNext(iter);
  expect(first).toHaveLength(2);

  await Notes.delete()
    .where(({ notes }) => notes.body.eq("delete-me"))
    .execute(db);

  const second = await takeNext(iter);
  expect(second).toHaveLength(1);
  expect(second[0]!.body).toBe("keep-1");

  await iter.return?.();
}, 10_000);

test("join: mutation on either side triggers re-yield (literal propagates across edge)", async () => {
  await driver.execute(sql`CREATE TABLE users (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL
  )`);
  await driver.execute(sql`INSERT INTO users (id, name) OVERRIDING SYSTEM VALUE VALUES (5, 'alice')`);
  const Notes = await makeNotesTable();

  class Users extends Table("users", { transformer: TypegresLiveEvents.makeTransformer() }) {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    name = (Text<1>).column({ nonNull: true });
  }

  await db.startLive({ intervalMs: 25 });

  const iter = db.live(
    Users.from()
      .join(Notes, ({ users, notes }) => notes.user_id.eq(users.id))
      .where(({ users }) => users.id.eq("5"))
      .select(({ users, notes }) => ({ user_name: users.name, body: notes.body })),
  )[Symbol.asyncIterator]();

  const first = await takeNext(iter);
  expect(first).toEqual([]);

  // Insert a note matching user 5 — should fire even though the predicate
  // graph never had a literal anchor on notes.user_id directly.
  await Notes.insert({ user_id: "5", body: "hello" }).execute(db);

  const second = await takeNext(iter);
  expect(second).toHaveLength(1);
  expect(second[0]!).toEqual({
    user_name: "alice",
    body: "hello",
  });

  // Update on the users side also fires.
  await Users.update()
    .where(({ users }) => users.id.eq("5"))
    .set(() => ({ name: "ALICE" }))
    .execute(db);

  const third = await takeNext(iter);
  expect(third[0]!.user_name).toBe("ALICE");

  await iter.return?.();
}, 10_000);

test("throws if startLive wasn't called", async () => {
  const Notes = await makeNotesTable();
  const iter = db.live(Notes.from())[Symbol.asyncIterator]();
  await expect(iter.next()).rejects.toThrow(/startLive/);
});
