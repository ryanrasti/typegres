import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "../types";
import type { InsertRow } from "../types/runtime";
import { sql } from "./sql";
import { db, withinTransaction } from "./test-helper";

test("insert", async () => {
  await withinTransaction(async () => {
    await db.execute(sql`CREATE TABLE cats (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      color text
    )`);

    class Cats extends db.Table("cats") {
      get id() { return (Int8<1>).column(this, "id", { nonNull: true, generated: true }); }
      get name() { return (Text<1>).column(this, "name", { nonNull: true }); }
      get color() { return (Text<0 | 1>).column(this, "color"); }
    }

    // name is required, id and color are optional
    // @ts-expect-error — missing required field 'name'
    const _bad: InsertRow<InstanceType<typeof Cats>> = { color: "black" };

    await db.execute(Cats.insert({ name: "Whiskers" }, { name: "Tom", color: "orange" }));

    const rows = await db.execute(
      Cats.from().select(({ cats }) => ({ name: cats.name, color: cats.color })),
    );

    expect(rows).toEqual([
      { name: "Whiskers", color: null },
      { name: "Tom", color: "orange" },
    ]);
  });
});

test("insert returning", async () => {
  await withinTransaction(async () => {
    await db.execute(sql`CREATE TABLE items (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      label text NOT NULL
    )`);

    class Items extends db.Table("items") {
      get id() { return (Int8<1>).column(this, "id", { nonNull: true, generated: true }); }
      get label() { return (Text<1>).column(this, "label", { nonNull: true }); }
    }

    const rows = await db.execute(
      Items.insert({ label: "A" }, { label: "B" })
        .returning(({ items }) => ({ id: items.id, label: items.label })),
    );

    expectTypeOf(rows).toEqualTypeOf<{ id: bigint; label: string }[]>();
    expect(rows).toEqual([
      { id: 1n, label: "A" },
      { id: 2n, label: "B" },
    ]);
  });
});
