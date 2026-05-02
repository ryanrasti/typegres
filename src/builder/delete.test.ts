import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "../types";
import { sql } from "./sql";
import { setupDb, db, withinTransaction } from "../test-helpers";
setupDb();

test("delete with where", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE logs (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      msg text NOT NULL
    )`);
    await tx.execute(sql`INSERT INTO logs (msg) VALUES ('keep'), ('remove'), ('keep2')`);

    class Logs extends db.Table("logs") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      msg = (Text<1>).column({ nonNull: true });    }

    await tx.execute(Logs.delete().where(({ logs }) => logs.msg["="]("remove")));

    const rows = await tx.execute(
      Logs.from().select(({ logs }) => ({ msg: logs.msg })),
    );

    expect(rows).toEqual([{ msg: "keep" }, { msg: "keep2" }]);
  });
});

test("delete returning", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE tags (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await tx.execute(sql`INSERT INTO tags (name) VALUES ('a'), ('b'), ('c')`);

    class Tags extends db.Table("tags") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });    }

    const rows = await tx.execute(
      Tags.delete()
        .where(({ tags }) => tags.name["="]("b"))
        .returning(({ tags }) => ({ id: tags.id, name: tags.name })),
    );

    expectTypeOf(rows).toEqualTypeOf<{ id: string; name: string }[]>();
    expect(rows).toEqual([{ id: "2", name: "b" }]);
  });
});

test("delete: multiple where calls AND-combine", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE items (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      score int8 NOT NULL DEFAULT 0
    )`);
    await tx.execute(sql`INSERT INTO items (name, score) VALUES ('a', 10), ('b', 20), ('c', 10), ('d', 30)`);

    class Items extends db.Table("items") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });      score = (Int8<1>).column({ nonNull: true, default: sql`0` });    }

    await tx.execute(
      Items.delete()
        .where(({ items }) => items.score["="]("10"))
        .where(({ items }) => items.name["="]("a")),
    );

    const rows = await tx.execute(
      Items.from()
        .select(({ items }) => ({ name: items.name }))
        .orderBy(({ items }) => items.name),
    );

    expect(rows).toEqual([{ name: "b" }, { name: "c" }, { name: "d" }]);
  });
});

test("delete without where throws", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE noop2 (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY)`);

    class Noop2 extends db.Table("noop2") {
      id = (Int8<1>).column({ nonNull: true, generated: true });    }

    await expect(tx.execute(Noop2.delete())).rejects.toThrow("requires .where()");
  });
});
