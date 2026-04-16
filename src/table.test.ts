import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "./types";
import { sql } from "./builder/sql";
import { exec, db, withinTransaction } from "./builder/test-helper";

test("Table.from().select()", async () => {
  await withinTransaction(async () => {
    await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
    await db.execute(sql`CREATE TABLE dogs (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      breed text
    )`);
    await db.execute(sql`INSERT INTO dogs (name, breed) VALUES ('Rex', 'Labrador'), ('Fido', NULL)`);

    class Dogs extends db.Table("dogs") {
      id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
      breed = (Text<0 | 1>).column();
    }

    const rows = await db.execute(Dogs.from()
      .select(({ dogs }) => ({ id: dogs.id, name: dogs.name, breed: dogs.breed }))
      );

    expectTypeOf(rows).toEqualTypeOf<{ id: bigint; name: string; breed: string | null }[]>();
    expect(rows).toEqual([
      { id: 1n, name: "Rex", breed: "Labrador" },
      { id: 2n, name: "Fido", breed: null },
    ]);
  });
});

test("Table.as() alias", async () => {
  await withinTransaction(async () => {
    await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
    await db.execute(sql`CREATE TABLE dogs (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      breed text
    )`);
    await db.execute(sql`INSERT INTO dogs (name, breed) VALUES ('Rex', 'Labrador'), ('Fido', NULL)`);

    class Dogs extends db.Table("dogs") {
      id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
      breed = (Text<0 | 1>).column();
    }

    const rows = await db.execute(Dogs.as("d").from()
      .select(({ d }) => ({ id: d.id, name: d.name, breed: d.breed }))
      );

    expectTypeOf(rows).toEqualTypeOf<{ id: bigint; name: string; breed: string | null }[]>();
    expect(rows).toEqual([
      { id: 1n, name: "Rex", breed: "Labrador" },
      { id: 2n, name: "Fido", breed: null },
    ]);
  });
});
