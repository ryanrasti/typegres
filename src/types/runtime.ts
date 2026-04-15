import type { Sql } from "../builder/sql";
import { sql } from "../builder/sql";
import type { Any } from "./index";
import { getTypeDef } from "./deserialize";

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

// Overload matching: validate args and resolve return type constructor.
// Each case: [argMatchers (one per arg), returnType constructor].
// allowPrimitive: true if the corresponding TS primitive is accepted for this arg.
type ArgMatcher = { type: typeof Any; allowPrimitive?: boolean };
type MatchCase = [args: ArgMatcher[], retType: typeof Any];

// Validates args, serializes primitives, and returns [retType, ...serializedArgs].
// The caller destructures: const [retType, ...args] = match(...)
export const match = (args: unknown[], cases: MatchCase[]): [typeof Any, ...unknown[]] => {
  for (const [matchers, retType] of cases) {
    const matched = matchers.every((m, i) => {
      const arg = args[i];
      if (arg instanceof m.type) { return true; }
      if (m.allowPrimitive) {
        const expected = getTypeDef(m.type.__typname).tsType;
        if (typeof arg === expected) { return true; }
      }
      return false;
    });
    if (matched) {
      const serialized = matchers.map((m, i) => {
        if (args[i] instanceof m.type) { return args[i]; }
        return m.type.serialize(args[i]);
      });
      return [retType, ...serialized];
    }
  }
  throw new Error(`No matching overload for args: [${args.map((a) => typeof a).join(", ")}]`);
};

// Compile an arg to SQL. After match(), args are Any instances.
// Falls back to sql.param for edge cases (e.g., args passed directly to PgFunc without match).
const compileArg = (arg: unknown): Sql => {
  if (arg !== null && typeof arg === "object" && "__raw" in arg) {
    return (arg as { __raw: Sql }).__raw;
  }
  return sql.param(arg);
};

// Expression node builders — construct real typed instances via constructor(Sql)
export const PgFunc = (name: string, args: unknown[], type: typeof Any) => {
  const rawSql = sql`${sql.ident(name)}(${sql.join(args.map(compileArg))})`;
  return type.from(rawSql);
};

export const PgOp = (op: string, args: [unknown, unknown], type: typeof Any) => {
  const rawSql = sql`(${compileArg(args[0])} ${sql.raw(op)} ${compileArg(args[1])})`;
  return type.from(rawSql);
};

// Set-returning function result — implements Fromable for use in FROM/JOIN
export class PgSrf<R extends { [key: string]: Any<any> }, A extends string> {
  alias: A;
  rowType: R;
  #sql: Sql;

  constructor(name: A, args: unknown[], columnName: string, type: typeof Any) {
    this.alias = name;
    const colRef = sql`${sql.ident(name)}.${sql.ident(columnName)}`;
    this.rowType = { [columnName]: type.from(colRef) } as R;
    this.#sql = sql`${sql.ident(name)}(${sql.join(args.map(compileArg))})`;
  }

  compile(isSubquery?: boolean) {
    if (!isSubquery) {
      throw new Error("SRF cannot be compiled directly; use in FROM or JOIN");
    }
    return sql`${this.#sql} AS ${sql.ident(this.alias)}`;
  }
}

export const PgSrfFunc = <R extends { [key: string]: Any<any> }, A extends string>(
  name: A,
  args: unknown[],
  columnName: string,
  type: typeof Any,
): PgSrf<R, A> => {
  return new PgSrf(name, args, columnName, type);
};

// Multi-column SRF: columns defined by OUT params
export const PgSrfMulti = <A extends string>(
  name: A,
  args: unknown[],
  columns: [string, typeof Any][],
): PgSrf<any, A> => {
  const srf = new PgSrf(name, args, columns[0]![0], columns[0]![1]);
  // Override rowType with all columns
  const rowType: { [key: string]: Any<any> } = {};
  for (const [colName, type] of columns) {
    const colRef = sql`${sql.ident(name)}.${sql.ident(colName)}`;
    rowType[colName] = type.from(colRef);
  }
  srf.rowType = rowType;
  return srf;
};
