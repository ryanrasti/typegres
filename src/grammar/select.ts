import { QueryResult, RawBuilder, sql } from "kysely";
import {
  Context,
  Expression,
  ExistsExpression,
  NotExistsExpression,
  QueryAlias,
} from "../expression";
import * as Types from "../types";
import type { XOR } from "ts-xor";
import { Typegres } from "../db";
import { parseRowLike, RowLikeResult, aliasRowLike } from "../query/values";
import invariant from "tiny-invariant";
import { inspect } from "util";
import Bool from "../types/bool";
import { FromItem } from "../query/from-item";

import { sqlJoin, compileClauses } from "./utils";
import { dummyDb } from "../test/db";

const compileNumericLike = (
  value: Types.NumericLike,
  ctx: Context,
): RawBuilder<any> => {
  if (typeof value === "number") {
    return sql`${value}`;
  }

  return value.toExpression().compile(ctx);
};

const compileExpressionList = (
  expressions: Types.Any[],
  ctx: Context,
): RawBuilder<any> => {
  return sql`(${sqlJoin(
    expressions.map((expr) => expr.toExpression().compile(ctx)),
  )})`;
};

class SelectExpression extends Expression {
  constructor(public select: Select<any, any, any>) {
    super();
  }

  compile(ctx: Context): RawBuilder<unknown> {
    return sql`(${this.select.compile(ctx)})`;
  }
}

/*
https://www.postgresql.org/docs/current/sql-select.html

[ WITH [ RECURSIVE ] with_query [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    [ { * | expression [ [ AS ] output_name ] } [, ...] ]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF from_reference [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]
*/

export class Select<
  S extends Types.RowLike = any,
  F extends Types.RowLike = any,
  J extends Types.Joins = any,
> implements Types.AsFromItem<S, {}>
{
  private _fromItem: Types.FromItem<F, J> | undefined;

  constructor(private _clause: Parameters<typeof select<S, F, J>>) {
    // Don't resolve fromItem here - defer to avoid triggering the select callback
  }

  private get fromItem(): Types.FromItem<F, J> | undefined {
    if (!this._fromItem) {
      this._fromItem = this.clause[1]?.from?.asFromItem();
    }
    return this._fromItem;
  }

  selectArgs() {
    return (this.fromItem?.toSelectArgs() ?? []) as Types.FromToSelectArgs<
      F,
      J
    >;
  }

  get clause() {
    return [this._clause[0], this._clause[1] ?? {}] as const;
  }

  where(fn: (...args: Types.FromToSelectArgs<F, J>) => Types.Bool<0 | 1>) {
    const [select, { where, ...rest }] = this.clause;
    return new Select<S, F, J>([
      select,
      {
        ...rest,
        where: where
          ? (...args: Types.FromToSelectArgs<F, J>) =>
              fn(...args).and(where(...args))
          : fn,
      },
    ]);
  }

  orderBy(orderBy: OrderByInput<F, J>): Select<S, F, J> {
    const [select, { orderBy: existingOrderBy, ...rest }] = this.clause;
    return new Select<S, F, J>([
      select,
      {
        ...rest,
        orderBy: existingOrderBy
          ? [...normalizeOrderBy(existingOrderBy), ...normalizeOrderBy(orderBy)]
          : orderBy,
      },
    ]);
  }

  limit(limit: Types.NumericLike | "all"): Select<S, F, J> {
    const [select, { limit: _existingLimit, ...rest }] = this.clause;
    return new Select([select, { ...rest, limit }]);
  }

  offset(
    offset:
      | Types.NumericLike
      | [Types.NumericLike, { row?: true; rows?: true }],
  ): Select<S, F, J> {
    const [select, { offset: _existingOffset, ...rest }] = this.clause;
    return new Select([select, { ...rest, offset }]);
  }

  fetch(
    fetch: [
      "first" | "next",
      Types.NumericLike,
      "row" | "rows",
      "only" | "withTies",
    ],
  ): Select<S, F, J> {
    const [select, { fetch: _existingFetch, ...rest }] = this.clause;
    return new Select([select, { ...rest, fetch }]);
  }

  compile(ctxIn = Context.new()) {
    const [select, opts] = this.clause;
    const { all, distinct, distinctOn, ...rest } = opts ?? {};
    const args = this.selectArgs();
    const ctx = this.fromItem?.getContext(ctxIn) ?? ctxIn;
    const clauses = compileClauses(
      {
        all,
        distinct,
        distinctOn,
        select,
        ...rest,
      },
      {
        all: () => sql`ALL`,
        distinct: () => sql`DISTINCT`,
        distinctOn: (fn) =>
          sql`DISTINCT ON (${compileExpressionList(fn(...args), ctx)})`,
        select: (fn) =>
          sqlJoin(
            Object.entries(fn(...args))
              .sort(([a], [b]) => a.localeCompare(b))
              .map(
                ([alias, v]) =>
                  sql`${v.toExpression().compile(ctx)} AS ${sql.ref(alias)}`,
              ),
          ),
        from: () => sql`FROM ${this.fromItem?.compile(ctx)}`,
        where: (fn) =>
          sql`WHERE ${fn(...args)
            .toExpression()
            .compile(ctx)}`,
        groupBy: (groupBy) =>
          sqlJoin([sql`GROUP BY`, compileGroupBy(groupBy, args, ctx)], sql` `),
        having: (fn) =>
          sql`HAVING ${fn(...args)
            .toExpression()
            .compile(ctx)}`,
        window: () => {
          throw new Error("Window functions not implemented yet");
        },
        union: (union): RawBuilder<any> => sql`UNION ${union.compile(ctxIn)}`,
        unionAll: (unionAll): RawBuilder<any> =>
          sql`UNION ALL ${unionAll.compile(ctxIn)}`,
        intersect: (intersect): RawBuilder<any> =>
          sql`INTERSECT ${intersect.compile(ctxIn)}`,
        intersectAll: (intersectAll): RawBuilder<any> =>
          sql`INTERSECT ALL ${intersectAll.compile(ctxIn)}`,
        except: (except): RawBuilder<any> =>
          sql`EXCEPT ${except.compile(ctxIn)}`,
        exceptAll: (exceptAll): RawBuilder<any> =>
          sql`EXCEPT ALL ${exceptAll.compile(ctxIn)}`,
        orderBy: (orderBy) =>
          sql`ORDER BY ${sqlJoin(
            normalizeOrderBy(orderBy).map(([orderByFn, orderByOpts]) => {
              const fnCompiled = orderByFn(...args)
                .toExpression()
                .compile(ctx);
              const optsCompiled = compileClauses(orderByOpts ?? {}, {
                asc: () => sql`ASC`,
                desc: () => sql`DESC`,
                using: (using) => sql`USING ${sql.ref(using)}`,
                nulls: (direction) =>
                  sql`NULLS ${direction === "first" ? sql`FIRST` : sql`LAST`}`,
              });
              return sqlJoin([fnCompiled, optsCompiled], sql` `);
            }),
          )}`,
        limit: (limit) =>
          sql`LIMIT ${
            limit === "all" ? sql`ALL` : compileNumericLike(limit, ctx)
          }`,
        offset: (offset) => {
          const normalized = Array.isArray(offset)
            ? offset
            : ([offset] as const);
          const [value, opts] = normalized;
          return sqlJoin(
            [
              sql`OFFSET`,
              compileNumericLike(value, ctx),
              compileClauses(opts ?? {}, {
                row: () => sql`ROW`,
                rows: () => sql`ROWS`,
              }),
            ],
            sql` `,
          );
        },
        fetch: (fetch) => {
          const [firstNext, count, rows, onlyTies] = fetch;
          const compiledFirstNext = { first: sql`FIRST`, next: sql`NEXT` }[
            firstNext
          ];
          const compiledRows = { row: sql`ROW`, rows: sql`ROWS` }[rows];
          const compiledOnlyTies = {
            only: sql`ONLY`,
            withTies: sql`WITH TIES`,
          }[onlyTies];
          return sqlJoin(
            [
              sql`FETCH`,
              compiledFirstNext,
              compileNumericLike(count, ctx),
              compiledRows,
              compiledOnlyTies,
            ],
            sql` `,
          );
        },
        for: (forClause) => {
          const [lockType, opts] = forClause;
          const compiledLockType = {
            update: sql`UPDATE`,
            noKeyUpdate: sql`NO KEY UPDATE`,
            share: sql`SHARE`,
            keyShare: sql`KEY SHARE`,
          }[lockType];
          return sqlJoin(
            [
              sql`FOR`,
              compiledLockType,
              compileClauses(opts ?? {}, {
                of: (tables) =>
                  sql`OF ${sqlJoin(
                    tables.map((table) => sql.ref(table.fromAlias.name)),
                  )}`,
                nowait: () => sql`NOWAIT`,
                skipLocked: () => sql`SKIP LOCKED`,
              }),
            ],
            sql` `,
          );
        },
      },
    );
    return sqlJoin([sql`SELECT`, clauses], sql` `);
  }

  getRowLike(): S {
    return this.clause[0](...this.selectArgs());
  }

  async execute(typegres: Typegres): Promise<RowLikeResult<S>[]> {
    const compiled = this.compile();
    const compiledRaw = compiled.compile(typegres._internal);

    let raw: QueryResult<any>;
    try {
      raw = await typegres._internal.executeQuery(compiledRaw);
    } catch (error) {
      console.error(
        "Error executing query: ",
        compiledRaw.sql,
        compiledRaw.parameters,
      );
      throw error;
    }
    const returnShape = this.getRowLike();
    return (
      returnShape
        ? raw.rows.map((row) => {
            invariant(
              typeof row === "object" && row !== null,
              "Expected each row to be an object",
            );
            return parseRowLike(returnShape, row);
          })
        : raw
    ) as RowLikeResult<S>[];
  }

  /**
   * SQL EXISTS operator - checks if the subquery returns any rows
   * EXISTS (SELECT ...)
   */
  exists(): Bool<1> {
    return Bool.new(new ExistsExpression(this.toExpression())) as Bool<1>;
  }

  /**
   * SQL NOT EXISTS operator - checks if the subquery returns no rows
   * NOT EXISTS (SELECT ...)
   */
  notExists(): Bool<1> {
    return Bool.new(new NotExistsExpression(this.toExpression())) as Bool<1>;
  }

  /**
   * Converts a single-column select into a scalar value
   * Used for subqueries that return a single value
   */
  scalar(): S[keyof S] {
    const returnShape = this.clause[0](...this.selectArgs());
    const [val, ...rest] = Object.values(returnShape);
    invariant(
      rest.length === 0,
      `Expected a single scalar return shape, got: ${inspect(returnShape)}`,
    );
    return val.getClass().new(this.toExpression()) as S[keyof S];
  }

  /**
   * Convert the Select to an Expression for use in subqueries
   */
  toExpression() {
    return new SelectExpression(this);
  }

  /**
   * Convert the Select to a FromItem for use in FROM clauses
   */
  asFromItem(): FromItem<S, {}> {
    const alias = new QueryAlias(`subquery`);
    const returnShape = this.clause[0](...this.selectArgs());
    const aliasedShape = aliasRowLike(alias, returnShape);
    return new FromItem(this.toExpression(), alias, {}, aliasedShape as S);
  }

  debug() {
    console.log("Debugging query:", this.compile().compile(dummyDb));
    return this;
  }
}

export const select = <
  S extends Types.RowLike,
  F extends Types.RowLike,
  J extends Types.Joins,
>(
  select: (...args: Types.FromToSelectArgs<F, J>) => S,
  opts?: XOR<
    { all?: true },
    { distinct?: true },
    { distinctOn?: (...args: Types.FromToSelectArgs<F, J>) => Types.Any[] }
  > & {
    from?: Types.AsFromItem<F, J>;
    where?: (...args: Types.FromToSelectArgs<F, J>) => Types.Bool<0 | 1>;
    groupBy?: GroupByInput<F, J>;
    having?: (...args: Types.FromToSelectArgs<F, J>) => Types.Bool<0 | 1>;
    window?: never; // TODO: Implement window functions
  } & SetOps<S> & {
      orderBy?: OrderByInput<F, J>;
      limit?: Types.NumericLike | "all";
      offset?:
        | Types.NumericLike
        | [Types.NumericLike, { row?: true; rows?: true }];
      fetch?: [
        "first" | "next",
        Types.NumericLike,
        "row" | "rows",
        "only" | "withTies",
      ];
      for?: [
        "update" | "noKeyUpdate" | "share" | "keyShare",
        {
          of?: [Types.Table<any>, ...Types.Table<any>[]];
        } & (
          | {
              nowait?: true;
            }
          | { skipLocked?: true }
        ),
      ];
    },
) => {
  return new Select<S, F, J>([select, opts]);
};

type SetOps<S extends Types.RowLike> = XOR<
  { union?: Select<S, any, Types.Joins> },
  { unionAll?: Select<S, any, Types.Joins> },
  { intersect?: Select<S, any, Types.Joins> },
  { intersectAll?: Select<S, any, Types.Joins> },
  { except?: Select<S, any, Types.Joins> },
  { exceptAll?: Select<S, any, Types.Joins> }
>;

type OrderByInput<F extends Types.RowLike, J extends Types.Joins> =
  | OrderByInputElement<F, J>[0]
  | OrderByInputElement<F, J>
  | (OrderByInputElement<F, J>[0] | OrderByInputElement<F, J>)[];

type OrderByInputElement<F extends Types.RowLike, J extends Types.Joins> = [
  (...args: Types.FromToSelectArgs<F, J>) => Types.Any<unknown, 0 | 1>,
  (XOR<{ asc?: true }, { desc?: true }, { using?: string }> & {
    nulls?: "first" | "last";
  })?,
];

type OrderByInputNormalized<F extends Types.RowLike, J extends Types.Joins> = [
  OrderByInputElement<F, J>,
  ...OrderByInputElement<F, J>[],
];

const normalizeOrderBy = <F extends Types.RowLike, J extends Types.Joins>(
  orderBy: OrderByInput<F, J>,
): OrderByInputNormalized<F, J> => {
  // If it's not an array at all, wrap it as a single element tuple array
  if (!Array.isArray(orderBy)) {
    return [[orderBy]];
  }

  // If first element is a function, it could be:
  // 1. A single tuple: [fn, opts]
  // 2. An array of mixed elements (functions and/or tuples)
  if (typeof orderBy[0] === "function") {
    // Check if it's a single tuple by looking at the second element
    if (
      orderBy.length === 2 &&
      (orderBy[1] === undefined ||
        (typeof orderBy[1] === "object" && !Array.isArray(orderBy[1])))
    ) {
      // It's a single tuple [fn, opts]
      return [orderBy] as OrderByInputNormalized<F, J>;
    }
    // It's an array of mixed elements - normalize each
    return orderBy.map((elem) =>
      Array.isArray(elem) ? elem : [elem],
    ) as OrderByInputNormalized<F, J>;
  }

  // If first element is an array, it's already normalized or needs element normalization
  if (Array.isArray(orderBy[0])) {
    // Each element should be a tuple, but some might be bare functions
    return orderBy.map((elem) =>
      Array.isArray(elem) ? elem : [elem],
    ) as OrderByInputNormalized<F, J>;
  }

  throw new Error(
    `Invalid orderBy input: expected an array of functions or tuples, got ${inspect(
      orderBy,
    )}`,
  );
};

/*
and grouping_element can be one of:

    ( )
    expression
    ( expression [, ...] )
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )
*/

type GroupingElement<A extends unknown[]> =
  | XOR<
      { rollup: (...args: A) => [Types.Any, ...Types.Any[]] },
      { cube: (...args: A) => [Types.Any, ...Types.Any[]] },
      { groupingSets: (...args: A) => [Types.Any, ...Types.Any[]] }
    >
  | ((...args: A) => Types.Any[]);

type GroupByInput<F extends Types.RowLike, J extends Types.Joins> =
  | GroupByInputNormalized<F, J>
  | GroupByInputNormalized<F, J>[0]
  | GroupByInputNormalized<F, J>[0][0];

type GroupByInputNormalized<F extends Types.RowLike, J extends Types.Joins> = [
  [
    GroupingElement<Types.FromToSelectArgs<F, J>>,
    ...GroupingElement<Types.FromToSelectArgs<F, J>>[],
  ],
  ({ all?: true } | { distinct?: true })?,
];

const compileGroupBy = <F extends Types.RowLike, J extends Types.Joins>(
  groupBy: GroupByInput<F, J>,
  args: Types.FromToSelectArgs<F, J>,
  ctx: Context,
): RawBuilder<any> => {
  const normalized = (
    Array.isArray(groupBy)
      ? Array.isArray(groupBy[0])
        ? groupBy
        : [groupBy]
      : [[groupBy]]
  ) as GroupByInputNormalized<F, J>;

  const [elements, opts] = normalized;

  const elementsCompiled = elements.map((el) => {
    if (typeof el === "function") {
      return compileExpressionList(el(...args), ctx);
    }
    return compileClauses(el, {
      rollup: (fn) => sql`ROLLUP ${compileExpressionList(fn(...args), ctx)}`,
      cube: (fn) => sql`CUBE ${compileExpressionList(fn(...args), ctx)}`,
      groupingSets: (fn) =>
        sql`GROUPING SETS ${compileExpressionList(fn(...args), ctx)}`,
    });
  });

  const optsCompiled = compileClauses(opts ?? {}, {
    all: () => sql`ALL`,
    distinct: () => sql`DISTINCT`,
  });

  return sqlJoin([optsCompiled, sqlJoin(elementsCompiled)], sql` `);
};
