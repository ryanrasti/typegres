import { test, expect, expectTypeOf, beforeAll } from "vitest";
import { sql } from "typegres";
import { executor } from "./db";
import { Dogs } from "./tables/dogs";

beforeAll(async () => {
  await executor.execute(sql`CREATE TABLE dogs (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    breed text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`);
  await executor.execute(sql`INSERT INTO dogs (name, breed) VALUES ('Rex', 'Labrador'), ('Fido', NULL), ('Buddy', 'Poodle')`);
});

test("select all dogs", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({
      id: dogs.id,
      name: dogs.name,
      breed: dogs.breed,
    }))
    .execute();

  expectTypeOf(rows).toEqualTypeOf<{ id: bigint; name: string; breed: string }[]>();
  expect(rows).toHaveLength(3);
  expect(rows[0]).toEqual({ id: 1n, name: "Rex", breed: "Labrador" });
  expect(rows[1]).toEqual({ id: 2n, name: "Fido", breed: null });
});

test("select with where", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({
      name: dogs.name,
    }))
    .where(({ dogs }) => dogs.name["="]("Rex"))
    .execute();

  expectTypeOf(rows).toEqualTypeOf<{ name: string }[]>();
  expect(rows).toEqual([{ name: "Rex" }]);
});

test("select with order and limit", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({
      name: dogs.name,
    }))
    .orderBy(({ dogs }) => [dogs.name, "asc"])
    .limit(2)
    .execute();

  expect(rows).toEqual([{ name: "Buddy" }, { name: "Fido" }]);
});
