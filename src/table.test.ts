import { test, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import { pgliteExecutor } from "./executor";
import type { Executor } from "./executor";
import { Database } from "./database";
import { Int8, Text } from "./types";
import { sql } from "./sql-builder";

let exec: Executor;
let db: Database;

beforeAll(async () => {
  exec = await pgliteExecutor();
  db = new Database(exec);
});

afterAll(async () => {
  await exec.close();
});

const withinTransaction = async (fn: () => Promise<void>) => {
  await exec.execute(sql`BEGIN`);
  try {
    await fn();
  } finally {
    await exec.execute(sql`ROLLBACK`);
  }
};

test("Table.from().select() with real table", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE dogs (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      breed text
    )`);

    await exec.execute(sql`INSERT INTO dogs (name, breed) VALUES ('Rex', 'Labrador'), ('Fido', NULL)`);

    class Dogs extends db.Table("dogs") {
      id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
      breed = (Text<0 | 1>).column();
    }
    const rows = await Dogs.from()
      .select(({ dogs  }) => ({
        id: dogs.id,
        name: dogs.name,
        breed: dogs.breed,
      }))
      .execute();

    expectTypeOf(rows).toEqualTypeOf<{ id: bigint; name: string; breed: string | null }[]>();
    expect(rows).toEqual([
      { id: 1n, name: "Rex", breed: "Labrador" },
      { id: 2n, name: "Fido", breed: null },
    ]);

    const rows2 = await Dogs.as("d").from()
      .select(({ d }) => ({
        id: d.id,
        name: d.name,
        breed: d.breed,
      }))
      .execute();

    expectTypeOf(rows2).toEqualTypeOf<{ id: bigint; name: string; breed: string | null }[]>();
    expect(rows2).toEqual([
      { id: 1n, name: "Rex", breed: "Labrador" },
      { id: 2n, name: "Fido", breed: null },
    ]);
  });
});

// --- mutations ---

test("insert", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE cats (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      color text
    )`);

    class Cats extends db.Table("cats") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
      color = (Text<0 | 1>).column();
    }

    await Cats.insert({ name: "Whiskers" }, { name: "Tom", color: "orange" });

    const rows = await Cats.from()
      .select(({ cats }) => ({ name: cats.name, color: cats.color }))
      .execute();

    expect(rows).toEqual([
      { name: "Whiskers", color: null },
      { name: "Tom", color: "orange" },
    ]);
  });
});

test("insert returning", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE items (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      label text NOT NULL
    )`);

    class Items extends db.Table("items") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      label = (Text<1>).column({ nonNull: true });
    }

    const rows = await Items.insertReturning(
      [{ label: "A" }, { label: "B" }],
      (t) => ({ id: t.id, label: t.label }),
    );

    expectTypeOf(rows).toEqualTypeOf<{ id: bigint; label: string }[]>();
    expect(rows).toEqual([
      { id: 1n, label: "A" },
      { id: 2n, label: "B" },
    ]);
  });
});

test("update with where", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE users (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      active text NOT NULL DEFAULT 'yes'
    )`);
    await exec.execute(sql`INSERT INTO users (name) VALUES ('Alice'), ('Bob')`);

    class Users extends db.Table("users") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
      active = (Text<1>).column({ nonNull: true, default: sql`'yes'` });
    }

    await Users.update(
      () => ({ active: "no" }),
      (t) => t.name["="]("Bob"),
    );

    const rows = await Users.from()
      .select(({ users }) => ({ name: users.name, active: users.active }))
      .orderBy(({ users }) => users.name)
      .execute();

    expect(rows).toEqual([
      { name: "Alice", active: "yes" },
      { name: "Bob", active: "no" },
    ]);
  });
});

test("delete with where", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE logs (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      msg text NOT NULL
    )`);
    await exec.execute(sql`INSERT INTO logs (msg) VALUES ('keep'), ('remove'), ('keep2')`);

    class Logs extends db.Table("logs") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      msg = (Text<1>).column({ nonNull: true });
    }

    await Logs.delete((t) => t.msg["="]("remove"));

    const rows = await Logs.from()
      .select(({ logs }) => ({ msg: logs.msg }))
      .execute();

    expect(rows).toEqual([{ msg: "keep" }, { msg: "keep2" }]);
  });
});
