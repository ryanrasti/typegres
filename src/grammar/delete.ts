import { QueryResult, sql } from "kysely";
import { Context } from "../expression";
import * as Types from "../types";
import { Typegres } from "../db";
import { parseRowLike, RowLikeResult } from "../query/values";
import invariant from "tiny-invariant";
import { sqlJoin, compileClauses } from "./utils";

/*
https://www.postgresql.org/docs/current/sql-delete.html

[ WITH [ RECURSIVE ] with_query [, ...] ]
DELETE FROM [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    [ USING from_item [, ...] ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING { * | output_expression [ [ AS ] output_name ] } [, ...] ]
*/

type DeleteArgs<D extends Types.RowLike, U extends Types.RowLike, J extends Types.Joins> = [
  D,
  ...Types.FromToSelectArgs<U, J>,
];

export class Delete<
  D extends Types.RowLikeStrict = Types.RowLikeStrict,
  U extends Types.RowLike = D,
  J extends Types.Joins = {},
  R extends Types.RowLike = D,
> {
  private usingItem: Types.FromItem<U, J> | undefined;

  constructor(
    public clause: [
      { from: Types.Table<D>; only?: true },
      {
        using?: Types.AsFromItem<U, J>;
        where?: (...args: DeleteArgs<D, U, J>) => Types.Bool<0 | 1>;
        returning?: (...args: DeleteArgs<D, U, J>) => R;
      },
    ],
  ) {
    this.usingItem = clause[1].using?.asFromItem();
  }

  private get args(): DeleteArgs<D, U, J> {
    const [{ from }] = this.clause;
    return [from.toSelectArgs()[0], ...(this.usingItem?.toSelectArgs() ?? [])] as DeleteArgs<D, U, J>;
  }

  compile(ctxIn = Context.new()) {
    const [{ from, only }, { using, where, returning }] = this.clause;

    const ctx = this.usingItem ? this.usingItem.getContext(from.getContext(ctxIn)) : from.getContext(ctxIn);

    const clauses = compileClauses(
      {
        from,
        using,
        where,
        returning,
      },
      {
        from: (table) =>
          sql`FROM${only ? sql` ONLY` : sql``} ${table.rawFromExpr.compile(ctx)} as ${sql.ref(
            ctx.getAlias(table.fromAlias),
          )}`,
        using: () => sql`USING ${this.usingItem?.compile(ctx)}`,
        where: (fn) =>
          sql`WHERE ${fn(...this.args)
            .toExpression()
            .compile(ctx)}`,
        returning: (fn) => {
          const returnList = fn(...this.args);
          return sql`RETURNING ${sqlJoin(
            Object.entries(returnList).map(([alias, v]) => sql`${v.toExpression().compile(ctx)} AS ${sql.ref(alias)}`),
          )}`;
        },
      },
    );

    return sqlJoin([sql`DELETE`, clauses], sql` `);
  }

  getRowLike(): R | undefined {
    return this.clause[1].returning?.(...this.args);
  }

  async execute(typegres: Typegres): Promise<RowLikeResult<R>[]> {
    const compiled = this.compile();
    const compiledRaw = compiled.compile(typegres._internal);

    let raw: QueryResult<any>;
    try {
      raw = await typegres._internal.executeQuery(compiledRaw);
    } catch (error) {
      console.error("Error executing query: ", compiledRaw.sql, compiledRaw.parameters);
      throw error;
    }

    const returnShape = this.getRowLike();
    if (!returnShape) return raw.rows as RowLikeResult<R>[];

    return raw.rows.map((row) => {
      invariant(typeof row === "object" && row !== null, "Expected each row to be an object");
      return parseRowLike(returnShape, row);
    }) as RowLikeResult<R>[];
  }
}

export const delete_ = <
  D extends Types.RowLikeStrict,
  U extends Types.RowLike = D,
  J extends Types.Joins = {},
  R extends Types.RowLike = D,
>(clauses: {
  from: Types.Table<D>;
  using?: Types.AsFromItem<U, J>;
  where?: (...args: DeleteArgs<D, U, J>) => Types.Bool<0 | 1>;
  returning?: (...args: DeleteArgs<D, U, J>) => R;
  only?: true;
}): Delete<D, U, J, R> =>
  new Delete([
    { from: clauses.from, only: clauses.only },
    {
      using: clauses.using,
      where: clauses.where,
      returning: clauses.returning,
    },
  ]);
