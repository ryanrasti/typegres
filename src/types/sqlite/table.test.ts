// Table + QueryBuilder tests against SQLite. Extends the generated-
// method smoke suite (./smoke.test.ts) into the mutation path:
// Table("users") + INSERT / SELECT / UPDATE / DELETE, with RETURNING
// where useful.
//
// Each test runs inside a transaction that always rolls back, so
// tests are independent and idempotent — no id-numbering assumptions
// carry across cases.
import { test, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import { SqliteDriver } from "../../driver";
import type { Connection } from "../../database";
import { Database } from "../../database";
import { sql } from "../../builder/sql";
import { expose } from "../../exoeval/tool";
import { Integer, Text } from "./index";

const db = new Database({ dialect: "sqlite" });

class Users extends db.Table("users") {
  @expose()
  id = Integer.column({ nonNull: true });
  @expose()
  name = Text.column({ nonNull: true });
}

let driver: SqliteDriver;
let conn: Connection;

// Each test wraps in a transaction that always rolls back — same
// pattern as PG's withinTransaction. Tests build up whatever rows
// they need inside the closure and see them wiped after the throw.
const withinTransaction = async (fn: (tx: Connection) => Promise<void>) => {
  await conn.transaction(async (tx) => {
    await fn(tx);
    throw new Error("__test_rollback__");
  }).catch((e) => {
    if ((e as Error).message !== "__test_rollback__") { throw e; }
  });
};

beforeAll(async () => {
  driver = await SqliteDriver.create(":memory:");
  conn = db.attach(driver);
  await conn.execute(sql`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL)`);
});

afterAll(async () => {
  await conn.close();
});

test("INSERT + .from().select() roundtrip preserves values (order-by-id)", async () => {
  await withinTransaction(async (tx) => {
    await Users.insert({ id: 1, name: "alice" }).execute(tx);
    await Users.insert({ id: 2, name: "bob" }).execute(tx);
    const rows = await Users.from()
      .orderBy(({ users }) => users.id)
      .select(({ users }) => ({ id: users.id, name: users.name }))
      .execute(tx);
    expectTypeOf(rows).toEqualTypeOf<{ id: number; name: string }[]>();
    expect(rows).toEqual([
      { id: 1, name: "alice" },
      { id: 2, name: "bob" },
    ]);
  });
});

test("INSERT ... RETURNING id", async () => {
  await withinTransaction(async (tx) => {
    const returned = await Users.insert({ id: 7, name: "carol" })
      .returning(({ users }) => ({ id: users.id }))
      .execute(tx);
    expectTypeOf(returned).toEqualTypeOf<{ id: number }[]>();
    expect(returned).toEqual([{ id: 7 }]);
  });
});

test("SELECT projection composes generated methods (upper)", async () => {
  await withinTransaction(async (tx) => {
    await Users.insert({ id: 1, name: "alice" }).execute(tx);
    const rows = await Users.from()
      .select(({ users }) => ({ upperName: users.name.upper() }))
      .execute(tx);
    expectTypeOf(rows).toEqualTypeOf<{ upperName: string }[]>();
    expect(rows).toEqual([{ upperName: "ALICE" }]);
  });
});

test("WHERE with .isNotNull() filters rows", async () => {
  await withinTransaction(async (tx) => {
    await Users.insert({ id: 1, name: "alice" }).execute(tx);
    const rows = await Users.from()
      .where(({ users }) => users.name.isNotNull())
      .select(({ users }) => ({ id: users.id, name: users.name }))
      .execute(tx);
    expectTypeOf(rows).toEqualTypeOf<{ id: number; name: string }[]>();
    expect(rows).toEqual([{ id: 1, name: "alice" }]);
  });
});

test("placeholder emission is `?` inside a WHERE (compiled through the QB)", async () => {
  await withinTransaction(async (tx) => {
    await Users.insert({ id: 1, name: "alice" }).execute(tx);
    // SQLite's Text class doesn't have a codegen'd `.eq()` operator
    // yet, so this raw-template predicate exercises the placeholder
    // dispatch inside a compiled WHERE clause.
    const target = Text.from("alice");
    const rows = await Users.from()
      .where(({ users }) =>
        Text.from(sql`(${users.name.toSql()} = ${target.toSql()})`).isNotNull(),
      )
      .select(({ users }) => ({ id: users.id, name: users.name }))
      .execute(tx);
    expect(rows).toEqual([{ id: 1, name: "alice" }]);
  });
});

test("UPDATE ... RETURNING name", async () => {
  await withinTransaction(async (tx) => {
    await Users.insert({ id: 1, name: "alice" }).execute(tx);
    await Users.insert({ id: 2, name: "bob" }).execute(tx);
    const returned = await Users.update()
      .where(({ users }) => users.id.isNotNull())
      .set(() => ({ name: "renamed" }))
      .returning(({ users }) => ({ name: users.name }))
      .execute(tx);
    expectTypeOf(returned).toEqualTypeOf<{ name: string }[]>();
    expect(returned).toEqual([{ name: "renamed" }, { name: "renamed" }]);
  });
});

test("DELETE ... RETURNING id removes the rows", async () => {
  await withinTransaction(async (tx) => {
    await Users.insert({ id: 1, name: "alice" }).execute(tx);
    await Users.insert({ id: 2, name: "bob" }).execute(tx);
    const returned = await Users.delete()
      .where(({ users }) => users.id.isNotNull())
      .returning(({ users }) => ({ id: users.id }))
      .execute(tx);
    expectTypeOf(returned).toEqualTypeOf<{ id: number }[]>();
    // DELETE has no ORDER BY; sort by id for a stable assertion.
    expect(returned.sort((a, b) => a.id - b.id)).toEqual([{ id: 1 }, { id: 2 }]);
    const remaining = await Users.from()
      .select(({ users }) => ({ id: users.id }))
      .execute(tx);
    expect(remaining).toEqual([]);
  });
});
