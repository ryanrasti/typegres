import { QueryResult, sql } from "kysely";
import { Context } from "../expression";
import * as Types from "../types";
import { Typegres } from "../db";
import { parseRowLike, PickAny, RowLikeResult } from "../query/values";
import invariant from "tiny-invariant";
import { compileClauses, sqlJoin } from "./utils";
import type { XOR } from "ts-xor";
import { inspect } from "cross-inspect";

// https://www.postgresql.org/docs/current/sql-merge.html
//
// [ WITH with_query [, ...] ]
// MERGE INTO [ ONLY ] target_table_name [ * ] [ [ AS ] target_alias ]
// USING data_source ON join_condition
// when_clause [...]
// [ RETURNING { * | output_expression [ [ AS ] output_name ] } [, ...] ]

type MergeArgs<
  T extends Types.RowLike,
  S extends Types.RowLike,
  J extends Types.Joins,
> = [T, ...Types.FromToSelectArgs<S, J>];

// merge_update is:
// UPDATE SET { column_name = { expression | DEFAULT } |
//              ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
//              ( column_name [, ...] ) = ( sub-SELECT )
//            } [, ...]
type MergeUpdate<
  T extends Types.RowLike,
  S extends Types.RowLike,
  J extends Types.Joins,
> = (...args: MergeArgs<T, S, J>) => Partial<PickAny<T>>;

// merge_insert is:
// INSERT [( column_name [, ...] )]
// [ OVERRIDING { SYSTEM | USER } VALUE ]
// { VALUES ( { expression | DEFAULT } [, ...] ) | DEFAULT VALUES }
type MergeInsert<
  T extends Types.RowLike,
  S extends Types.RowLike,
  J extends Types.Joins,
> = {
  columns?: (keyof T)[];
  values: (...args: MergeArgs<T, S, J>) => Partial<PickAny<T>>;
  overriding?: ["system" | "user", "value"];
};

// when_clause is:
// { WHEN MATCHED [ AND condition ] THEN { merge_update | merge_delete | DO NOTHING } |
//   WHEN NOT MATCHED BY SOURCE [ AND condition ] THEN { merge_update | merge_delete | DO NOTHING } |
//   WHEN NOT MATCHED [ BY TARGET ] [ AND condition ] THEN { merge_insert | DO NOTHING } }

// Common case: simple actions without conditions
type SimpleWhenClause<
  T extends Types.RowLike,
  S extends Types.RowLike,
  J extends Types.Joins,
> = {
  whenMatchedThenUpdateSet?: MergeUpdate<T, S, J>;
  whenMatchedThenDelete?: true;
  whenMatchedThenDoNothing?: true;
  whenNotMatchedThenInsert?: MergeInsert<T, S, J>;
  whenNotMatchedThenDoNothing?: true;
  whenNotMatchedBySourceThenUpdateSet?: MergeUpdate<T, S, J>;
  whenNotMatchedBySourceThenDelete?: true;
  whenNotMatchedBySourceThenDoNothing?: true;
};

// Complex case: with AND conditions
type ComplexWhenClause<
  T extends Types.RowLike,
  S extends Types.RowLike,
  J extends Types.Joins,
> = {
  whenMatched?: {
    and?: (...args: MergeArgs<T, S, J>) => Types.Bool<0 | 1>;
  } & XOR<
    { thenUpdateSet: MergeUpdate<T, S, J> },
    { thenDelete: true },
    { thenDoNothing: true }
  >;
  whenNotMatchedBySource?: {
    and?: (...args: MergeArgs<T, S, J>) => Types.Bool<0 | 1>;
  } & XOR<
    { thenUpdateSet: MergeUpdate<T, S, J> },
    { thenDelete: true },
    { thenDoNothing: true }
  >;
  whenNotMatched?: {
    and?: (...args: MergeArgs<T, S, J>) => Types.Bool<0 | 1>;
  } & XOR<{ thenInsert: MergeInsert<T, S, J> }, { thenDoNothing: true }>;
};

type WhenClause<
  T extends Types.RowLike,
  S extends Types.RowLike,
  J extends Types.Joins,
> = SimpleWhenClause<T, S, J> | ComplexWhenClause<T, S, J>;

const normalizeWhenClause = <
  T extends Types.RowLike,
  S extends Types.RowLike,
  J extends Types.Joins,
>(
  clause: WhenClause<T, S, J>,
): ComplexWhenClause<T, S, J>[] => {
  return Object.entries(clause).map(([key, value]) => {
    const [when, then] = key.split("Then");
    invariant(when, "When clause key must start with 'when'");
    if (then == null) {
      return { [key]: value } as ComplexWhenClause<T, S, J>;
    }
    return {
      [when]: {
        [`then${then}`]: value,
      },
    } as unknown as ComplexWhenClause<T, S, J>;
  });
};

const compileWhenClause = <
  T extends Types.RowLikeStrict,
  S extends Types.RowLike,
  J extends Types.Joins,
>(
  normalized: ComplexWhenClause<T, S, J>,
  args: MergeArgs<T, S, J>,
  ctx: Context,
) => {
  // The order is important, so make sure there's only one key
  invariant(
    Object.keys(normalized).length === 1,
    `Normalized clause must have exactly one key: ${inspect(
      Object.keys(normalized),
    )}`,
  );
  type C = ComplexWhenClause<T, S, J>;

  const matched = (normalized.whenMatched ??
    normalized.whenNotMatched ??
    normalized.whenNotMatchedBySource) as C["whenMatched"] &
    C["whenNotMatched"] &
    C["whenNotMatchedBySource"];
  invariant(
    matched,
    "When clause must have a 'whenMatched', 'whenNotMatched', or 'whenNotMatchedBySource' key",
  );
  const { and, ...then } = matched;

  const thenCompiled = sqlJoin(
    [
      and &&
        sql`AND ${and(...args)
          .toExpression()
          .compile(ctx)}`,
      sql`THEN`,
      compileClauses(then, {
        thenUpdateSet: (set) => {
          const assignments = set(...args);
          return sql`UPDATE SET ${sqlJoin(
            Object.entries(assignments).map(([col, val]) => {
              invariant(
                val instanceof Types.Any,
                `Expected value for column ${col} to be an instance of Any`,
              );
              return sql`${sql.ref(col)} = ${val.toExpression().compile(ctx)}`;
            }),
          )}`;
        },
        thenDelete: () => sql`DELETE`,
        thenDoNothing: () => sql`DO NOTHING`,
        thenInsert: (insert) => {
          const insertVals = insert.values(...args);
          const cols =
            insert.columns ?? (Object.keys(insertVals) as (keyof T)[]);
          return sqlJoin(
            [
              sql`INSERT (${sqlJoin(cols.map((c) => sql.ref(c as string)))})`,
              insert.overriding &&
                sql`OVERRIDING ${insert.overriding[0] === "system" ? sql`SYSTEM` : sql`USER`} VALUE`,
              sql`VALUES (${sqlJoin(
                cols.map(
                  (col) =>
                    insertVals[col]?.toExpression().compile(ctx) ??
                    sql`DEFAULT`,
                ),
              )})`,
            ].filter(Boolean),
            sql` `,
          );
        },
      }),
    ],
    sql` `,
  );

  return compileClauses(normalized, {
    whenMatched: () => sqlJoin([sql`WHEN MATCHED`, thenCompiled], sql` `),
    whenNotMatched: () =>
      sqlJoin([sql`WHEN NOT MATCHED`, thenCompiled], sql` `),
    whenNotMatchedBySource: () =>
      sqlJoin([sql`WHEN NOT MATCHED BY SOURCE`, thenCompiled], sql` `),
  });
};

// data_source is:
// { [ ONLY ] source_table_name [ * ] | ( source_query ) } [ [ AS ] source_alias ]
type DataSource<
  S extends Types.RowLike,
  J extends Types.Joins,
> = Types.AsFromItem<S, J>;

export class Merge<
  T extends Types.RowLikeStrict = Types.RowLikeStrict,
  S extends Types.RowLike = T,
  J extends Types.Joins = {},
  R extends Types.RowLike = T,
> {
  private sourceItem: Types.FromItem<S, J>;

  constructor(
    private mergeInto: {
      into: Types.Table<T>;
      only?: true;
      using: DataSource<S, J>;
      on: (...args: MergeArgs<T, S, J>) => Types.Bool<0 | 1>;
    },
    private whenClauses:
      | WhenClause<T, S, J>
      | [WhenClause<T, S, J>, ...WhenClause<T, S, J>[]],
    private returningClause?: {
      returning: (...args: MergeArgs<T, S, J>) => R;
    },
  ) {
    this.sourceItem = mergeInto.using.asFromItem();
  }

  private get args(): MergeArgs<T, S, J> {
    return [
      this.mergeInto.into.toSelectArgs()[0],
      ...this.sourceItem.toSelectArgs(),
    ] as MergeArgs<T, S, J>;
  }

  compile(ctxIn = Context.new()) {
    const ctx = this.sourceItem.getContext(
      this.mergeInto.into.getContext(ctxIn),
    );

    const parts = [
      sql`MERGE INTO${this.mergeInto.only ? sql` ONLY` : sql``} ${this.mergeInto.into.rawFromExpr.compile(ctx)} as ${sql.ref(
        ctx.getAlias(this.mergeInto.into.fromAlias),
      )}`,
      sql`USING ${this.sourceItem.compile(ctx)}`,
      sql`ON ${this.mergeInto
        .on(...this.args)
        .toExpression()
        .compile(ctx)}`,
      ...[this.whenClauses]
        .flat()
        .flatMap(normalizeWhenClause)
        .map((clause) => compileWhenClause(clause, this.args, ctx)),
      this.returningClause &&
        sql`RETURNING ${sqlJoin(
          Object.entries(this.returningClause.returning(...this.args)).map(
            ([alias, v]) =>
              sql`${v.toExpression().compile(ctx)} AS ${sql.ref(alias)}`,
          ),
        )}`,
    ];

    return sqlJoin(parts.filter(Boolean), sql` `);
  }

  getRowLike(): R | undefined {
    return this.returningClause?.returning?.(...this.args);
  }

  async execute(typegres: Typegres): Promise<RowLikeResult<R>[]> {
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
    if (!returnShape) return raw.rows as RowLikeResult<R>[];

    return raw.rows.map((row) => {
      invariant(
        typeof row === "object" && row !== null,
        "Expected each row to be an object",
      );
      return parseRowLike(returnShape, row);
    }) as RowLikeResult<R>[];
  }
}

export const merge = <
  T extends Types.RowLikeStrict,
  S extends Types.RowLike = T,
  J extends Types.Joins = {},
  R extends Types.RowLike = T,
>(
  mergeInto: {
    into: Types.Table<T>;
    only?: true;
    using: DataSource<S, J>;
    on: (...args: MergeArgs<T, S, J>) => Types.Bool<0 | 1>;
  },
  whenClauses:
    | WhenClause<T, S, J>
    | [WhenClause<T, S, J>, ...WhenClause<T, S, J>[]],
  returningClause?: {
    returning: (...args: MergeArgs<T, S, J>) => R;
  },
): Merge<T, S, J, R> => new Merge(mergeInto, whenClauses, returningClause);
