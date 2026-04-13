import { sql, Sql } from "../sql-builder";
import type { Any } from "./index";

// Nullability: 0 = null, 1 = non-null, 0|1 = nullable, number = aggregate/unknown
// StrictNull: null propagates — if any arg is null, result is null (proisstrict = true)
export type StrictNull<T extends number> = number extends T ? number : T;
// MaybeNull: function can return null even with non-null args (proisstrict = false)
export type MaybeNull<T extends number> = number extends T ? number : 0 | T;

// Extract nullability from a pg expression or TS primitive
// Pg types extend Any<N> → extract N. TS primitives (number, string, etc.) → 1 (non-null).
export type NullOf<T> = T extends Any<infer N extends number> ? N : 1;

// Extract the TS type that a pg type deserializes to
// Uses the return type of the instance deserialize() method. For primitives passed directly, it's the type itself.
// eslint-disable-next-line no-unused-vars
export type TsTypeOf<T> = T extends { deserialize: (_: any) => infer U } ? U : T;

// Runtime type resolution
// pgType(expr) — returns the constructor via __class (set once in Any, narrowed by subclasses)
export const pgType = (expr: Any<any>): typeof Any => expr.__class as typeof Any;
// pgElement(expr) — returns the element type constructor from a container's __element
export const pgElement = (expr: Any<any>): typeof Any => (expr.__class as any).__element;

// Map JS typeof to pg type name for casting primitives
const JS_TO_PG: Record<string, string> = {
  number: "int4",
  string: "text",
  boolean: "bool",
  bigint: "int8",
};

// Compile an arg — either a pg expression (has __raw) or a TS primitive (becomes a CAST'd param)
const compileArg = (arg: unknown): Sql => {
  if (arg !== null && typeof arg === "object" && "__raw" in arg) {
    return (arg as { __raw: Sql }).__raw;
  }
  const pgType = JS_TO_PG[typeof arg];
  if (pgType) {
    return sql`CAST(${sql.param(arg)} AS ${sql.raw(pgType)})`;
  }
  return sql.param(arg);
};

// Expression node builders — construct real typed instances via constructor(Sql)
export const PgFunc = <T>(name: string, args: unknown[], type: new (raw: Sql) => T): T => {
  const rawSql = sql`${sql.ident(name)}(${sql.join(args.map(compileArg))})`;
  return new type(rawSql);
};

export const PgOp = <T>(op: string, args: [unknown, unknown], type: new (raw: Sql) => T): T => {
  const rawSql = sql`(${compileArg(args[0])} ${sql.raw(op)} ${compileArg(args[1])})`;
  return new type(rawSql);
};
