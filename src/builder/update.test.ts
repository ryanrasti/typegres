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

// --- set() with typegres expressions ---
//
// The SET clause accepts both primitive values (strings, numbers...)
// and typegres expressions (Any-typed). This is what makes `SET col =
// col + delta` and other in-SQL transformations work without a
// read-then-write detour.

test("set: arithmetic on existing column (col = col + 1)", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE counters (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      n int8 NOT NULL
    )`);
    await tx.execute(sql`INSERT INTO counters (n) VALUES (10), (20)`);

    class Counters extends db.Table("counters") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      n  = (Int8<1>).column({ nonNull: true });
    }

    await tx.execute(
      Counters.update()
        .where(({ counters }) => counters.id["="]("1"))
        .set(({ counters }) => ({ n: counters.n["+"]("5") })),
    );

    const rows = await tx.execute(
      Counters.from()
        .select(({ counters }) => ({ id: counters.id, n: counters.n }))
        .orderBy(({ counters }) => counters.id),
    );
    expect(rows).toEqual([
      { id: "1", n: "15" },
      { id: "2", n: "20" },
    ]);
  });
});

test("set: typegres function call (literal expression via Text.from)", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE labels (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      tag text NOT NULL
    )`);
    await tx.execute(sql`INSERT INTO labels (tag) VALUES ('alpha')`);

    class Labels extends db.Table("labels") {
      id  = (Int8<1>).column({ nonNull: true, generated: true });
      tag = (Text<1>).column({ nonNull: true });
    }

    // `tag.upper()` is a typegres expression — should compile to
    // `SET tag = upper(tag)`, not be rejected as "not a SetRow".
    await tx.execute(
      Labels.update()
        .where(({ labels }) => labels.id["="]("1"))
        .set(({ labels }) => ({ tag: labels.tag.upper() })),
    );

    const rows = await tx.execute(Labels.from().select(({ labels }) => ({ tag: labels.tag })));
    expect(rows).toEqual([{ tag: "ALPHA" }]);
  });
});

test("set: mixing primitive and expression values in one call", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE mixed (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      n int8 NOT NULL,
      label text NOT NULL
    )`);
    await tx.execute(sql`INSERT INTO mixed (n, label) VALUES (1, 'a')`);

    class Mixed extends db.Table("mixed") {
      id    = (Int8<1>).column({ nonNull: true, generated: true });
      n     = (Int8<1>).column({ nonNull: true });
      label = (Text<1>).column({ nonNull: true });
    }

    // `n` set via expression (n + 100), `label` via primitive ("z").
    // Both should land in the same UPDATE.
    await tx.execute(
      Mixed.update()
        .where(({ mixed }) => mixed.id["="]("1"))
        .set(({ mixed }) => ({ n: mixed.n["+"]("100"), label: "z" })),
    );

    const rows = await tx.execute(Mixed.from().select(({ mixed }) => ({ n: mixed.n, label: mixed.label })));
    expect(rows).toEqual([{ n: "101", label: "z" }]);
  });
});

test("set: expression with returning round-trips the new value", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE balances (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      cents int8 NOT NULL
    )`);
    await tx.execute(sql`INSERT INTO balances (cents) VALUES (1000)`);

    class Balances extends db.Table("balances") {
      id    = (Int8<1>).column({ nonNull: true, generated: true });
      cents = (Int8<1>).column({ nonNull: true });
    }

    const [updated] = await tx.execute(
      Balances.update()
        .where(({ balances }) => balances.id["="]("1"))
        .set(({ balances }) => ({ cents: balances.cents["-"]("250") }))
        .returning(({ balances }) => ({ id: balances.id, cents: balances.cents })),
    );
    expect(updated).toEqual({ id: "1", cents: "750" });
    expectTypeOf(updated!.cents).toEqualTypeOf<string>();
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
