import type { Sql } from "../builder/sql";
import { sql } from "../builder/sql";
import type { Any } from "./index";

// Global metadata symbol — hides internals from autocomplete.
// All type metadata (__class, __nullable, __nonNullable, etc.) lives under this key.
export const meta = Symbol("typegres");

export type Meta<T> = T extends { [meta]: infer M } ? M : never;

// Nullability: 0 = null, 1 = non-null, 0|1 = nullable, number = aggregate/unknown
// StrictNull: null propagates — if any arg is null, result is null (proisstrict = true)
export type StrictNull<T extends number> = number extends T ? number : T;
// MaybeNull: function can return null even with non-null args (proisstrict = false)
export type MaybeNull<T extends number> = number extends T ? number : 0 | T;

// Extract nullability from a pg expression or TS primitive
// Pg types extend Any<N> → extract N. TS primitives (number, string, etc.) → 1 (non-null).
export type NullOf<T> = T extends Any<infer N extends number> ? N : 1;

// Extract the TS type that a pg type deserializes to.
// Uses the return type of deserialize(). For primitives passed directly, it's the type itself.
// Nullability: N=0 → null, N=0|1 → U|null, N=1 → U, N=number → U (aggregate/unknown, not null)
export type TsTypeOf<T> =
  T extends Any<infer N>
    ? (T extends { deserialize: (_: any) => infer U }
      ? (number extends N ? U : 0 extends N ? (1 extends N ? U | null : null) : U)
      : unknown)
    : T;

// Extract the nullable variant of a pg type via the [meta] bag
export type Nullable<T> = T extends { [meta]: { __nullable: infer U } } ? U : T;

// Extract the aggregate variant (N=number) of a pg type via the [meta] bag
export type Aggregate<T> = T extends { [meta]: { __aggregate: infer U } } ? U : T;

// Transform a row type to aggregate context — all columns become N=number
export type AggregateRow<R> = {
  [K in keyof R]: Aggregate<R[K]>;
};

// Keys of R that are column descriptors (have the __required brand from column())
export type ColumnKeys<R> = {
  [K in keyof R]: R[K] extends { [meta]: { __required: boolean } } ? K : never;
}[keyof R];

// Column requirement: check if [meta] has __required: true
export type IsRequired<T> = T extends { [meta]: { __required: true } } ? true : false;

// Extract required column keys from a row type (for insert)
export type RequiredKeys<R> = {
  [K in ColumnKeys<R>]: IsRequired<R[K]> extends true ? K : never;
}[ColumnKeys<R>];

// Extract optional column keys from a row type (for insert)
export type OptionalKeys<R> = {
  [K in ColumnKeys<R>]: IsRequired<R[K]> extends true ? never : K;
}[ColumnKeys<R>];

// Insert row: required columns + optional columns (as TsTypeOf)
export type InsertRow<R> =
  { [K in RequiredKeys<R>]: TsTypeOf<R[K]> } &
  { [K in OptionalKeys<R>]?: TsTypeOf<R[K]> };

// Update set row: partial of all columns (as TsTypeOf)
export type SetRow<R> = Partial<{ [K in ColumnKeys<R>]: TsTypeOf<R[K]> }>;

// Runtime type resolution
// pgType(expr) — returns the constructor via [meta].__class (set once in Any, narrowed by subclasses)
export const pgType = (expr: Any<any>): typeof Any => expr[meta].__class as typeof Any;
// pgElement(expr) — returns the element type constructor from a container's __element
export const pgElement = (expr: Any<any>): typeof Any => (expr[meta].__class as any).__element;

// Map JS typeof to pg type name for casting primitives
const JS_TO_PG: { [key: string]: string } = {
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
