import { sql } from "kysely";
import { Expression, QueryAlias, SelectableExpression } from "../expression";
import { Any, Bool, Float8, Numeric, Text } from "../types";
import { Context } from "../expression";
import { Values } from "./from-item";
export { Values } from "./from-item";

export type RowLike = object;
export type RowLikeStrict = {
  [key: string]: Any<unknown, 0 | 1>;
};
export type PickAny<R extends RowLike> = {
  [K in keyof R]: R[K] extends Any ? R[K] : never;
};
export const pickAny = <R extends RowLike>(row: R): PickAny<R> & { [key in string]: Any } => {
  return Object.fromEntries(
    Object.entries(row)
      .filter(([_, value]) => value instanceof Any)
      .map(([key, value]) => [key, value]),
  ) as PickAny<R>;
};

export type ScalarResult<R extends unknown> =
  R extends Any<infer R, infer Nullable> ? (Nullable extends 0 ? null : Nullable extends 1 ? R : R | null) : never;

type RowLikeRawResult<R extends RowLike> = {
  [K in keyof R]: string | null;
};

type FilteredKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];

type RemoveNever<T> = Pick<T, FilteredKeys<T>>;

type Expand<T> = T extends object ? { [K in keyof T]: T[K] } : T;

export type RowLikeResult<R extends RowLike> = Expand<
  RemoveNever<{
    [K in keyof R]: ScalarResult<R[K]>;
  }>
>;

export class TableReferenceExpression extends SelectableExpression {
  constructor(
    public table: QueryAlias,
    schema: RowLike,
  ) {
    super(schema);
  }

  compile(ctx: Context) {
    return sql.ref(ctx.getAlias(this.table));
  }
}

// Like `TableReferenceExpression` but referencing a table directly (not an alias)
export class RawTableReferenceExpression extends SelectableExpression {
  constructor(
    public table: string,
    schema: RowLike,
  ) {
    super(schema);
  }

  compile(_ctx: Context) {
    return sql.ref(this.table);
  }
}

export class ValuesExpression extends SelectableExpression {
  constructor(public values: [RowLike, ...RowLike[]]) {
    super(values[0]);
  }

  compile(ctx: Context) {
    return sql`(VALUES ${sql.join(
      this.values.map(
        (value) =>
          sql`(${sql.join(
            Object.entries(value)
              .toSorted(([k1], [k2]) => k1.localeCompare(k2))
              .map(([, value]) => sql`${value.toExpression().compile(ctx)}`),
          )})`,
      ),
    )})`;
  }
}

const referenceRowLike = <R extends RowLike>(toExpr: (key: string) => Expression, row: R): R => {
  const copy = Object.create(row);
  for (const key in row) {
    const value = row[key];
    if (value instanceof Any) {
      copy[key] = value.getClass().new(toExpr(key));
    }
  }
  return copy as R;
};

export const aliasRowLike = <R extends RowLike>(queryAlias: QueryAlias, row: R) =>
  referenceRowLike((key) => new ColumnAliasExpression(queryAlias, key), row);

export const rawAliasRowLike = <R extends RowLike>(alias: string, row: R) =>
  referenceRowLike((key) => new RawColumnAliasExpression(alias, key), row);

export const bareRowLike = <R extends RowLike>(row: R) => referenceRowLike((key) => new BareColumnExpression(key), row);

export class ColumnAliasExpression extends Expression {
  constructor(
    public alias: QueryAlias,
    public column: string,
  ) {
    super();
  }

  compile(ctx: Context) {
    return sql.ref(`${ctx.getAlias(this.alias)}.${this.column}`);
  }
}

export class RawColumnAliasExpression extends Expression {
  constructor(
    public alias: string,
    public column: string,
  ) {
    super();
  }

  compile(_ctx: Context) {
    return sql.ref(`${this.alias}.${this.column}`);
  }
}

export class BareColumnExpression extends Expression {
  constructor(public column: string) {
    super();
  }

  compile(_ctx: Context) {
    return sql.ref(this.column);
  }
}

export const parseRowLike = <R extends RowLike>(rowLike: RowLike, result: RowLikeRawResult<RowLike>) => {
  return Object.fromEntries(
    Object.entries(rowLike).map(([key, value]) => {
      const res = result[key as keyof RowLikeRawResult<RowLike>];
      return [key, res === null ? res : value.getClass().parse(res)];
    }),
  ) as RowLikeResult<R>;
};

type CanonicalizableType = boolean | number | bigint | string;
type CanonicalType<T extends CanonicalizableType> = T extends boolean
  ? Bool<0 | 1>
  : T extends number
    ? Float8<0 | 1>
    : T extends bigint
      ? Numeric<0 | 1>
      : T extends string
        ? Text<0 | 1>
        : never;

const toCanonicalType = <T extends CanonicalizableType>(value: T): CanonicalType<T> => {
  const typeString = typeof value as "boolean" | "number" | "bigint" | "string";
  return {
    boolean: Bool,
    number: Float8,
    bigint: Numeric,
    string: Text,
  }[typeString].new(value as any) as unknown as CanonicalType<T>;
};

export type AnyOrParsed<T extends RowLikeStrict> = Expand<{
  [key in keyof T]: ScalarResult<T[key]> | T[key];
}>;

export type RowLikeCanonicalizable = {
  [key: string]: Any<unknown, 0 | 1> | CanonicalizableType;
};

export type CanonicalRowType<R extends RowLikeCanonicalizable> = {
  [K in keyof R]: R[K] extends CanonicalizableType
    ? CanonicalType<R[K]>
    : R[K] extends Any<unknown, 0 | 1>
      ? R[K]
      : never;
};

// Convenience function to create Values
export function values<R extends RowLikeStrict>(...rows: [R, ...AnyOrParsed<R>[]]): Values<R>;
export function values<R extends RowLikeCanonicalizable>(
  ...rows: [R, ...AnyOrParsed<CanonicalRowType<R>>[]]
): Values<Expand<CanonicalRowType<R>>>;
export function values(...rows: object[]) {
  const [row, ...rest] = rows;
  const schema = Object.fromEntries(
    Object.entries(row).map(([key, value]) => {
      return [key, value instanceof Any ? value : toCanonicalType(value as CanonicalizableType)];
    }),
  ) as RowLikeStrict;

  return new Values([
    schema,
    ...rest.map((subrow) => {
      return Object.fromEntries(
        Object.entries(subrow).map(([key, value]) => {
          const rowValue = schema[key];
          return [key, value instanceof Any ? value : rowValue.getClass().new(value)];
        }),
      ) as unknown as RowLikeStrict;
    }),
  ]);
}
