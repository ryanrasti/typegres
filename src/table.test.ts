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
