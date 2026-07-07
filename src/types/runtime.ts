export type { Sql } from "../builder/sql";
export { sql, Srf } from "../builder/sql";
import type { Raw } from "../builder/sql";
import { Func, Op, argToSql } from "../builder/sql";
import { SqlValue, meta } from "./sql-value";
import type { Any } from "./postgres";
import { isPlainData } from "../util";
import type { RowType } from "../builder/query";

// Nullability: 0 = null, 1 = non-null, 0|1 = nullable, number = aggregate/unknown
// StrictNull: null propagates — if any arg is null, result is null (proisstrict = true)
export type StrictNull<T extends number> = number extends T ? number : T;
// MaybeNull: function can return null even with non-null args (proisstrict = false)
export type MaybeNull<T extends number> = number extends T ? number : 0 | T;

// Extract nullability from a typed value or TS primitive.
// Typed values extend SqlValue<N> → extract N. TS primitives (number,
// string, etc.) → 1 (non-null). Works across dialects.
export type NullOf<T> = T extends SqlValue<infer N extends number> ? N : 1;

// Extract the TS type that a dialect type deserializes to.
// Uses the return type of deserialize(). For primitives passed directly, it's the type itself.
// Resolve the runtime JS type of a column / typegres expression.
// Non-SqlValue inputs collapse to `never` — methods, derived-column
// functions, arbitrary class keys aren't deserialized and have no
// "TS-side" type here. The fallback was previously `T`, which leaked
// method types into row results (caller would think `row.method`
// was callable; runtime returns plain objects).
//
// Nullability: N=0 → null, N=0|1 → U|null, N=1 → U, N=number → U (aggregate/unknown, not null).
export type TsTypeOf<T> =
  T extends SqlValue<infer N>
    ? T extends { deserialize: (_: any) => infer U }
      ? number extends N
        ? U
        : 0 extends N
          ? 1 extends N
            ? U | null
            : null
          : U
      : unknown
    : never;

// Extract the nullable variant of a dialect type via the [meta] bag
export type Nullable<T> = T extends { [meta]: { __nullable: infer U } } ? U : T;

// Extract the aggregate variant (N=number) of a dialect type via the [meta] bag
export type Aggregate<T extends SqlValue<any>> = T[typeof meta]['__aggregate'];

// Transform a row type to aggregate context — all columns become N=number
export type AggregateRow<R extends RowType> = {
  [K in keyof R]: R[K] extends SqlValue<any> ? Aggregate<R[K]> : never;
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
export type InsertRow<R> = { [K in RequiredKeys<R>]: TsTypeOf<R[K]> } & {
  [K in OptionalKeys<R>]?: TsTypeOf<R[K]>;
};

// Drop the column-only `__required` marker from a column type's meta.
// Lets SET-side typegres expressions (which don't carry `__required`)
// satisfy the column type without widening to `Any<N>` (which would
// lose class precision — Text expression assignable to Int8 column).
type StripRequired<T> = {
  [K in keyof T]: K extends typeof meta ? Omit<T[K], "__required"> : T[K];
};

// Update set row: per column, either a typegres expression of the same
// class & nullability (sans `__required`) or the JS-side primitive.
export type SetRow<R> = Partial<{
  [K in ColumnKeys<R>]: StripRequired<R[K]> | TsTypeOf<R[K]>;
}>;
export const isSetRow = (row: unknown): row is SetRow<any> => {
  if (typeof row !== "object" || row === null || Array.isArray(row)) {
    return false;
  }
  // Each value must be either a typegres expression (any dialect —
  // PG's Any or SQLite's SqliteValue both extend SqlValue) OR plain
  // data (recursively — no other class instances at any depth).
  return Object.values(row).every(
    (v) => v instanceof SqlValue || isPlainData(v),
  );
};

// Runtime type resolution
// pgType(expr) — returns the constructor via [meta].__class (set once in Any, narrowed by subclasses)
export const pgType = (expr: Any<any>): typeof Any => expr[meta].__class as typeof Any;
// pgElement(expr) — returns the element type constructor from a container's __element
export const pgElement = (expr: Any<any>): typeof Any => (expr[meta].__class as any).__element;

// Overload matching: validate args and resolve return type constructor.
// Each case: [argMatchers (one per arg), returnType constructor].
// allowPrimitive: true if the corresponding TS primitive is accepted for this arg.
// `type` is widened to `typeof SqlValue` so both PG- and SQLite-codegen
// call sites typecheck (both dialects' classes descend from SqlValue).
type ArgMatcher = { type: typeof SqlValue; allowPrimitive?: boolean };
type MatchCase = [args: ArgMatcher[], retType: typeof SqlValue];

// Validates args, serializes primitives, and returns [retType, ...serializedArgs].
// The caller destructures: const [retType, ...args] = match(...)
export const match = (args: unknown[], cases: MatchCase[]): [typeof SqlValue, ...unknown[]] => {
  for (const [matchers, retType] of cases) {
    const matched = matchers.every((m, i) => {
      const arg = args[i];
      if (arg instanceof m.type) {
        return true;
      }
      if (m.allowPrimitive) {
        if (typeof arg === m.type.primitiveTs) {
          return true;
        }
      }
      return false;
    });
    if (matched) {
      const serialized = matchers.map((m, i) => {
        if (args[i] instanceof m.type) {
          return args[i];
        }
        return m.type.serialize(args[i]);
      });
      return [retType, ...serialized];
    }
  }
  throw new Error(`No matching overload for args: [${args.map((a) => typeof a).join(", ")}]`);
};

// Expression node builders — construct real typed instances via
// constructor(Sql). Dialect is drawn from the target type's class
// (Int4.dialect.name === "postgres", Integer.dialect.name === "sqlite",
// etc.) so the resulting Func/Op node carries the right dialect tag
// for the compile-time provenance check.
//
// `type` is widened to `typeof SqlValue` (below all dialects) so both
// PG-codegen and SQLite-codegen call sites typecheck.
export const funcCall = (name: string, args: unknown[], type: typeof SqlValue) => {
  return type.from(new Func(name, args.map(argToSql), type.dialect.name));
};

export const opCall = (op: Raw, args: [unknown, unknown], type: typeof SqlValue) => {
  return type.from(new Op(op, argToSql(args[0]), argToSql(args[1]), type.dialect.name));
};
