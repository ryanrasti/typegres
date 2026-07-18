// Postgres table codegen tests, end-to-end against the dev Postgres
// (`bin/startpg`, via DATABASE_URL — same server the rest of the
// pg-backed suites use): real DDL into a scratch database, through
// postgresIntrospector → deriveRelations → generateTable, snapshot
// the generated TypeScript. Mirrors sqlite.test.ts.
//
// Isolation: postgresIntrospector reads the `public` schema of
// whatever database its URL points at, so each vitest worker gets its
// own scratch *database* (the per-worker schemas in test-helpers.ts
// don't help here). `generate()` resets `public` per call, so each
// test is hermetic.

import { describe, test, expect, beforeAll, afterAll } from "vitest";
import pg from "pg";
import { requireDatabaseUrl } from "../pg";
import { generateTable, deriveRelations } from "./generate";
import { postgresIntrospector } from "./postgres";
import { validateGenerated } from "./validate-generated";

const scratchName = `tg_introspect_w${process.env["VITEST_WORKER_ID"] ?? "1"}`;
const scratchUrl = (): string => {
  const u = new URL(requireDatabaseUrl());
  u.pathname = `/${scratchName}`;
  return u.toString();
};

beforeAll(async () => {
  const admin = new pg.Client(requireDatabaseUrl());
  await admin.connect();
  try {
    await admin.query(`DROP DATABASE IF EXISTS ${scratchName} WITH (FORCE)`);
    await admin.query(`CREATE DATABASE ${scratchName}`);
  } finally {
    await admin.end();
  }
});

afterAll(async () => {
  const admin = new pg.Client(requireDatabaseUrl());
  await admin.connect();
  try {
    await admin.query(`DROP DATABASE IF EXISTS ${scratchName} WITH (FORCE)`);
  } finally {
    await admin.end();
  }
});

// Full pipeline: DDL → scratch DB public schema → introspect →
// relations → emit. Mirrors runGeneration's composition minus the fs
// side. Every generated file is swc-validated before being returned.
const generate = async (ddl: string): Promise<Map<string, string>> => {
  const client = new pg.Client(scratchUrl());
  await client.connect();
  try {
    await client.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
    await client.query(ddl);
  } finally {
    await client.end();
  }
  const introspector = postgresIntrospector(scratchUrl());
  const intro = await introspector.introspect();
  const allFks = [...intro.tables.values()].flatMap((t) => t.fks);
  const out = new Map<string, string>();
  for (const [name, data] of intro.tables) {
    const src = generateTable(name, data.columns, deriveRelations(name, allFks), {
      typeImportPath: introspector.typeImportPath,
      dbImport: "../db",
    });
    await validateGenerated(src);
    out.set(name, src);
  }
  return out;
};

describe("postgres codegen e2e — DDL in, generated TypeScript out", () => {
  test("dogs/teams: identity PK generated + nonNull, nullable column, default, relations both directions", async () => {
    const files = await generate(`
      CREATE TABLE teams (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name text NOT NULL
      );
      CREATE TABLE dogs (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name text NOT NULL,
        breed text,
        team_id int8 NOT NULL REFERENCES teams(id),
        created_at timestamptz NOT NULL DEFAULT now(),
        name_upper text GENERATED ALWAYS AS (upper(name)) STORED
      );
    `);
    expect([...files.keys()]).toEqual(["dogs", "teams"]);
    expect(files.get("dogs")).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Relation, expose, sql } from "typegres";
      import { Int8, Text, Timestamptz } from "typegres/postgres";
      import { Teams } from "./teams";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        @expose() name = Text.column({ nonNull: true });
        @expose() breed = Text.column();
        @expose() team_id = Int8.column({ nonNull: true });
        @expose() created_at = Timestamptz.column({ nonNull: true, default: sql\`now()\` });
        @expose() name_upper = Text.column({ generated: true });
        // relations
        @expose() team() { return Relation.belongsTo(this, Teams, { id: this.team_id }); }
        // @generated-end
      }
      "
    `);
    expect(files.get("teams")).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Relation, expose } from "typegres";
      import { Int8, Text } from "typegres/postgres";
      import { Dogs } from "./dogs";

      export class Teams extends db.Table("teams") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        @expose() name = Text.column({ nonNull: true });
        // relations
        @expose() dogs() { return Relation.has(this, Dogs, { team_id: this.id }); }
        // @generated-end
      }
      "
    `);
  });

  test("partial unique index doesn't count as unique", async () => {
    // UNIQUE ... WHERE gives no global uniqueness guarantee, so the
    // inbound relation must stay "many".
    const files = await generate(`
      CREATE TABLE parent_t (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY);
      CREATE TABLE partial_child (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        parent_id int8 NOT NULL REFERENCES parent_t(id),
        archived boolean NOT NULL DEFAULT false
      );
      CREATE UNIQUE INDEX partial_uniq ON partial_child (parent_id) WHERE NOT archived;
    `);
    expect(files.get("parent_t")).toContain(`Relation.has(this, PartialChild`);
    expect(files.get("parent_t")).not.toContain(`{ card: "one" }`);
  });

  test("cardinality inference: composite PK/UNIQUE don't count as unique; single-column PK/UNIQUE do", async () => {
    // All four inbound cardinality cases hang off one parent:
    // - joiner:  FK inside a composite PK        → many
    // - tagged:  FK inside a composite UNIQUE    → many
    // - profile: FK is the single-column PK      → one
    // - badge:   nullable FK with its own UNIQUE → maybe
    const files = await generate(`
      CREATE TABLE parent_t (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY);
      CREATE TABLE joiner (
        a int8 NOT NULL REFERENCES parent_t(id),
        b int8 NOT NULL,
        PRIMARY KEY (a, b)
      );
      CREATE TABLE tagged (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        parent_id int8 NOT NULL REFERENCES parent_t(id),
        tag text NOT NULL,
        UNIQUE (parent_id, tag)
      );
      CREATE TABLE profile (
        parent_id int8 PRIMARY KEY REFERENCES parent_t(id)
      );
      CREATE TABLE badge (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        parent_id int8 UNIQUE REFERENCES parent_t(id)
      );
    `);
    expect(files.get("parent_t")).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Relation, expose } from "typegres";
      import { Int8 } from "typegres/postgres";
      import { Badge } from "./badge";
      import { Joiner } from "./joiner";
      import { Profile } from "./profile";
      import { Tagged } from "./tagged";

      export class ParentT extends db.Table("parent_t") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        // relations
        @expose() badge() { return Relation.has(this, Badge, { parent_id: this.id }, { card: "maybe" }); }
        @expose() joiner() { return Relation.has(this, Joiner, { a: this.id }); }
        @expose() profile() { return Relation.has(this, Profile, { parent_id: this.id }, { card: "one" }); }
        @expose() tagged() { return Relation.has(this, Tagged, { parent_id: this.id }); }
        // @generated-end
      }
      "
    `);
    expect(files.get("profile")).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Relation, expose } from "typegres";
      import { Int8 } from "typegres/postgres";
      import { ParentT } from "./parent_t";

      export class Profile extends db.Table("profile") {
        // @generated-start
        @expose() parent_id = Int8.column({ nonNull: true });
        // relations
        @expose() parent() { return Relation.belongsTo(this, ParentT, { id: this.parent_id }); }
        // @generated-end
      }
      "
    `);
  });
});
