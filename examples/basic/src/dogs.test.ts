import { test, expect, expectTypeOf, beforeAll } from "vitest";
import { sql } from "typegres";
import { db } from "./db";
import { Dogs } from "./tables/dogs";
import { Teams } from "./tables/teams";
import { Collars } from "./tables/collars";
import { Toys } from "./tables/toys";
import { Microchips } from "./tables/microchips";

beforeAll(async () => {
  // Create all tables
  await db.execute(sql`CREATE TABLE teams (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL
  )`);
  await db.execute(sql`CREATE TABLE dogs (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    breed text,
    created_at timestamptz NOT NULL DEFAULT now(),
    team_id int8 NOT NULL REFERENCES teams(id),
    rival_id int8 REFERENCES dogs(id)
  )`);
  await db.execute(sql`CREATE TABLE collars (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    color text NOT NULL,
    dog_id int8 UNIQUE NOT NULL REFERENCES dogs(id)
  )`);
  await db.execute(sql`CREATE TABLE toys (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    dog_id int8 NOT NULL REFERENCES dogs(id)
  )`);
  await db.execute(sql`CREATE TABLE microchips (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    serial text NOT NULL,
    dog_id int8 UNIQUE REFERENCES dogs(id)
  )`);

  // Seed data
  await db.execute(sql`INSERT INTO teams (name) VALUES ('Alpha'), ('Beta')`);
  await db.execute(sql`INSERT INTO dogs (name, breed, team_id) VALUES ('Rex', 'Labrador', 1), ('Fido', NULL, 1), ('Buddy', 'Poodle', 2)`);
  await db.execute(sql`UPDATE dogs SET rival_id = 2 WHERE name = 'Rex'`);
  await db.execute(sql`INSERT INTO collars (color, dog_id) VALUES ('red', 1), ('blue', 2)`);
  await db.execute(sql`INSERT INTO toys (name, dog_id) VALUES ('ball', 1), ('bone', 1), ('rope', 2)`);
  await db.execute(sql`INSERT INTO microchips (serial, dog_id) VALUES ('MC-001', 1)`);
  await db.execute(sql`INSERT INTO microchips (serial) VALUES ('MC-SPARE')`);
});

test("select dogs", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({ id: dogs.id, name: dogs.name, breed: dogs.breed }))
    .execute(db);

  expectTypeOf(rows).toEqualTypeOf<{ id: bigint; name: string; breed: string | null }[]>();
  expect(rows).toHaveLength(3);
  expect(rows.find((r) => r.name === "Rex")).toEqual({ id: 1n, name: "Rex", breed: "Labrador" });
});

// --- Relation cardinality tests ---

// Outbound FK NOT NULL → 'one': dog.team
test("relation: outbound FK NOT NULL → cardinality 'one'", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({
      name: dogs.name,
      team: dogs.team().select(({ teams }) => ({ name: teams.name })).scalar(),
    }))
    .where(({ dogs }) => dogs.name["="]("Rex"))
    .execute(db);

  expectTypeOf(rows).toEqualTypeOf<{ name: string; team: { name: string } }[]>();
  expect(rows).toEqual([{ name: "Rex", team: { name: "Alpha" } }]);
});

// Outbound FK nullable → 'maybe': dog.rival
test("relation: outbound FK nullable → cardinality 'maybe'", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({
      name: dogs.name,
      rival: dogs.rival().select(({ dogs: d }) => ({ name: d.name })).scalar(),
    }))
    .orderBy(({ dogs }) => dogs.name)
    .execute(db);

  expectTypeOf(rows).toEqualTypeOf<{ name: string; rival: { name: string } | null }[]>();
  expect(rows).toEqual([
    { name: "Buddy", rival: null },
    { name: "Fido", rival: null },
    { name: "Rex", rival: { name: "Fido" } },
  ]);
});

// Inbound FK non-unique → 'many': dog.toys
test("relation: inbound FK non-unique → cardinality 'many'", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({
      name: dogs.name,
      toys: dogs.toys().select(({ toys }) => ({ name: toys.name })).scalar(),
    }))
    .orderBy(({ dogs }) => dogs.name)
    .execute(db);

  expectTypeOf(rows).toEqualTypeOf<{ name: string; toys: { name: string }[] }[]>();
  expect(rows).toEqual([
    { name: "Buddy", toys: [] },
    { name: "Fido", toys: [{ name: "rope" }] },
    { name: "Rex", toys: [{ name: "ball" }, { name: "bone" }] },
  ]);
});

// Inbound FK unique NOT NULL → 'one': dog.collars
test("relation: inbound FK unique NOT NULL → cardinality 'one'", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({
      name: dogs.name,
      collar: dogs.collars().select(({ collars }) => ({ color: collars.color })).scalar(),
    }))
    .where(({ dogs }) => dogs.name["="]("Rex"))
    .execute(db);

  expectTypeOf(rows).toEqualTypeOf<{ name: string; collar: { color: string } }[]>();
  expect(rows).toEqual([{ name: "Rex", collar: { color: "red" } }]);
});

// Inbound FK unique nullable → 'maybe': dog.microchips
test("relation: inbound FK unique nullable → cardinality 'maybe'", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({
      name: dogs.name,
      chip: dogs.microchips().select(({ microchips }) => ({ serial: microchips.serial })).scalar(),
    }))
    .orderBy(({ dogs }) => dogs.name)
    .execute(db);

  expectTypeOf(rows).toEqualTypeOf<{ name: string; chip: { serial: string } | null }[]>();
  expect(rows).toEqual([
    { name: "Buddy", chip: null },
    { name: "Fido", chip: null },
    { name: "Rex", chip: { serial: "MC-001" } },
  ]);
});
