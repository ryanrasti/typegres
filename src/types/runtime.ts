export type { Sql } from "../builder/sql";
export { sql } from "../builder/sql";
import type { BoundSql} from "../builder/sql";
import { Func, Op, Sql, sql } from "../builder/sql";
import * as types from "./index";
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
        const expected = getTypeDef(m.type.__typnameText).tsType;
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

// Extract the Sql node from an arg. After match(), args are Any instances.
const argToSql = (arg: unknown): Sql => {
  if (arg instanceof types.Any) { return arg.toSql(); }
  return sql.param(arg);
};

// Expression node builders — construct real typed instances via constructor(Sql)
export const PgFunc = (name: string, args: unknown[], type: typeof Any) => {
  return type.from(new Func(name, args.map(argToSql)));
};

export const PgOp = (op: Sql, args: [unknown, unknown], type: typeof Any) => {
  return type.from(new Op(op, argToSql(args[0]), argToSql(args[1])));
};

// Set-returning function result — a Fromable for use in FROM/JOIN.
// columns is the row shape: [[name, constructor], ...]. Single-column SRFs
// pass a 1-element array; multi-column SRFs with OUT params pass N entries.
export class PgSrf<R extends { [key: string]: Any<any> }, A extends string> extends Sql {
  readonly tsAlias: A;
  #name: string;
  #columns: [string, typeof Any][];
  #argsSql: Sql;

  constructor(name: A, args: unknown[], columns: [string, typeof Any][]) {
    super();
    this.tsAlias = name;
    this.#name = name;
    this.#columns = columns;
    this.#argsSql = sql.join(args.map(argToSql));
  }

  // Shape-only: columns hold sql.unbound(). QB's reAlias replaces with
  // real `Column(alias, key)` refs at bind time.
  rowType(): R {
    return Object.fromEntries(
      this.#columns.map(([colName, type]) => [colName, type.from(sql.unbound())]),
    ) as R;
  }

  // FROM-clause source fragment (pre-AS). QB appends `AS <alias>`.
  override bind(): BoundSql {
    return sql`${sql.ident(this.#name)}(${this.#argsSql})`;
  }

  // Expose the args fragment so generic tree walkers (extractor, linting,
  // future live-query predicate extraction) can see the expressions passed
  // into the SRF rather than stopping at the opaque boundary.
  override children(): readonly Sql[] { return [this.#argsSql]; }
}
