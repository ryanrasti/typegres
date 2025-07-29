import { RawBuilder, sql } from "kysely";
import {
  Expression,
  QueryAlias,
  SelectableExpression,
  ExistsExpression,
  NotExistsExpression,
  SetOperationExpression,
} from "../expression";
import { Any, Bool, NumericLike, Record } from "../types";
import { dummyDb } from "../test/db";
import { AggregateOfRow } from "../types/aggregate";
import { Primitive, maybePrimitiveToSqlType } from "../types/primitive";
import { Context } from "../expression";
import type { Typegres } from "../db";
import { MakeNullable } from "../types/any";

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

type RowLikeResult<R extends RowLike | Scalar> = R extends Scalar
  ? RowLike
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

export class SubqueryExpression extends SelectableExpression {
  constructor(public subquery: Setof<any>) {
    super(resultType(subquery.query));
  }
  compile(ctx: Context) {
    return this.subquery.compile(ctx);
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

const parseRowLike = <R extends RowLike>(
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

// Helper type to make all columns in a RowLike nullable
type MakeRowNullable<R> = R extends RowLike
  ? { [K in keyof R]: MakeNullable<R[K]> }
  : R extends Scalar
    ? MakeNullable<R>
    : never;

export type ResultType<Q extends Query> = Q["select"] extends RowLike | Scalar
  ? Q["select"]
  : Q["from"]["from"];

export const resultType = <Q extends Query>(query: Q) => {
  return (query.select ?? query.from.from) as ResultType<Q>;
};

export type AwaitedResultType<Q extends Query> =
  Q["select"] extends Record<0 | 1, infer RL>
    ? RowLikeResult<RL>[]
    : Q["select"] extends Scalar
      ? ScalarResult<Q["select"]>[]
      : Q["select"] extends RowLike
        ? RowLikeResult<Q["select"]>[]
        : Q["from"]["from"] extends Scalar
          ? ScalarResult<Q["from"]["from"]>[]
          : RowLikeResult<Q["from"]["from"]>[];

type SetOperationCompatible<Q extends Query> = {
  select?: ResultType<Q>;
  from: FromItem<ResultType<Q>, Joins>;
};

const createSetOperation = <Q extends Query, Q2 extends Query>(
  self: Setof<Q>,
  other: Setof<Q2>,
  operation:
    | "UNION"
    | "UNION ALL"
    | "INTERSECT"
    | "INTERSECT ALL"
    | "EXCEPT"
    | "EXCEPT ALL",
  aliasName: string,
): Setof<{ from: FromItem<ResultType<Q>, Joins> }> => {
  const alias = new QueryAlias(aliasName);
  const result = resultType(self.query);
  const schema = isScalar(result)
    ? { value: result as Any<unknown, 0 | 1> }
    : (result as RowLike);
  const aliasedResult = isScalar(result)
    ? aliasScalar(alias, result)
    : aliasRowLike(alias, result);
  return new Setof({
    from: new FromItem(
      new SetOperationExpression(self, other, operation, schema),
      alias,
      {},
      aliasedResult,
    ),
  }) as any;
};

import { OrderByExpression, compileOrderBy } from "./order-by";
import {
  FromItem,
  FromToSelectArgs,
  Joins,
  JoinTables,
  MakeJoinsNullable,
} from "./from-item";

export type JoinType = "JOIN" | "LEFT JOIN" | "RIGHT JOIN" | "FULL OUTER JOIN";

export type Query = {
  select?: RowLike | Scalar;
  from: FromItem<RowLike | Scalar, Joins>;
  wheres?: [Bool<0 | 1>, ...Bool<0 | 1>[]];
  havings?: [Bool<0 | 1>, ...Bool<0 | 1>[]];
  groupBy?: Any<unknown, 0 | 1>[];
  orderBys?: OrderByExpression[];
  limit?: NumericLike | number;
  offset?: NumericLike | number;
};

export type BindedSetof<Q extends Query> = typeof Setof<Q> & {
  "new"(fromExpr: Expression): Setof<Q>;
};

export type SelectArgs<Q extends Query> = Q["groupBy"] extends unknown[]
  ? [AggregateOfRow<Q["from"]["from"]>, NonNullable<Q["groupBy"]>]
  : FromToSelectArgs<Q["from"]["from"], Q["from"]["joins"]>;

export class Setof<Q extends Query> extends Expression {
  constructor(public query: Q) {
    super();
  }

  static of<R extends RowLike>(fromRow: R) {
    return class extends Setof<{
      from: FromItem<R, Joins>;
      select: R;
      wheres: undefined;
      groupBy: undefined;
    }> {
      static new(fromExpr: Expression) {
        const alias = new QueryAlias("values");
        return new Setof<{ from: FromItem<R, Joins> }>({
          from: new FromItem(fromExpr, alias, {}, aliasRowLike(alias, fromRow)),
        });
      }
    };
  }

  static ofSchema(fromRow: { [key: string]: typeof Any<unknown> }) {
    return this.of(
      Object.fromEntries(
        Object.entries(fromRow).map(([k, Cls]) => [k, Cls.new("")]),
      ) as RowLike,
    );
  }

  toSelectArgs(): SelectArgs<Q> {
    return Array.isArray(this.query.groupBy)
      ? ([
          this.query.from.toSelectArgs()[0],
          this.query.groupBy,
        ] as SelectArgs<Q>)
      : (this.query.from.toSelectArgs() as SelectArgs<Q>);
  }

  select<S extends RowLikeRelaxed | ScalarRelaxed>(
    fn: (...from: SelectArgs<Q>) => S,
  ) {
    return new Setof({
      ...this.query,
      select: maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
    });
  }

  where(fn: (...from: SelectArgs<Q>) => Bool<0 | 1> | boolean) {
    return new Setof({
      ...this.query,
      wheres: [
        ...(this.query.wheres ?? []),
        maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
      ],
    });
  }

  groupBy<G extends Any<unknown, 0 | 1>[]>(fn: (...args: SelectArgs<Q>) => G) {
    return new Setof({
      ...this.query,
      groupBy: [
        ...(this.query.groupBy ?? []),
        ...fn(...this.toSelectArgs()),
      ] as [...(Q["groupBy"] extends unknown[] ? Q["groupBy"] : []), ...G],
    });
  }

  having<H extends Bool<0 | 1> | boolean>(
    this: Setof<Q & { groupBy: unknown[] }>,
    fn: (...from: SelectArgs<Q>) => H,
  ) {
    return new Setof({
      ...this.query,
      havings: [
        ...(this.query.havings ?? []),
        maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
      ],
    });
  }

  limit(limit: NumericLike | number) {
    return new Setof({ ...this.query, limit });
  }

  offset(offset: NumericLike | number) {
    return new Setof({ ...this.query, offset });
  }

  orderBy(...fns: Array<(...from: SelectArgs<Q>) => OrderByExpression>) {
    return new Setof({
      ...this.query,
      // Add new orderBys at the beginning to match user expectation
      // Last call should be the primary sort
      orderBys: [
        ...(this.query.orderBys ?? []),
        ...fns.map((fn) => fn(...this.toSelectArgs())),
      ],
    });
  }

  join<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: Q["from"]["from"],
      js: JoinTables<Q["from"]["joins"]> & { [a in A]: ResultType<J> },
    ) => Bool<0 | 1> | boolean,
  ) {
    return new Setof({
      ...this.query,
      from: this.query.from.join(j, as, on),
    }) as unknown as Setof<
      Omit<Q, "from"> & {
        from: FromItem<
          Q["from"]["from"],
          Q["from"]["joins"] & {
            [a in A]: {
              table: Setof<J>;
              on: Bool<0 | 1>;
              row: ResultType<J>;
              type: "RIGHT JOIN";
            };
          }
        >;
      }
    >;
  }

  leftJoin<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: Q["from"]["from"],
      js: JoinTables<Q["from"]["joins"]> & {
        [a in A]: MakeRowNullable<ResultType<J>>;
      },
    ) => Bool<0 | 1> | boolean,
  ) {
    return new Setof({
      ...this.query,
      from: this.query.from.leftJoin(j, as, on),
    }) as unknown as Setof<
      Omit<Q, "from"> & {
        from: FromItem<
          Q["from"]["from"],
          Q["from"]["joins"] & {
            [a in A]: {
              table: Setof<J>;
              on: Bool<0 | 1>;
              row: MakeRowNullable<ResultType<J>>;
              type: "RIGHT JOIN";
            };
          }
        >;
      }
    >;
  }

  rightJoin<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: Q["from"]["from"],
      js: JoinTables<Q["from"]["joins"]> & {
        [a in A]: ResultType<J>;
      },
    ) => Bool<0 | 1> | boolean,
  ) {
    return new Setof({
      ...this.query,
      from: this.query.from.rightJoin(j, as, on),
    }) as unknown as Setof<
      Omit<Q, "from"> & {
        from: FromItem<
          MakeRowNullable<Q["from"]["from"]>,
          MakeJoinsNullable<Q["from"]["joins"]> & {
            [a in A]: {
              table: Setof<J>;
              on: Bool<0 | 1>;
              row: ResultType<J>;
              type: "RIGHT JOIN";
            };
          }
        >;
      }
    >;
  }

  fullOuterJoin<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: Q["from"]["from"],
      js: JoinTables<Q["from"]["joins"]> & {
        [a in A]: MakeRowNullable<ResultType<J>>;
      },
    ) => Bool<0 | 1> | boolean,
  ) {
    return new Setof({
      ...this.query,
      from: this.query.from.joinWithType(j, as, "FULL OUTER JOIN", on),
    }) as unknown as Setof<
      Omit<Q, "from"> & {
        from: FromItem<
          MakeRowNullable<Q["from"]["from"]>,
          MakeJoinsNullable<Q["from"]["joins"]> & {
            [a in A]: {
              table: Setof<J>;
              on: Bool<0 | 1>;
              row: MakeRowNullable<ResultType<J>>;
              type: "RIGHT JOIN";
            };
          }
        >;
      }
    >;
  }

  subquery(): Setof<{ from: FromItem<ResultType<Q>, Joins> }> {
    const alias = new QueryAlias("subquery");
    const res = resultType(this.query);
    return new Setof({
      from: new FromItem(
        new SubqueryExpression(this),
        alias,
        {},
        isScalar(res) ? aliasScalar(alias, res) : aliasRowLike(alias, res),
      ),
    });
  }

  compile(ctxIn: Context): RawBuilder<unknown> {
    const [ctx, from, joins] = this.query.from.compile(ctxIn);

    const selectEntries = this.query.select
      ? isScalar(this.query.select)
        ? { value: this.query.select }
        : this.query.select
      : {};
    const select = this.query.select
      ? sql`SELECT ${sql.join(
          Object.entries(selectEntries).map(
            ([key, value]) =>
              sql`${value.toExpression().compile(ctx)} AS ${sql.ref(key)}`,
          ),
        )}`
      : sql`SELECT *`;

    const where = this.query.wheres
      ? sql`WHERE ${sql.join(
          this.query.wheres.map((w) => sql`(${w.toExpression().compile(ctx)})`),
          sql` AND `,
        )}`
      : sql``;

    const groupBy = this.query.groupBy
      ? sql`GROUP BY ${sql.join(
          this.query.groupBy.map(
            (g) => sql`(${g.toExpression().compile(ctx)})`,
          ),
          sql`, `,
        )}`
      : sql``;

    const having = this.query.havings
      ? sql`HAVING ${sql.join(
          this.query.havings.map(
            (h) => sql`(${h.toExpression().compile(ctx)})`,
          ),
          sql` AND `,
        )}`
      : sql``;

    const orderBy = this.query.orderBys
      ? sql`ORDER BY ${sql.join(compileOrderBy(this.query.orderBys, ctx), sql`, `)}`
      : sql``;

    const limit =
      this.query.limit != null
        ? sql`LIMIT ${typeof this.query.limit === "number" ? this.query.limit : this.query.limit.toExpression().compile(ctx)}`
        : sql``;

    const offset =
      this.query.offset != null
        ? sql`OFFSET ${typeof this.query.offset === "number" ? this.query.offset : this.query.offset.toExpression().compile(ctx)}`
        : sql``;

    return sql`(${select} FROM ${from} ${joins} ${where} ${groupBy} ${having} ${orderBy} ${limit} ${offset})`;
  }

  debug() {
    console.log(
      "Debugging query:",
      this.compile(Context.new()).compile(dummyDb),
    );
    return this;
  }

  async execute(tg: Typegres): Promise<AwaitedResultType<Q>> {
    const kysely = (tg as any)._internal;
    const kexpr = kysely.executeQuery(
      this.compile(Context.new()).compile(kysely),
    );
    const resultRowLike = this.query.select
      ? this.query.select
      : this.query.from.from;

    try {
      const result = await kexpr;
      return (result.rows as RowLikeRawResult<RowLike>[]).map((row) =>
        isScalar(resultRowLike)
          ? (resultRowLike
              .getClass()
              .parse(Object.values(row)[0] as string) as any)
          : parseRowLike(resultRowLike, row),
      ) as AwaitedResultType<Q>;
    } catch (err) {
      console.error(
        "Error executing query:",
        this.compile(Context.new()).compile(kysely),
        err,
      );
      throw err;
    }
  }

  scalar<S extends Scalar>(this: Setof<{ select: S; from: Query["from"] }>): S {
    return this.query.select.getClass().new(this) as unknown as S;
  }

  /**
   * SQL EXISTS operator - checks if the subquery returns any rows
   * EXISTS (SELECT ...)
   */
  exists(): Bool<1> {
    return Bool.new(new ExistsExpression(this)) as Bool<1>;
  }

  /**
   * SQL NOT EXISTS operator - checks if the subquery returns no rows
   * NOT EXISTS (SELECT ...)
   */
  notExists(): Bool<1> {
    return Bool.new(new NotExistsExpression(this)) as Bool<1>;
  }

  /**
   * SQL UNION operator - combines results of two queries, removing duplicates
   */
  union(other: Setof<Q>): Setof<SetOperationCompatible<Q>> {
    return createSetOperation(this, other, "UNION", "union");
  }

  /**
   * SQL UNION ALL operator - combines results of two queries, keeping duplicates
   */
  unionAll(other: Setof<Q>): Setof<SetOperationCompatible<Q>> {
    return createSetOperation(this, other, "UNION ALL", "union");
  }

  /**
   * SQL INTERSECT operator - returns rows that exist in both queries, removing duplicates
   */
  intersect(other: Setof<Q>): Setof<SetOperationCompatible<Q>> {
    return createSetOperation(this, other, "INTERSECT", "intersect");
  }

  /**
   * SQL INTERSECT ALL operator - returns rows that exist in both queries, keeping duplicates
   */
  intersectAll(other: Setof<Q>): Setof<SetOperationCompatible<Q>> {
    return createSetOperation(this, other, "INTERSECT ALL", "intersect");
  }

  /**
   * SQL EXCEPT operator - returns rows from first query that don't exist in second, removing duplicates
   */
  except(other: Setof<Q>): Setof<SetOperationCompatible<Q>> {
    return createSetOperation(this, other, "EXCEPT", "except");
  }

  /**
   * SQL EXCEPT ALL operator - returns rows from first query that don't exist in second, keeping duplicates
   */
  exceptAll(other: Setof<Q>): Setof<SetOperationCompatible<Q>> {
    return createSetOperation(this, other, "EXCEPT ALL", "except");
  }

  // then(
  //   resolve: (
  //     result: Q["select"] extends Scalar
  //       ? ScalarResult<Q["select"]>[]
  //       : Q["select"] extends RowLike
  //       ? RowLikeResult<Q["select"]>[]
  //       : RowLikeResult<Q["from"]>[]
  //   ) => void,
  //   reject: (err: unknown) => void
  // ): void {
  //   this.execute().then(resolve).catch(reject);
  // }
}

export const values = <R extends RowLike>(...input: [R, ...R[]]) => {
  return Setof.of(input[0]).new(new ValuesExpression(input));
};
