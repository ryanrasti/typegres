import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "../types";
import type { InsertRow } from "../types/runtime";
import { sql } from "./sql";
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
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });      color = (Text<0 | 1>).column();    }

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

test("insert returning", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE items (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      label text NOT NULL
    )`);

    class Items extends db.Table("items") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      label = (Text<1>).column({ nonNull: true });    }

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
