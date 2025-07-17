import { RawBuilder, sql } from "kysely";
import {
  Expression,
  QueryAlias,
  SelectableExpression,
  ExistsExpression,
  NotExistsExpression,
  SetOperationExpression,
} from "../expression";
import { Any, Bool, Record } from "../types";
import { dummyDb } from "../test/db";
import { AggregateOfRow } from "../types/aggregate";
import { Primitive, maybePrimitiveToSqlType } from "../types/primitive";
import { row } from "../types/record";
import { Context } from "../expression";
import type { Typegres } from "../db";

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
    schema: RowLike
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
              .map(([, value]) => sql`${value.toExpression().compile(ctx)}`)
          )})`
      )
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
  row: R
) => {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key,
      value.getClass().new(new ColumnAliasExpression(queryAlias, key)),
    ])
  ) as R;
};

export const aliasScalar = <S extends Scalar>(
  queryAlias: QueryAlias,
  scalar: S
) => {
  return scalar.getClass().new(new ColumnAliasExpression(queryAlias, "value"));
};

export class ColumnAliasExpression extends Expression {
  constructor(
    public alias: QueryAlias,
    public column: string
  ) {
    super();
  }

  compile(ctx: Context) {
    return sql.ref(`${ctx.getAlias(this.alias)}.${this.column}`);
  }
}

const parseRowLike = <R extends RowLike>(
  rowLike: RowLike,
  result: RowLikeRawResult<RowLike>
) => {
  return Object.fromEntries(
    Object.entries(rowLike).map(([key, value]) => {
      const res = result[key];
      return [key, res === null ? res : value.getClass().parse(res)];
    })
  ) as RowLikeResult<R>;
};

type JoinTables<Q extends Query> = {
  [key in keyof Q["joins"]]: ResultType<
    NonNullable<Q["joins"]>[key]["table"]["query"]
  >;
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
        : RowLikeResult<Q["from"]>[];

export type Query = {
  select?: RowLike | Scalar;
  from: RowLike | Scalar;
  joins?: {
    [key: string]: {
      table: Setof<any>;
      row: RowLike;
      on: Bool<0 | 1>;
    };
  };
  wheres?: [Bool<0 | 1>, ...Bool<0 | 1>[]];
  groupBy?: Any<unknown, 0 | 1>[];
};

export type BindedSetof<Q extends Query> = typeof Setof<Q> & {
  "new"(fromExpr: Expression): Setof<Q>;
};

export type SelectArgs<Q extends Query> = Q["groupBy"] extends unknown[]
  ? [AggregateOfRow<Q["from"]>, NonNullable<Q["groupBy"]>]
  : [
      Q["from"] extends RowLike ? Record<1, Q["from"]> & Q["from"] : Q["from"],
      JoinTables<Q>,
    ];

export class Setof<Q extends Query> extends Expression {
  constructor(
    public rawFromExpr: Expression,
    public fromAlias: QueryAlias,
    public joinAliases: { [key: string]: QueryAlias },
    public query: Q,
    public fromRow: RowLike | Scalar
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
          fromRow
        );
      }
    };
  }

  static ofSchema(fromRow: { [key: string]: typeof Any<unknown> }) {
    return this.of(
      Object.fromEntries(
        Object.entries(fromRow).map(([k, Cls]) => [k, Cls.new("")])
      ) as RowLike
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
                new TableReferenceExpression(this.fromAlias, this.query.from)
              ),
          this.joinTables(),
        ] as any);
  }

  select<S extends RowLikeRelaxed | ScalarRelaxed>(
    fn: (...from: SelectArgs<Q>) => S
  ) {
    return new Setof(
      this.rawFromExpr,
      this.fromAlias,
      this.joinAliases,
      {
        ...this.query,
        select: maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
      },
      this.fromRow
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
      this.fromRow
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
      this.fromRow
    );
  }

  joinTables() {
    return Object.fromEntries(
      Object.entries({ ...this.query.joins }).map(([key, value]) => [
        key,
        value.row,
      ])
    ) as JoinTables<Q>;
  }

  join<J extends Query, A extends string>(
    j: Setof<J>,
    as: A,
    on: (
      from: Q["from"],
      js: JoinTables<Q> & { [a in A]: ResultType<J> }
    ) => Bool<0 | 1> | boolean
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
              on(this.query.from, {
                ...this.joinTables(),
                ...({ [as]: row } as { [a in A]: ResultType<J> }),
              })
            ),
            row,
          },
        } as Q["joins"] & {
          [a in A]: {
            table: Setof<J>;
            on: Bool<0 | 1>;
            row: RowLike;
          };
        },
      },
      this.fromRow
    );
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
      res
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
      ctx.getAlias(this.fromAlias)
    )}${
      this.rawFromExpr instanceof ValuesExpression
        ? sql`(${this.tableColumnAlias()})`
        : sql``
    }`;

    const joins = this.query.joins
      ? sql.join(
          Object.entries(this.query.joins ?? {}).map(([alias, join]) => {
            return sql`JOIN ${join.table.compile(ctx)} as ${sql.ref(
              ctx.getAlias(this.joinAliases[alias])
            )} ON ${join.on.toExpression().compile(ctx)}`;
          }),
          sql` `
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
              sql`${value.toExpression().compile(ctx)} AS ${sql.ref(key)}`
          )
        )}`
      : sql`SELECT *`;

    const where = this.query.wheres
      ? sql`WHERE ${sql.join(
          this.query.wheres.map((w) => sql`(${w.toExpression().compile(ctx)})`),
          sql` AND `
        )}`
      : sql``;

    const groupBy = this.query.groupBy
      ? sql`GROUP BY ${sql.join(
          this.query.groupBy.map((g) => sql`${g.toExpression().compile(ctx)}`),
          sql`, `
        )}`
      : sql``;

    return sql`(${select} ${from} ${joins} ${where} ${groupBy})`;
  }

  debug() {
    console.log(
      "Debugging query:",
      this.compile(Context.new()).compile(dummyDb)
    );
    return this;
  }

  async execute(tg: Typegres): Promise<AwaitedResultType<Q>> {
    const kysely = (tg as any)._internal;
    const kexpr = kysely.executeQuery(
      this.compile(Context.new()).compile(kysely)
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
          : parseRowLike(resultRowLike, row)
      ) as AwaitedResultType<Q>;
    } catch (err) {
      console.error(
        "Error executing query:",
        this.compile(Context.new()).compile(kysely),
        err
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
  union<Q2 extends Query>(
    other: Setof<Q2>
  ): Setof<{ from: ResultType<Q>; select: ResultType<Q> }> {
    const alias = new QueryAlias("union");
    const result = resultType(this.query);
    const schema = isScalar(result)
      ? { value: result as Any<unknown, 0 | 1> }
      : (result as RowLike);
    const aliasedResult = isScalar(result)
      ? aliasScalar(alias, result)
      : aliasRowLike(alias, result);
    return new Setof(
      new SetOperationExpression(this, other, "UNION", schema),
      alias,
      {},
      {
        from: aliasedResult,
        select: aliasedResult,
      },
      result
    ) as any;
  }

  /**
   * SQL UNION ALL operator - combines results of two queries, keeping duplicates
   */
  unionAll<Q2 extends Query>(
    other: Setof<Q2>
  ): Setof<{ from: ResultType<Q>; select: ResultType<Q> }> {
    const alias = new QueryAlias("union");
    const result = resultType(this.query);
    const schema = isScalar(result)
      ? { value: result as Any<unknown, 0 | 1> }
      : (result as RowLike);
    const aliasedResult = isScalar(result)
      ? aliasScalar(alias, result)
      : aliasRowLike(alias, result);
    return new Setof(
      new SetOperationExpression(this, other, "UNION ALL", schema),
      alias,
      {},
      {
        from: aliasedResult,
        select: aliasedResult,
      },
      result
    ) as any;
  }

  /**
   * SQL INTERSECT operator - returns rows that exist in both queries, removing duplicates
   */
  intersect<Q2 extends Query>(
    other: Setof<Q2>
  ): Setof<{ from: ResultType<Q>; select: ResultType<Q> }> {
    const alias = new QueryAlias("intersect");
    const result = resultType(this.query);
    const schema = isScalar(result)
      ? { value: result as Any<unknown, 0 | 1> }
      : (result as RowLike);
    const aliasedResult = isScalar(result)
      ? aliasScalar(alias, result)
      : aliasRowLike(alias, result);
    return new Setof(
      new SetOperationExpression(this, other, "INTERSECT", schema),
      alias,
      {},
      {
        from: aliasedResult,
        select: aliasedResult,
      },
      result
    ) as any;
  }

  /**
   * SQL INTERSECT ALL operator - returns rows that exist in both queries, keeping duplicates
   */
  intersectAll<Q2 extends Query>(
    other: Setof<Q2>
  ): Setof<{ from: ResultType<Q>; select: ResultType<Q> }> {
    const alias = new QueryAlias("intersect");
    const result = resultType(this.query);
    const schema = isScalar(result)
      ? { value: result as Any<unknown, 0 | 1> }
      : (result as RowLike);
    const aliasedResult = isScalar(result)
      ? aliasScalar(alias, result)
      : aliasRowLike(alias, result);
    return new Setof(
      new SetOperationExpression(this, other, "INTERSECT ALL", schema),
      alias,
      {},
      {
        from: aliasedResult,
        select: aliasedResult,
      },
      result
    ) as any;
  }

  /**
   * SQL EXCEPT operator - returns rows from first query that don't exist in second, removing duplicates
   */
  except<Q2 extends Query>(
    other: Setof<Q2>
  ): Setof<{ from: ResultType<Q>; select: ResultType<Q> }> {
    const alias = new QueryAlias("except");
    const result = resultType(this.query);
    const schema = isScalar(result)
      ? { value: result as Any<unknown, 0 | 1> }
      : (result as RowLike);
    const aliasedResult = isScalar(result)
      ? aliasScalar(alias, result)
      : aliasRowLike(alias, result);
    return new Setof(
      new SetOperationExpression(this, other, "EXCEPT", schema),
      alias,
      {},
      {
        from: aliasedResult,
        select: aliasedResult,
      },
      result
    ) as any;
  }

  /**
   * SQL EXCEPT ALL operator - returns rows from first query that don't exist in second, keeping duplicates
   */
  exceptAll<Q2 extends Query>(
    other: Setof<Q2>
  ): Setof<{ from: ResultType<Q>; select: ResultType<Q> }> {
    const alias = new QueryAlias("except");
    const result = resultType(this.query);
    const schema = isScalar(result)
      ? { value: result as Any<unknown, 0 | 1> }
      : (result as RowLike);
    const aliasedResult = isScalar(result)
      ? aliasScalar(alias, result)
      : aliasRowLike(alias, result);
    return new Setof(
      new SetOperationExpression(this, other, "EXCEPT ALL", schema),
      alias,
      {},
      {
        from: aliasedResult,
        select: aliasedResult,
      },
      result
    ) as any;
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
