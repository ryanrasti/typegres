// Provenance enforcement tests — the security property from ISSUES.md #16.
//
// Each tagged Sql AST node checks its provenance against the compile
// ctx at bind time:
//   - Ident: this.database === ctx.database (reference equality)
//   - Func / Op / UnaryOp / Cast / Srf: this.dialect must match ctx.database.dialect
//
// This suite is unit-only (no driver / no execute); everything is
// exercised via `compile(sql, { database })` directly.
import { test, expect, describe } from "vitest";
import { Database } from "./database";
import { compile, sql, Ident, UnaryOp, Raw, Param } from "./builder/sql";
import { Int4, Text } from "./types/postgres";
import { Integer } from "./types/sqlite";

// Two same-dialect databases → distinct provenance identities.
const dbA = new Database({ dialect: "postgres", name: "dbA" });
const dbB = new Database({ dialect: "postgres", name: "dbB" });
// Different-dialect databases for Func/Op/Cast/Srf dialect checks.
const pgDb = new Database({ dialect: "postgres", name: "pg" });
const sqliteDb = new Database({ dialect: "sqlite", name: "sqlite" });

describe("Ident provenance", () => {
  test("Ident from db A rejected when compiled against db B", () => {
    class UsersA extends dbA.Table("users") {}
    const q = sql`SELECT * FROM ${UsersA.bind()}`;
    expect(() => compile(q, { database: dbB })).toThrow(
      /Ident 'users' provenance mismatch/,
    );
  });

  test("Ident from db A accepted when compiled against db A", () => {
    class UsersA extends dbA.Table("users") {}
    const q = sql`SELECT * FROM ${UsersA.bind()}`;
    expect(() => compile(q, { database: dbA })).not.toThrow();
  });

  test("`sql.ident` is not on the public helper (escape hatch closed)", () => {
    // Free-standing `sql.ident(...)` used to construct untagged Idents
    // that passed any ctx. Removed from the public helper — the only
    // API path is `db.scopedIdent(name)`. Library-internal code can
    // still construct untagged Idents via `new Ident(name)` but that
    // isn't reachable from external code (and is definitely not
    // reachable from exoeval callbacks — `sql` is not exposed on the
    // wire).
    expect((sql as unknown as { ident?: unknown }).ident).toBeUndefined();
  });

  test("library-internal untagged Ident (new Ident(name)) still passes any ctx", () => {
    // The library uses this pattern for CTE-alias names, output labels,
    // and other local-scope identifiers where no schema is referenced.
    // Verified here so future refactors that tighten Ident construction
    // don't silently break the internal use case.
    const q = sql`SELECT ${new Ident("foo")} FROM t`;
    expect(() => compile(q, { database: dbA })).not.toThrow();
    expect(() => compile(q, { database: dbB })).not.toThrow();
    expect(() => compile(q, { database: sqliteDb })).not.toThrow();
  });

  test("Column via db.Table carries its Table's database", () => {
    class Users extends dbA.Table("users") {
      id = Int4.column({ nonNull: true });
    }
    const q = Users.from().where(({ users }) => users.id.eq(Int4.from(1)));
    expect(() => compile(q, { database: dbB })).toThrow(
      /provenance mismatch/,
    );
    expect(() => compile(q, { database: dbA })).not.toThrow();
  });
});

describe("Func dialect", () => {
  test("PG Func rejected in SQLite ctx", () => {
    // `upper()` codegen'd from PG carries dialect: "postgres".
    const q = sql`SELECT ${Text.from("x").upper().toSql()}`;
    expect(() => compile(q, { database: sqliteDb })).toThrow(
      /Func 'upper'.* dialect 'postgres'.* against 'sqlite'/,
    );
  });

  test("PG Func accepted in PG ctx", () => {
    const q = sql`SELECT ${Text.from("x").upper().toSql()}`;
    expect(() => compile(q, { database: pgDb })).not.toThrow();
  });

  test("SQLite Func rejected in PG ctx", () => {
    // `Integer.abs()` codegen'd from SQLite carries dialect: "sqlite".
    const q = sql`SELECT ${Integer.from(1).abs().toSql()}`;
    expect(() => compile(q, { database: pgDb })).toThrow(
      /Func 'abs'.* dialect 'sqlite'.* against 'postgres'/,
    );
  });

  test("SQLite Func accepted in SQLite ctx", () => {
    const q = sql`SELECT ${Integer.from(1).abs().toSql()}`;
    expect(() => compile(q, { database: sqliteDb })).not.toThrow();
  });

});

describe("Op dialect", () => {
  test("PG Op rejected in SQLite ctx", () => {
    // Int4["+"] is codegen'd from PG; the emitted Op node carries
    // dialect: "postgres".
    const q = sql`SELECT ${Int4.from(1)["+"](Int4.from(2)).toSql()}`;
    expect(() => compile(q, { database: sqliteDb })).toThrow(
      /Op '\+'.* dialect 'postgres'.* against 'sqlite'/,
    );
  });

  test("PG Op accepted in PG ctx", () => {
    const q = sql`SELECT ${Int4.from(1)["+"](Int4.from(2)).toSql()}`;
    expect(() => compile(q, { database: pgDb })).not.toThrow();
  });

});

describe("UnaryOp dialect", () => {
  test("tagged UnaryOp rejects cross-dialect", () => {
    const q = new UnaryOp(new Raw("NOT"), new Param(true), "postgres");
    expect(() => compile(q, { database: sqliteDb })).toThrow(
      /UnaryOp.* dialect 'postgres'.* against 'sqlite'/,
    );
    expect(() => compile(q, { database: pgDb })).not.toThrow();
  });
});

describe("Cast dialect", () => {
  test("PG Cast rejected in SQLite ctx", () => {
    // `Int4.from(5)` produces a TypedParam → Cast tagged postgres.
    const q = sql`SELECT ${Int4.from(5).toSql()}`;
    expect(() => compile(q, { database: sqliteDb })).toThrow(
      /Cast.* dialect 'postgres'.* against 'sqlite'/,
    );
  });

  test("SQLite Cast rejected in PG ctx", () => {
    const q = sql`SELECT ${Integer.from(5).toSql()}`;
    expect(() => compile(q, { database: pgDb })).toThrow(
      /Cast.* dialect 'sqlite'.* against 'postgres'/,
    );
  });

});

describe("cross-dialect Ident smuggling", () => {
  test("A PG-tagged Ident spliced into a SQLite query throws at compile", () => {
    class PgUsers extends pgDb.Table("users") {}
    // Attacker angle: build a SQLite query and splice in a PG-provenance Ident.
    const q = sql`SELECT ${PgUsers.bind()} FROM t`;
    expect(() => compile(q, { database: sqliteDb })).toThrow(
      /provenance mismatch/,
    );
  });
});
