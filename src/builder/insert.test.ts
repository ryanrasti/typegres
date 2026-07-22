import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "../types/postgres";
import * as sqlite from "../types/sqlite";
import type { InsertRow } from "../types/runtime";
import { sql } from "./sql";
import { typegres } from "../index";
import { setupDb, db, withinTransaction } from "../test-helpers";
setupDb();

test("insert", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE cats (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      color text
    )`);

    class Cats extends db.Table("cats") {
      id = Int8.column({ nonNull: true, generated: true });      name = Text.column({ nonNull: true });      color = Text.column();    }

    // name is required, id and color are optional
    // @ts-expect-error — missing required field 'name'
    const _bad: InsertRow<InstanceType<typeof Cats>> = { color: "black" };

    await tx.execute(Cats.insert({ name: "Whiskers" }, { name: "Tom", color: "orange" }));

    const rows = await tx.execute(
      Cats.from().select(({ cats }) => ({ name: cats.name, color: cats.color })),
    );

    expect(rows).toEqual([
      { name: "Whiskers", color: null },
      { name: "Tom", color: "orange" },
    ]);
  });
});

test("VALUES accept typegres expressions, not just primitives", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE users (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await tx.execute(sql`CREATE TABLE posts (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      author_id int8 NOT NULL,
      body text NOT NULL
    )`);
    class Users extends db.Table("users") {
      id = Int8.column({ nonNull: true, generated: true });
      name = Text.column({ nonNull: true });
    }
    class Posts extends db.Table("posts") {
      id = Int8.column({ nonNull: true, generated: true });
      author_id = Int8.column({ nonNull: true });
      body = Text.column({ nonNull: true });
    }

    // A hydrated row's columns are typegres expressions, not primitives —
    // and they flow straight into another table's VALUES (parity with SET).
    await tx.execute(Users.insert({ name: "alice" }));
    const [alice] = await tx.hydrate(Users.from().where(({ users }) => users.name.eq("alice")));

    const [post] = await tx.execute(
      Posts.insert({ author_id: alice!.id, body: "hi" }).returning(({ posts }) => ({
        author_id: posts.author_id,
      })),
    );

    // The FK landed alice's id: joining back recovers her name.
    const [row] = await tx.execute(
      Users.from()
        .where(({ users }) => users.id.eq(post!.author_id))
        .select(({ users }) => ({ name: users.name })),
    );
    expect(row).toEqual({ name: "alice" });
  });
});

test("insert returning", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE items (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      label text NOT NULL
    )`);

    class Items extends db.Table("items") {
      id = Int8.column({ nonNull: true, generated: true });      label = Text.column({ nonNull: true });    }

    const rows = await tx.execute(
      Items.insert({ label: "A" }, { label: "B" })
        .returning(({ items }) => ({ id: items.id, label: items.label })),
    );

    expectTypeOf(rows).toEqualTypeOf<{ id: string; label: string }[]>();
    expect(rows).toEqual([
      { id: "1", label: "A" },
      { id: "2", label: "B" },
    ]);
  });
});

test("columns no row provides are pruned so DB defaults apply", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE tagged (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      label text NOT NULL,
      status text NOT NULL DEFAULT 'new'
    )`);

    class Tagged extends db.Table("tagged") {
      id = Int8.column({ nonNull: true, generated: true });      label = Text.column({ nonNull: true });      status = Text.column({ nonNull: true, default: sql`'new'` });    }

    // `status` appears in no row → pruned from the column list → the
    // DB's DEFAULT 'new' applies (not NULL, not an error).
    const rows = await tx.execute(
      Tagged.insert({ label: "A" }, { label: "B" })
        .returning(({ tagged }) => ({ label: tagged.label, status: tagged.status })),
    );
    expect(rows).toEqual([
      { label: "A", status: "new" },
      { label: "B", status: "new" },
    ]);
  });
});

test("postgres: column provided in some rows but not others → DEFAULT keyword per gap", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE mixed (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      label text NOT NULL,
      status text NOT NULL DEFAULT 'new'
    )`);

    class Mixed extends db.Table("mixed") {
      id = Int8.column({ nonNull: true, generated: true });      label = Text.column({ nonNull: true });      status = Text.column({ nonNull: true, default: sql`'new'` });    }

    const rows = await tx.execute(
      Mixed.insert({ label: "A" }, { label: "B", status: "old" })
        .returning(({ mixed }) => ({ label: mixed.label, status: mixed.status })),
    );
    expect(rows).toEqual([
      { label: "A", status: "new" },
      { label: "B", status: "old" },
    ]);
  });
});

test("sqlite: pruning defers to rowid autoincrement and declared defaults", async () => {
  const { db: sdb, conn } = await typegres({ type: "sqlite" });
  try {
    await conn.execute(sql.raw(`CREATE TABLE tagged (
      id INTEGER PRIMARY KEY,
      label TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    )`));

    class Tagged extends sdb.Table("tagged") {
      id = (sqlite.Integer<1>).column({ nonNull: true, generated: true });      label = (sqlite.Text<1>).column({ nonNull: true });      status = (sqlite.Text<1>).column({ nonNull: true, default: sql`'new'` });    }

    // Previously this inserted NULL for id (ok, rowid quirk) AND for
    // status (NOT NULL violation). Pruning makes both work natively.
    const rows = await Tagged.insert({ label: "A" }, { label: "B" })
      .returning(({ tagged }) => ({ id: tagged.id, label: tagged.label, status: tagged.status }))
      .execute(conn);
    expect(rows).toEqual([
      { id: 1, label: "A", status: "new" },
      { id: 2, label: "B", status: "new" },
    ]);
  } finally {
    await conn.close();
  }
});

test("sqlite: heterogeneous rows raise instead of silently inserting NULL", async () => {
  const { db: sdb, conn } = await typegres({ type: "sqlite" });
  try {
    await conn.execute(sql.raw(`CREATE TABLE mixed (
      id INTEGER PRIMARY KEY,
      label TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    )`));

    class Mixed extends sdb.Table("mixed") {
      id = (sqlite.Integer<1>).column({ nonNull: true, generated: true });      label = (sqlite.Text<1>).column({ nonNull: true });      status = (sqlite.Text<1>).column({ nonNull: true, default: sql`'new'` });    }

    await expect(
      Mixed.insert({ label: "A" }, { label: "B", status: "old" }).execute(conn),
    ).rejects.toThrow(/'status' is set in some rows but not others/);
  } finally {
    await conn.close();
  }
});

test("all-default single row uses DEFAULT VALUES; multi-row raises", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE counters (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY
    )`);

    class Counters extends db.Table("counters") {
      id = Int8.column({ nonNull: true, generated: true });    }

    const rows = await tx.execute(
      Counters.insert({}).returning(({ counters }) => ({ id: counters.id })),
    );
    expect(rows).toEqual([{ id: "1" }]);

    expect(() => Counters.insert({}, {}).finalize().bind()).toThrow(
      /multi-row insert with no columns provided/,
    );
  });
});
