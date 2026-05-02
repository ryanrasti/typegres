import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "../types";
import { sql } from "./sql";
import { setupDb, db, withinTransaction } from "../test-helpers";
setupDb();

test("update with where", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE users (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      active text NOT NULL DEFAULT 'yes'
    )`);
    await tx.execute(sql`INSERT INTO users (name) VALUES ('Alice'), ('Bob')`);

    class Users extends db.Table("users") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });      active = (Text<1>).column({ nonNull: true, default: sql`'yes'` });    }

    await tx.execute(
      Users.update()
        .where(({ users }) => users.name["="]("Bob"))
        .set(() => ({ active: "no" })),
    );

    const rows = await tx.execute(
      Users.from()
        .select(({ users }) => ({ name: users.name, active: users.active }))
        .orderBy(({ users }) => users.name),
    );

    expect(rows).toEqual([
      { name: "Alice", active: "yes" },
      { name: "Bob", active: "no" },
    ]);
  });
});

test("update all with where(true)", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE flags (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      active text NOT NULL DEFAULT 'yes'
    )`);
    await tx.execute(sql`INSERT INTO flags (active) VALUES ('yes'), ('yes')`);

    class Flags extends db.Table("flags") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      active = (Text<1>).column({ nonNull: true, default: sql`'yes'` });    }

    await tx.execute(Flags.update().where(true).set(() => ({ active: "no" })));

    const rows = await tx.execute(
      Flags.from().select(({ flags }) => ({ active: flags.active })),
    );

    expect(rows).toEqual([{ active: "no" }, { active: "no" }]);
  });
});

test("update returning", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE scores (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      score text NOT NULL DEFAULT '0'
    )`);
    await tx.execute(sql`INSERT INTO scores (name) VALUES ('Alice'), ('Bob')`);

    class Scores extends db.Table("scores") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });      score = (Text<1>).column({ nonNull: true, default: sql`'0'` });    }

    const rows = await tx.execute(
      Scores.update()
        .where(({ scores }) => scores.name["="]("Alice"))
        .set(() => ({ score: "100" }))
        .returning(({ scores }) => ({ name: scores.name, score: scores.score })),
    );

    expectTypeOf(rows).toEqualTypeOf<{ name: string; score: string }[]>();
    expect(rows).toEqual([{ name: "Alice", score: "100" }]);
  });
});

test("update: multiple where calls AND-combine", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE products (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      price int8 NOT NULL DEFAULT 0,
      active text NOT NULL DEFAULT 'yes'
    )`);
    await tx.execute(sql`INSERT INTO products (name, price) VALUES ('a', 10), ('b', 10), ('c', 20)`);

    class Products extends db.Table("products") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });      price = (Int8<1>).column({ nonNull: true, default: sql`0` });      active = (Text<1>).column({ nonNull: true, default: sql`'yes'` });    }

    await tx.execute(
      Products.update()
        .where(({ products }) => products.price["="]("10"))
        .where(({ products }) => products.name["="]("a"))
        .set(() => ({ active: "no" })),
    );

    const rows = await tx.execute(
      Products.from()
        .select(({ products }) => ({ name: products.name, active: products.active }))
        .orderBy(({ products }) => products.name),
    );

    expect(rows).toEqual([
      { name: "a", active: "no" },
      { name: "b", active: "yes" },
      { name: "c", active: "yes" },
    ]);
  });
});

test("update without where throws", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE noop (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY)`);

    class Noop extends db.Table("noop") {
      id = (Int8<1>).column({ nonNull: true, generated: true });    }

    await expect(tx.execute(Noop.update().set(() => ({})))).rejects.toThrow("requires .where()");
  });
});
