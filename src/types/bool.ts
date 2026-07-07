// Dialect-agnostic Bool marker interface. Each dialect ships a concrete
// Bool class with its own dialect-specific method surface (pg_catalog
// operators on PG, SQLite scalar comparisons on SQLite). This interface
// is intentionally minimal — just a nominal marker — because concrete
// Bool classes' `and`/`or`/`not` take contravariant arg types (each
// dialect's own concrete Bool). Trying to require them here creates a
// TS variance mismatch when a concrete class is assigned to `Bool<N>`.
//
// Callers that need chaining (`combinePredicates`, etc.) should widen
// through `SqlValue<any>` or use raw sql templates. RPC-boundary
// validation uses the `zBool` zod schema exported below — an identity
// check on the class catches misuse without depending on the type system.
//
// Detection uses `v.constructor === v.constructor.dialect.bool` — each
// dialect's Bool class is the canonical value of `dialect.bool`, so
// the identity check is enough. No separate marker symbol needed.
import z from "zod";
import { Op, UnaryOp, sql, type Sql, type DialectName } from "../builder/sql";
import { SqlValue } from "./sql-value";

// Intentionally empty (structural extension of SqlValue) — see file
// comment on why chainable ops aren't declared here.
export interface Bool<N extends number> extends SqlValue<N> {}

// Constructor / static surface each dialect's Bool exposes. SqlValue's
// isNull/isNotNull/in reach through `dialect.bool.from(...)` at call time.
export interface BoolClass {
  from(v: Sql): Bool<0 | 1>;
  from(v: unknown): Bool<1>;
  readonly __typname: Sql;
  readonly __typnameText: string;
}

// Module-local — every caller goes through `zBool` below, which threads
// the identity check together with a specific error message.
const isBool = (v: unknown): v is Bool<any> =>
  v instanceof SqlValue &&
  // v.constructor is typed as Function; compare against the dialect's
  // Bool class (a distinct nominal type from Function) via unknown.
  (v.constructor as unknown) === (v.constructor as typeof SqlValue).dialect.bool;

// Shared zod schema for RPC/exoeval boundary validation of a Bool
// return or argument. The bespoke error message ("expected Bool,
// received <typeof>") replaces zod's generic `Invalid input`, so
// misuses point at the right thing — otherwise a boolean-returning
// callback that returns a raw string / number surfaces as an opaque
// zod error deep inside compile().
export const zBool = z.custom<Bool<any>>(isBool, {
  error: (issue) => `expected Bool, received ${typeof issue.input}`,
});

// AND/OR/NOT helpers for each dialect's concrete Bool class. AND/OR/NOT
// are the same SQL in every dialect, but the returned Op/UnaryOp still
// carries the caller's dialect so the compile-time provenance check
// stays strictly-tagged. No primitive boolean coercion (that path had
// no callers and expanded the accepted runtime shapes wider than the
// API contract needed).
export const boolAnd = (leftSql: Sql, right: { toSql: () => Sql }, dialect: DialectName): Sql =>
  new Op(sql`AND`, leftSql, right.toSql(), dialect);

export const boolOr = (leftSql: Sql, right: { toSql: () => Sql }, dialect: DialectName): Sql =>
  new Op(sql`OR`, leftSql, right.toSql(), dialect);

export const boolNot = (sqlExpr: Sql, dialect: DialectName): Sql =>
  new UnaryOp(sql`NOT`, sqlExpr, dialect);
