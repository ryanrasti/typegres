import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "../types";
import { sql } from "./sql";
import { exec, db, withinTransaction } from "./test-helper";

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

    await Logs.delete().where(({ logs }) => logs.msg["="]("remove")).execute();

    const rows = await Logs.from()
      .select(({ logs }) => ({ msg: logs.msg }))
      .execute();

    expect(rows).toEqual([{ msg: "keep" }, { msg: "keep2" }]);
  });
});

test("delete returning", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE tags (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await exec.execute(sql`INSERT INTO tags (name) VALUES ('a'), ('b'), ('c')`);

    class Tags extends db.Table("tags") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
    }

    const rows = await Tags.delete()
      .where(({ tags }) => tags.name["="]("b"))
      .returning(({ tags }) => ({ id: tags.id, name: tags.name }))
      .execute();

    expectTypeOf(rows).toEqualTypeOf<{ id: bigint; name: string }[]>();
    expect(rows).toEqual([{ id: 2n, name: "b" }]);
  });
});

test("delete without where throws", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE noop2 (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY)`);

    class Noop2 extends db.Table("noop2") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
    }

    await expect(
      Noop2.delete().execute()
    ).rejects.toThrow("requires .where()");
  });
});
