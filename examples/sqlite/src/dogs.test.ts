// End-to-end integration test for the codegen'd SQLite tables.
// Runs the migration DDL against `:memory:` (via `db` from ./db)
// then exercises INSERT / SELECT / WHERE / JOIN paths.

import { test, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { sql } from "typegres";
import { db, conn } from "./db";
import { Dogs } from "./tables/dogs";
import { Teams } from "./tables/teams";

// Run the same migrations file the CLI uses. Keeps the DDL in one
// place — if `001_schema.sql` changes and `tg generate` re-runs, the
// tests come along.
beforeAll(async () => {
  const migrationsDir = path.resolve(import.meta.dirname, "..", "migrations");
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    const stmts = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
    // conn.execute prepares a single statement per call; split on `;`
    // and skip empty fragments (last one is empty after trailing `;`).
    for (const stmt of stmts.split(";")) {
      const trimmed = stmt.trim();
      if (trimmed) { await conn.execute(sql.raw(trimmed)); }
    }
  }

  await Teams.insert({ name: "Alpha" }, { name: "Beta" }).execute(conn);
  // Explicit `breed: null` — SQLite inserts can't mix "column set" and
  // "column omitted" across rows in one call (typegres raises), since
  // SQLite has no per-row DEFAULT spelling.
  await Dogs.insert(
    { name: "Rex", breed: "Labrador", team_id: 1 },
    { name: "Fido", breed: null, team_id: 1 },
    { name: "Buddy", breed: "Poodle", team_id: 2 },
  ).execute(conn);
});

afterAll(async () => {
  await conn.close();
});

test("basic select: rows come back with column types matching the codegen'd shape", async () => {
  const rows = await Dogs.from()
    .select(({ dogs }) => ({ id: dogs.id, name: dogs.name, breed: dogs.breed }))
    .orderBy(({ dogs }) => dogs.id)
    .execute(conn);

  expectTypeOf(rows).toEqualTypeOf<{ id: number; name: string; breed: string | null }[]>();
  expect(rows).toEqual([
    { id: 1, name: "Rex", breed: "Labrador" },
    { id: 2, name: "Fido", breed: null },
    { id: 3, name: "Buddy", breed: "Poodle" },
  ]);
});

test("WHERE filters rows and preserves nullability in the returned type", async () => {
  const rows = await Dogs.from()
    .where(({ dogs }) => dogs.team_id.eq(1))
    .select(({ dogs }) => ({ name: dogs.name }))
    .orderBy(({ dogs }) => dogs.name)
    .execute(conn);

  expectTypeOf(rows).toEqualTypeOf<{ name: string }[]>();
  expect(rows.map((r) => r.name)).toEqual(["Fido", "Rex"]);
});

test("JOIN via .from().join() — dogs × teams matched on FK", async () => {
  const rows = await Dogs.from()
    .join(Teams, ({ dogs, teams }) => dogs.team_id.eq(teams.id))
    .select(({ dogs, teams }) => ({
      dog: dogs.name,
      team: teams.name,
    }))
    .orderBy(({ dogs }) => dogs.name)
    .execute(conn);

  expectTypeOf(rows).toEqualTypeOf<{ dog: string; team: string }[]>();
  expect(rows).toEqual([
    { dog: "Buddy", team: "Beta" },
    { dog: "Fido", team: "Alpha" },
    { dog: "Rex", team: "Alpha" },
  ]);
});

test("INSERT ... RETURNING gets back the auto-assigned rowid", async () => {
  const [row] = await Dogs.insert({ name: "Nova", team_id: 2 })
    .returning(({ dogs }) => ({ id: dogs.id, name: dogs.name }))
    .execute(conn);

  expectTypeOf(row).toEqualTypeOf<{ id: number; name: string } | undefined>();
  expect(row?.name).toBe("Nova");
  expect(typeof row?.id).toBe("number");
});

test("UPDATE ... RETURNING breed on Nova", async () => {
  const [row] = await Dogs.update()
    .where(({ dogs }) => dogs.name.eq("Nova"))
    .set(() => ({ breed: "Husky" }))
    .returning(({ dogs }) => ({ id: dogs.id, breed: dogs.breed }))
    .execute(conn);

  expectTypeOf(row).toEqualTypeOf<{ id: number; breed: string | null } | undefined>();
  expect(row?.breed).toBe("Husky");
});

test("db.Table provenance: Dogs.database === Teams.database === db", () => {
  expect(Dogs.database).toBe(db);
  expect(Teams.database).toBe(db);
});
