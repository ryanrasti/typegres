// SQLite table codegen tests.
//
// Two altitudes on purpose:
// - `affinityToClass` stays unit-tested: it's a pure string→string rule
//   table where a failure should name the exact rule that broke.
// - Everything downstream is tested end-to-end: real DDL into a real
//   SQLite file, through sqliteIntrospector → deriveRelations →
//   generateTable, snapshot the generated TypeScript. This pins tests
//   to the actual contract (DDL in, code out) rather than intermediate
//   shapes like ColumnInfo/FkInfo, which are expected to change (see
//   flags.md). The marker/@expose() preservation logic is
//   generateTable's own API and stays unit-tested in generate.test.ts.

import { describe, test, expect } from "vitest";
import * as os from "node:os";
import * as fs from "node:fs";
import * as path from "node:path";
import { generateTable, deriveRelations } from "./generate";
import { affinityToClass, sqliteIntrospector } from "./sqlite";
import { validateGenerated } from "./validate-generated";

describe("affinityToClass — SQLite type affinity rules", () => {
  test("INTEGER → Integer", () => { expect(affinityToClass("INTEGER")).toBe("Integer"); });
  test("INT → Integer", () => { expect(affinityToClass("INT")).toBe("Integer"); });
  test("TINYINT → Integer (contains 'INT')", () => { expect(affinityToClass("TINYINT")).toBe("Integer"); });
  test("TEXT → Text", () => { expect(affinityToClass("TEXT")).toBe("Text"); });
  test("VARCHAR(80) → Text", () => { expect(affinityToClass("VARCHAR(80)")).toBe("Text"); });
  test("BLOB → Blob", () => { expect(affinityToClass("BLOB")).toBe("Blob"); });
  test("empty declared type → Blob", () => { expect(affinityToClass("")).toBe("Blob"); });
  test("REAL → Real", () => { expect(affinityToClass("REAL")).toBe("Real"); });
  test("DOUBLE PRECISION → Real", () => { expect(affinityToClass("DOUBLE PRECISION")).toBe("Real"); });

  test("BOOLEAN → Bool (overlay before affinity)", () => { expect(affinityToClass("BOOLEAN")).toBe("Bool"); });
  test("bool → Bool (case-insensitive)", () => { expect(affinityToClass("bool")).toBe("Bool"); });

  // NUMERIC affinity fall-through → Any (no narrow view).
  test("DATE → Any (NUMERIC affinity, no domain type)", () => {
    expect(affinityToClass("DATE")).toBe("Any");
  });
  test("DATETIME → Any", () => { expect(affinityToClass("DATETIME")).toBe("Any"); });
  test("DECIMAL(10,2) → Any", () => { expect(affinityToClass("DECIMAL(10,2)")).toBe("Any"); });
  test("NUMERIC → Any", () => { expect(affinityToClass("NUMERIC")).toBe("Any"); });

  // Classic SQLite affinity gotchas — we match SQLite's own behavior.
  test("FLOATING POINT → Integer (rule 1 catches 'POINT' → 'INT')", () => {
    expect(affinityToClass("FLOATING POINT")).toBe("Integer");
  });
  test("CHARINT → Integer (rule 1 beats rule 2)", () => {
    expect(affinityToClass("CHARINT")).toBe("Integer");
  });
  test("STRING → Any (no matching affinity rule)", () => {
    expect(affinityToClass("STRING")).toBe("Any");
  });
});

// --- End-to-end: DDL in, generated TypeScript out ---

// Full pipeline: DDL → temp .db file → introspect → relations → emit.
// Mirrors runGeneration's composition minus the fs side (existing-file
// handling is generate.test.ts territory). Every generated file is
// swc-validated before being returned.
const generate = async (ddl: string): Promise<Map<string, string>> => {
  // eslint-disable-next-line no-restricted-syntax -- optional peer, test-scoped
  const mod = (await import("better-sqlite3")).default;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tg-sqlite-"));
  try {
    const file = path.join(dir, "test.db");
    const db = new mod(file);
    try {
      db.exec(ddl);
    } finally {
      db.close();
    }
    const introspector = await sqliteIntrospector(file);
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
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

describe("sqlite codegen e2e — DDL in, generated TypeScript out", () => {
  test("dogs/teams: rowid PK generated + nonNull, nullable column, BOOLEAN default, NUMERIC-affinity column, relations both directions", async () => {
    const files = await generate(`
      CREATE TABLE teams (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
      CREATE TABLE dogs (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        breed TEXT,
        team_id INTEGER NOT NULL REFERENCES teams(id),
        active BOOLEAN NOT NULL DEFAULT 0,
        seen_at DATETIME
      );
    `);
    expect([...files.keys()]).toEqual(["dogs", "teams"]);
    expect(files.get("dogs")).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { expose, sql } from "typegres";
      import { Any, Bool, Integer, Text } from "typegres/sqlite";
      import { Teams } from "./teams";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Integer.column({ nonNull: true, generated: true });
        @expose() name = Text.column({ nonNull: true });
        @expose() breed = Text.column();
        @expose() team_id = Integer.column({ nonNull: true });
        @expose() active = Bool.column({ nonNull: true, default: sql\`0\` });
        @expose() seen_at = Any.column();
        // relations
        @expose() team() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id.eq(this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
    expect(files.get("teams")).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { expose } from "typegres";
      import { Integer, Text } from "typegres/sqlite";
      import { Dogs } from "./dogs";

      export class Teams extends db.Table("teams") {
        // @generated-start
        @expose() id = Integer.column({ nonNull: true, generated: true });
        @expose() name = Text.column({ nonNull: true });
        // relations
        @expose() dogs() { return Dogs.scope(Teams.contextOf(this)).where(({ dogs }) => dogs.team_id.eq(this.id)).cardinality("many"); }
        // @generated-end
      }
      "
    `);
  });

  test("partial/expression unique indexes don't count as unique", async () => {
    // - partial_child: UNIQUE ... WHERE — no global uniqueness
    //   guarantee, so inbound stays "many".
    // - expr_child: unique index over an expression — index_info
    //   reports name=NULL for the member; must not poison the
    //   unique-column set (or crash on a null name).
    const files = await generate(`
      CREATE TABLE parent_t (id INTEGER PRIMARY KEY);
      CREATE TABLE partial_child (
        id INTEGER PRIMARY KEY,
        parent_id INTEGER NOT NULL REFERENCES parent_t(id),
        archived INTEGER NOT NULL DEFAULT 0
      );
      CREATE UNIQUE INDEX partial_uniq ON partial_child (parent_id) WHERE archived = 0;
      CREATE TABLE expr_child (
        id INTEGER PRIMARY KEY,
        parent_id INTEGER NOT NULL REFERENCES parent_t(id),
        name TEXT NOT NULL
      );
      CREATE UNIQUE INDEX expr_uniq ON expr_child (lower(name));
    `);
    const parent = files.get("parent_t")!;
    expect(parent).toContain(`partial_child() { return PartialChild.scope(ParentT.contextOf(this)).where(({ partial_child }) => partial_child.parent_id.eq(this.id)).cardinality("many"); }`);
    expect(parent).toContain(`expr_child() { return ExprChild.scope(ParentT.contextOf(this)).where(({ expr_child }) => expr_child.parent_id.eq(this.id)).cardinality("many"); }`);
  });

  test("cardinality inference: composite PK/UNIQUE don't count as unique; single-column PK/UNIQUE do", async () => {
    // All four inbound cardinality cases hang off one parent:
    // - joiner:  FK inside a composite PK        → many
    // - tagged:  FK inside a composite UNIQUE    → many
    // - profile: FK is the single-column PK      → one
    // - badge:   nullable FK with its own UNIQUE → maybe
    const files = await generate(`
      CREATE TABLE parent_t (id INTEGER PRIMARY KEY);
      CREATE TABLE joiner (
        a INTEGER NOT NULL REFERENCES parent_t(id),
        b INTEGER NOT NULL,
        PRIMARY KEY (a, b)
      );
      CREATE TABLE tagged (
        id INTEGER PRIMARY KEY,
        parent_id INTEGER NOT NULL REFERENCES parent_t(id),
        tag TEXT NOT NULL,
        UNIQUE (parent_id, tag)
      );
      CREATE TABLE profile (
        parent_id INTEGER PRIMARY KEY REFERENCES parent_t(id)
      );
      CREATE TABLE badge (
        id INTEGER PRIMARY KEY,
        parent_id INTEGER UNIQUE REFERENCES parent_t(id)
      );
    `);
    expect(files.get("parent_t")).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { expose } from "typegres";
      import { Integer } from "typegres/sqlite";
      import { Badge } from "./badge";
      import { Joiner } from "./joiner";
      import { Profile } from "./profile";
      import { Tagged } from "./tagged";

      export class ParentT extends db.Table("parent_t") {
        // @generated-start
        @expose() id = Integer.column({ nonNull: true, generated: true });
        // relations
        @expose() badge() { return Badge.scope(ParentT.contextOf(this)).where(({ badge }) => badge.parent_id.eq(this.id)).cardinality("maybe"); }
        @expose() joiner() { return Joiner.scope(ParentT.contextOf(this)).where(({ joiner }) => joiner.a.eq(this.id)).cardinality("many"); }
        @expose() profile() { return Profile.scope(ParentT.contextOf(this)).where(({ profile }) => profile.parent_id.eq(this.id)).cardinality("one"); }
        @expose() tagged() { return Tagged.scope(ParentT.contextOf(this)).where(({ tagged }) => tagged.parent_id.eq(this.id)).cardinality("many"); }
        // @generated-end
      }
      "
    `);
    // profile's outbound side: its FK column is an INTEGER PRIMARY KEY
    // rowid alias — PRAGMA reports notnull=0, but it's semantically
    // non-null, so the outbound relation must be "one", not "maybe".
    expect(files.get("profile")).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { expose } from "typegres";
      import { Integer } from "typegres/sqlite";
      import { ParentT } from "./parent_t";

      export class Profile extends db.Table("profile") {
        // @generated-start
        @expose() parent_id = Integer.column({ nonNull: true, generated: true });
        // relations
        @expose() parent() { return ParentT.scope(Profile.contextOf(this)).where(({ parent_t }) => parent_t.id.eq(this.parent_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);

    // Composite PK: first column gets pk=1 in PRAGMA but is NOT a rowid
    // alias — both a and b are insert-supplied. Must not emit generated: true.
    const joiner = files.get("joiner")!;
    expect(joiner).toContain("@expose() a = Integer.column({ nonNull: true });");
    expect(joiner).toContain("@expose() b = Integer.column({ nonNull: true });");
    expect(joiner).not.toMatch(/a = Integer\.column\(\{ nonNull: true, generated: true \}\)/);
  });

  test("composite INTEGER PRIMARY KEY columns are not rowid aliases (not generated)", async () => {
    // Regression: isRowidAlias used to treat pk===1 alone as a rowid alias,
    // so room_id in PRIMARY KEY (room_id, user_id) was wrongly generated: true.
    const files = await generate(`
      CREATE TABLE rooms (id INTEGER PRIMARY KEY);
      CREATE TABLE users (id INTEGER PRIMARY KEY);
      CREATE TABLE room_members (
        room_id INTEGER NOT NULL REFERENCES rooms(id),
        user_id INTEGER NOT NULL REFERENCES users(id),
        PRIMARY KEY (room_id, user_id)
      );
    `);
    const members = files.get("room_members")!;
    expect(members).toContain("@expose() room_id = Integer.column({ nonNull: true });");
    expect(members).toContain("@expose() user_id = Integer.column({ nonNull: true });");
    expect(members).not.toContain("generated: true");
    // Single-column INTEGER PK still is a rowid alias.
    expect(files.get("rooms")).toContain("@expose() id = Integer.column({ nonNull: true, generated: true });");
  });
});
