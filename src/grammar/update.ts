import { QueryResult, sql } from "kysely";
import invariant from "tiny-invariant";
import { Typegres } from "../db";
import { Context } from "../expression";
import { parseRowLike, pickAny, RowLikeResult } from "../query/values";
import * as Types from "../types";
import { chainWhere, compileClauses, sqlJoin } from "./utils";
import { RpcTarget } from "capnweb";

/*
https://www.postgresql.org/docs/current/sql-update.html

[ WITH [ RECURSIVE ] with_query [, ...] ]
UPDATE [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    SET { column_name = { expression | DEFAULT } |
          ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
          ( column_name [, ...] ) = ( sub-SELECT )
        } [, ...]
    [ FROM from_item [, ...] ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING { * | output_expression [ [ AS ] output_name ] } [, ...] ]
*/

// Helper type to construct the proper argument types based on whether FROM is provided
type UpdateArgs<U extends Types.RowLike, F extends Types.RowLike, J extends Types.Joins> = [
  U,
  ...Types.FromToSelectArgs<F, J>,
]; // Always [updateRow, ...fromSelectArgs]

export class Update<
  U extends Types.RowLikeStrict = Types.RowLikeStrict,
  F extends Types.RowLike = U,
  J extends Types.Joins = {},
  R extends Types.RowLike = U,
> extends RpcTarget {
  private fromItem: Types.FromItem<F, J> | undefined;

  constructor(
    public clause: [
      { table: Types.Table<U>; only?: true },
      {
        set?: (...args: UpdateArgs<U, F, J>) => Partial<U>;
        from?: Types.AsFromItem<F, J>;
        where?: (...args: UpdateArgs<U, F, J>) => Types.Bool<0 | 1>;
        returning?: (...args: UpdateArgs<U, F, J>) => R;
      },
    ],
  ) {
    super();
    if (!this.clause[1].set) {
      // SQL requires a SET clause but we allow omitting it to make the query
      // builder simpler.
      this.clause[1].set = () => ({});
    }
    this.fromItem = clause[1].from?.asFromItem();
  }

  private updateAndFromArgs(): UpdateArgs<U, F, J> {
    const [{ table }] = this.clause;
    return [table.toSelectArgs()[0], ...(this.fromItem?.toSelectArgs() ?? [])] as UpdateArgs<U, F, J>;
  }

  set(fn: (...args: UpdateArgs<U, F, J>) => Partial<U>) {
    const [args0, args1] = this.clause;
    return new Update<U, F, J, R>([
      args0,
      {
        ...args1,
        set: fn,
      },
    ]);
  }

  where(fn: (...args: UpdateArgs<U, F, J>) => Types.Bool<0 | 1>) {
    const [args0, { where, ...rest }] = this.clause;
    return new Update<U, F, J, R>([
      args0,
      {
        ...rest,
        where: chainWhere(where, fn),
      },
    ]);
  }

  returning<R2 extends Types.RowLike>(fn: (...args: UpdateArgs<U, F, J>) => R2) {
    const [args0, { returning, ...rest }] = this.clause;
    return new Update<U, F, J, R2>([
      args0,
      {
        ...rest,
        returning: fn,
      },
    ]);
  }

  compile(ctxIn = Context.new()) {
    const [{ table, only }, { set, from, where, returning }] = this.clause;

    const ctx = this.fromItem ? this.fromItem.getContext(table.getContext(ctxIn)) : table.getContext(ctxIn);

    const clauses = compileClauses(
      {
        only,
        table,
        set,
        from,
        where,
        returning,
      },
      {
        only: () => sql`ONLY`,
        table: (table) => {
          return sql`${table.rawFromExpr.compile(ctx)} as ${sql.ref(ctx.getAlias(table.fromAlias))}`;
        },
        set: (fn) => {
          const assignments = fn(...this.updateAndFromArgs());
          return sql`SET ${sqlJoin(
            Object.entries(pickAny(assignments)).map(
              ([col, val]) => sql`${sql.ref(col)} = ${val.toExpression().compile(ctx)}`,
            ),
          )}`;
        },
        from: () => sql`FROM ${this.fromItem?.compile(ctx)}`,
        where: (fn) =>
          sql`WHERE ${fn(...this.updateAndFromArgs())
            .toExpression()
            .compile(ctx)}`,
        returning: (fn) => {
          const returnList = fn(...this.updateAndFromArgs());
          return sql`RETURNING ${sqlJoin(
            Object.entries(returnList).map(([alias, v]) => sql`${v.toExpression().compile(ctx)} AS ${sql.ref(alias)}`),
          )}`;
        },
      },
    );

    return sqlJoin([sql`UPDATE`, clauses], sql` `);
  }

  getRowLike(): R | undefined {
    const [, { returning }] = this.clause;
    if (returning) {
      return returning(...this.updateAndFromArgs());
    }
    return undefined; // No RETURNING clause, so no specific row shape
  }

  async execute(typegres: Typegres): Promise<RowLikeResult<R>[]> {
    const compiled = this.compile();
    const compiledRaw = compiled.compile(typegres._internal);

    let rows: unknown[];
    try {
      rows = await typegres.executeCompiled(compiledRaw.sql, [...compiledRaw.parameters]);
    } catch (error) {
      console.error("Error executing query: ", compiledRaw.sql, compiledRaw.parameters);
      throw error;
    }

    // If there's a RETURNING clause, parse the returned rows
    const returnShape = this.getRowLike();
    if (returnShape) {
      return rows.map((row) => {
        invariant(typeof row === "object" && row !== null, "Expected each row to be an object");
        return parseRowLike(returnShape, row);
      }) as RowLikeResult<R>[];
    }

    return rows as RowLikeResult<R>[];
  }
}

export function update<
  U extends Types.RowLikeStrict,
  F extends Types.RowLike = U,
  J extends Types.Joins = {},
  R extends Types.RowLike = U,
>(
  table: Types.Table<U>,
  clauses?: {
    set?: (...args: UpdateArgs<U, F, J>) => Partial<U>;
    from?: Types.AsFromItem<F, J>;
    where?: (...args: UpdateArgs<U, F, J>) => Types.Bool<0 | 1>;
    returning?: (...args: UpdateArgs<U, F, J>) => R;
  },
  opts?: {
    only?: true;
  },
): Update<U, F, J, R> {
  return new Update([{ table, only: opts?.only }, clauses ?? {}]);
}
