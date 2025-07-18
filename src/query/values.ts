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
import { row } from "../types/record";
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

type MakeJoinsNullable<J extends Query["joins"]> = {
  [K in keyof J]: NonNullable<J>[K] & {
    row: MakeRowNullable<NonNullable<J>[K]["row"]>;
  };
};

type JoinTables<J extends Query["joins"]> = {
  [key in keyof J]: NonNullable<J>[key]["row"];
};

export type ResultType<Q extends Query> = Q["select"] extends RowLike | Scalar
  ? Q["select"]
  : Q["from"];

export const resultType = <Q extends Query>(query: Q) => {
  return (query.select ?? query.from) as ResultType<Q>;
};

export type AwaitedResultType<Q extends Query> =
  Q["select"] extends Record<0 | 1, infer RL>
    ? RowLikeResult<RL>[]
    : Q["select"] extends Scalar
      ? ScalarResult<Q["select"]>[]
      : Q["select"] extends RowLike
        ? RowLikeResult<Q["select"]>[]
        : Q["from"] extends Scalar
          ? ScalarResult<Q["from"]>[]
          : RowLikeResult<Q["from"]>[];

type SetOperationCompatible<Q extends Query> = {
  select?: ResultType<Q>;
  from: ResultType<Q>;
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
): Setof<{ from: ResultType<Q> }> => {
  const alias = new QueryAlias(aliasName);
  const result = resultType(self.query);
  const schema = isScalar(result)
    ? { value: result as Any<unknown, 0 | 1> }
    : (result as RowLike);
  const aliasedResult = isScalar(result)
    ? aliasScalar(alias, result)
    : aliasRowLike(alias, result);
  return new Setof(
    new SetOperationExpression(self, other, operation, schema),
    alias,
    {},
    { from: aliasedResult },
    result,
  ) as any;
};

import { OrderByExpression, compileOrderBy } from "./order-by";

export type JoinType = "JOIN" | "LEFT JOIN" | "RIGHT JOIN" | "FULL OUTER JOIN";
type Join = {
  table: Setof<any>;
  row: RowLike;
  on: Bool<0 | 1>;
  type: JoinType;
};

export type Query = {
  select?: RowLike | Scalar;
  from: RowLike | Scalar;
  joins?: { [key: string]: Join };
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
  ? [AggregateOfRow<Q["from"]>, NonNullable<Q["groupBy"]>]
  : [
      Q["from"] extends RowLike ? Record<1, Q["from"]> & Q["from"] : Q["from"],
      JoinTables<Q["joins"]>,
    ];

export class Setof<Q extends Query> extends Expression {
  constructor(
    public rawFromExpr: Expression,
    public fromAlias: QueryAlias,
    public joinAliases: { [key: string]: QueryAlias },
    public query: Q,
    public fromRow: RowLike | Scalar,
  ) {
    super();
  }

  static of<R extends RowLike>(fromRow: R) {
    return class extends Setof<{
      from: R;
      select: R;
      wheres: undefined;
      groupBy: undefined;
    }> {
      static new(fromExpr: Expression) {
        const alias = new QueryAlias("values");
        return new Setof<{
          from: R;
        }>(
          fromExpr,
          alias,
          {},
          {
            from: aliasRowLike(alias, fromRow),
          },
          fromRow,
        );
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
      ? ([this.query.from, this.query.groupBy] as any)
      : ([
          isScalar(this.query.from)
            ? this.query.from
            : row(
                this.query.from,
                new TableReferenceExpression(this.fromAlias, this.query.from),
              ),
          this.joinTables(),
        ] as any);
  }

  select<S extends RowLikeRelaxed | ScalarRelaxed>(
    fn: (...from: SelectArgs<Q>) => S,
  ) {
    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      this.joinAliases,
      {
        ...this.query,
        select: maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
      },
      this.fromRow,
    );
  }

  where(fn: (...from: SelectArgs<Q>) => Bool<0 | 1> | boolean) {
    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      this.joinAliases,
      {
        ...this.query,
        wheres: [
          ...(this.query.wheres ?? []),
          maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
        ],
      },
      this.fromRow,
    );
  }

  groupBy<G extends Any<unknown, 0 | 1>[]>(fn: (from: Q["from"]) => G) {
    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      this.joinAliases,
      {
        ...this.query,
        groupBy: [...(this.query.groupBy ?? []), ...fn(this.query.from)] as [
          ...(Q["groupBy"] extends unknown[] ? Q["groupBy"] : []),
          ...G,
        ],
      },
      this.fromRow,
    );
  }

  having<H extends Bool<0 | 1> | boolean>(
    this: Setof<Q & { groupBy: unknown[] }>,
    fn: (...from: SelectArgs<Q>) => H,
  ) {
    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      this.joinAliases,
      {
        ...this.query,
        havings: [
          ...(this.query.havings ?? []),
          maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
        ],
      },
      this.fromRow,
    );
  }

  limit(limit: NumericLike | number) {
    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      this.joinAliases,
      { ...this.query, limit },
      this.fromRow,
    );
  }

  offset(offset: NumericLike | number) {
    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      this.joinAliases,
      { ...this.query, offset },
      this.fromRow,
    );
  }

  orderBy(...fns: Array<(...from: SelectArgs<Q>) => OrderByExpression>) {
    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      this.joinAliases,
      {
        ...this.query,
        // Add new orderBys at the beginning to match user expectation
        // Last call should be the primary sort
        orderBys: [
          ...(this.query.orderBys ?? []),
          ...fns.map((fn) => fn(...this.toSelectArgs())),
        ],
      },
      this.fromRow,
    );
  }

  joinTables() {
    return Object.fromEntries(
      Object.entries({ ...this.query.joins }).map(([key, value]) => [
        key,
        value.row,
      ]),
    ) as JoinTables<Q["joins"]>;
  }

  joinWithType<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    type: JoinType,
    on: (
      from: Q["from"] & MakeRowNullable<Q["from"]>,
      js: any,
    ) => Bool<0 | 1> | boolean,
  ) {
    const alias = new QueryAlias(as);
    const row = aliasRowLike(alias, resultType(j.query) as RowLike) as RowLike;

    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      {
        ...this.joinAliases,
        [as]: alias,
      },
      {
        ...this.query,
        joins: {
          ...(this.query.joins as Q["joins"]),
          [as]: {
            table: j,
            on: maybePrimitiveToSqlType(
              on(this.query.from as Q["from"] & MakeRowNullable<Q["from"]>, {
                ...this.joinTables(),
                ...({ [as]: row } as { [a in A]: ResultType<J> }),
              }),
            ),
            row,
            type,
          },
        },
      },
      this.fromRow,
    );
  }

  join<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: Q["from"],
      js: JoinTables<Q["joins"]> & { [a in A]: ResultType<J> },
    ) => Bool<0 | 1> | boolean,
  ) {
    return this.joinWithType(j, as, "JOIN", on) as Setof<
      Q & {
        joins: Q["joins"] & {
          [a in A]: {
            table: Setof<J>;
            on: Bool<0 | 1>;
            row: ResultType<J>;
            type: "JOIN";
          };
        };
      }
    >;
  }

  leftJoin<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: Q["from"],
      js: JoinTables<Q["joins"]> & { [a in A]: MakeRowNullable<ResultType<J>> },
    ) => Bool<0 | 1> | boolean,
  ) {
    return this.joinWithType(j, as, "LEFT JOIN", on) as unknown as Setof<
      Omit<Q, "joins"> & {
        joins: Q["joins"] & {
          [a in A]: {
            table: Setof<J>;
            on: Bool<0 | 1>;
            row: MakeRowNullable<ResultType<J>>;
            type: "LEFT JOIN";
          };
        };
      }
    >;
  }

  rightJoin<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: MakeRowNullable<Q["from"]>,
      js: JoinTables<MakeJoinsNullable<Q["joins"]>> & {
        [a in A]: ResultType<J>;
      },
    ) => Bool<0 | 1> | boolean,
  ) {
    return this.joinWithType(j, as, "RIGHT JOIN", on) as unknown as Setof<
      Omit<Q, "from" | "joins"> & {
        from: MakeRowNullable<Q["from"]>;
        joins: MakeJoinsNullable<Q["joins"]> & {
          [a in A]: {
            table: Setof<J>;
            on: Bool<0 | 1>;
            row: ResultType<J>;
            type: "RIGHT JOIN";
          };
        };
      }
    >;
  }

  fullOuterJoin<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: MakeRowNullable<Q["from"]>,
      js: JoinTables<MakeJoinsNullable<Q["joins"]>> & {
        [a in A]: MakeRowNullable<ResultType<J>>;
      },
    ) => Bool<0 | 1> | boolean,
  ) {
    return this.joinWithType(j, as, "FULL OUTER JOIN", on) as unknown as Setof<
      Omit<Q, "from" | "joins"> & {
        from: MakeRowNullable<Q["from"]>;
        joins: MakeJoinsNullable<Q["joins"]> & {
          [a in A]: {
            table: Setof<J>;
            on: Bool<0 | 1>;
            row: MakeRowNullable<ResultType<J>>;
            type: "FULL OUTER JOIN";
          };
        };
      }
    >;
  }

  subquery(): Setof<{ from: ResultType<Q> }> {
    const alias = new QueryAlias("subquery");
    const res = resultType(this.query);
    return new Setof(
      new SubqueryExpression(this),
      alias,
      this.joinAliases,
      {
        from: isScalar(res)
          ? aliasScalar(alias, res)
          : aliasRowLike(alias, res),
      },
      res,
    );
  }

  tableColumnAlias() {
    const keys = Object.keys(this.query.from)
      .toSorted((k1, k2) => k1.localeCompare(k2))
      .map((key) => sql.ref(key));
    return sql.join(keys);
  }

  compile(ctxIn: Context): RawBuilder<unknown> {
    const ctx = ctxIn.withAliases([
      this.fromAlias,
      ...Object.values(this.joinAliases),
    ]);

    const from = sql`FROM ${this.rawFromExpr.compile(ctxIn)} as ${sql.ref(
      ctx.getAlias(this.fromAlias),
    )}${
      this.rawFromExpr instanceof ValuesExpression
        ? sql`(${this.tableColumnAlias()})`
        : sql``
    }`;

    const joins = this.query.joins
      ? sql.join(
          Object.entries(this.query.joins ?? {}).map(([alias, join]) => {
            return sql`${sql.raw(join.type)} ${join.table.compile(ctx)} as ${sql.ref(
              ctx.getAlias(this.joinAliases[alias]),
            )} ON ${join.on.toExpression().compile(ctx)}`;
          }),
          sql` `,
        )
      : sql``;

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

    return sql`(${select} ${from} ${joins} ${where} ${groupBy} ${having} ${orderBy} ${limit} ${offset})`;
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
      : this.query.from;

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
