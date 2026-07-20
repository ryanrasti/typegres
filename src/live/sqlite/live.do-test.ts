// Live queries against a REAL Durable Object's storage, inside workerd
// (the vitest "workerd" project; `npm run test:do` to run just these).
// The node suite's DoSqliteDriver test uses a better-sqlite3-backed
// fake; this is the genuine article. The cloudflare:* modules are
// duck-type declared in ./do-test-modules.d.ts.
import { test, expect } from "vitest";
import { env, runInDurableObject } from "cloudflare:test";
import { Database } from "../../database";
import { DoSqliteDriver } from "../../drivers/do";
import { sql } from "../../builder/sql";
import { Integer, Text } from "../../types/sqlite";

const db = new Database({ dialect: "sqlite" });

class Notes extends db.Table("notes", { live: true }) {
  id = Integer.column({ nonNull: true });
  user_id = Integer.column({ nonNull: true });
  body = Text.column({ nonNull: true });
}

const takeNext = async <T>(iter: AsyncIterator<T>): Promise<T> => {
  const r = await iter.next();
  if (r.done) { throw new Error("iterator exhausted"); }
  return r.value;
};

test("live insert/update/delete round-trip on real DO SqlStorage", async () => {
  const stub = env.TEST_DO.getByName("live-round-trip");
  await runInDurableObject(stub, async (_instance, state) => {
    const conn = db.attach(new DoSqliteDriver(state.storage));
    await conn.execute(sql`CREATE TABLE notes (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      body TEXT NOT NULL
    )`);

    const iter = Notes.from()
      .where(({ notes }) => notes.user_id.eq(1))
      .select(({ notes }) => ({ id: notes.id, body: notes.body }))
      .live(conn)[Symbol.asyncIterator]();

    expect(await takeNext(iter)).toEqual([]);

    await Notes.insert({ id: 1, user_id: 1, body: "from-real-do" }).execute(conn);
    expect(await takeNext(iter)).toEqual([{ id: 1, body: "from-real-do" }]);

    await Notes.update()
      .where(({ notes }) => notes.id.eq(1))
      .set(() => ({ body: "edited" }))
      .execute(conn);
    expect(await takeNext(iter)).toEqual([{ id: 1, body: "edited" }]);

    // Before-image path: the row leaves the watched set.
    await Notes.update()
      .where(({ notes }) => notes.id.eq(1))
      .set(() => ({ user_id: 2 }))
      .execute(conn);
    expect(await takeNext(iter)).toEqual([]);

    await iter.return?.();
  });
});

test("transaction: buffered events flush at COMMIT on real DO", async () => {
  const stub = env.TEST_DO.getByName("live-tx");
  await runInDurableObject(stub, async (_instance, state) => {
    const conn = db.attach(new DoSqliteDriver(state.storage));
    await conn.execute(sql`CREATE TABLE notes (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      body TEXT NOT NULL
    )`);

    const iter = Notes.from()
      .where(({ notes }) => notes.user_id.eq(1))
      .select(({ notes }) => ({ body: notes.body }))
      .live(conn)[Symbol.asyncIterator]();
    expect(await takeNext(iter)).toEqual([]);

    await conn.transaction(async (tx) => {
      await Notes.insert({ id: 1, user_id: 1, body: "tx" }).execute(tx);
    });
    expect(await takeNext(iter)).toEqual([{ body: "tx" }]);

    await iter.return?.();
  });
});
