import { sql } from "kysely";
import { Expression, QueryAlias, SelectableExpression } from "../expression";
import { Any } from "../types";
import { Primitive } from "../types/primitive";
import { Context } from "../expression";

export type RowLike = {
  [key: string]: Any<unknown, 0 | 1>;
};
export type RowLikeRelaxed = {
  [key: string]: Any<unknown, 0 | 1> | Primitive;
};

export type Scalar = Any;
export type ScalarRelaxed = Any<unknown, 0 | 1> | Primitive;

export const isScalar = (value: unknown): value is Scalar => {
  return value instanceof Any;
};

export const extractScalarFromRowLike = <R extends RowLike>(row: R) => {
  const [value, ...rest] = Object.values(row);
  invariant(rest.length === 0, "RowLike should have only one scalar value");
  return value;
};

export const isScalarRelaxed = (value: unknown): value is ScalarRelaxed => {
  return (
    isScalar(value) ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  );
};

type ScalarResult<R extends Scalar> =
  R extends Any<infer R, infer Nullable>
    ? Nullable extends 0
      ? null
      : Nullable extends 1
        ? R
        : R | null
    : never;

type RowLikeRawResult<R extends RowLike> = {
  [K in keyof R]: string | null;
};

export type RowLikeResult<R extends RowLike | Scalar> = R extends Scalar
  ? R
  : {
      [K in keyof R]: R extends RowLike ? ScalarResult<R[K]> : never;
    };

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

export const aliasRowLike = <R extends RowLike>(
  queryAlias: QueryAlias,
  row: R,
) => {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key,
      value.getClass().new(new ColumnAliasExpression(queryAlias, key)),
    ]),
  ) as R;
};

export const aliasScalar = <S extends Scalar>(
  queryAlias: QueryAlias,
  scalar: S,
) => {
  return scalar.getClass().new(new ColumnAliasExpression(queryAlias, "value"));
};

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

export const parseRowLike = <R extends RowLike>(
  rowLike: RowLike,
  result: RowLikeRawResult<RowLike>,
) => {
  return Object.fromEntries(
    Object.entries(rowLike).map(([key, value]) => {
      const res = result[key];
      return [key, res === null ? res : value.getClass().parse(res)];
    }),
  ) as RowLikeResult<R>;
};

import { FromItem } from "./from-item";
import invariant from "tiny-invariant";

export const values = <R extends RowLike>(...input: [R, ...R[]]) => {
  const alias = new QueryAlias("values");
  return new FromItem(
    new ValuesExpression(input),
    alias,
    {},
    aliasRowLike(alias, input[0]),
  );
};
