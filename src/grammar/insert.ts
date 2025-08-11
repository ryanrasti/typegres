import { QueryResult, sql } from "kysely";
import { Context } from "../expression";
import * as Types from "../types";
import { Typegres } from "../db";
import { parseRowLike, RowLikeResult, Values } from "../query/values";
import invariant from "tiny-invariant";
import { sqlJoin, compileClauses } from "./utils";
import { Select } from "./select";

/*
[ WITH [ RECURSIVE ] with_query [, ...] ]
INSERT INTO table_name [ AS alias ] [ ( column_name [, ...] ) ]
    [ OVERRIDING { SYSTEM | USER } VALUE ]
    { DEFAULT VALUES | VALUES ( { expression | DEFAULT } [, ...] ) [, ...] | query }
    [ ON CONFLICT [ conflict_target ] conflict_action ]
    [ RETURNING { * | output_expression [ [ AS ] output_name ] } [, ...] ]

where conflict_target can be one of:

    ( { index_column_name | ( index_expression ) } [ COLLATE collation ] [ opclass ] [, ...] ) [ WHERE index_predicate ]
    ON CONSTRAINT constraint_name

and conflict_action is one of:

    DO NOTHING
    DO UPDATE SET { column_name = { expression | DEFAULT } |
                    ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
                    ( column_name [, ...] ) = ( sub-SELECT )
                  } [, ...]
              [ WHERE condition ]
*/

export class Insert<
  I extends Types.RowLike = Types.RowLike,
  K extends keyof I = keyof I,
  S extends Pick<I, K> = Pick<I, K>,
  R extends Types.RowLike = I,
> {
  constructor(public clause: Parameters<typeof insert<I, K, S, R>>) {}

  compile(ctxIn = Context.new()) {
    const [
      { into, columns, overriding },
      values,
      { onConflict, returning } = {},
    ] = this.clause;

    const ctx = into.getContext(ctxIn);

    const clauses = compileClauses(
      {
        into,
        columns,
        overriding,
        values,
        onConflict,
        returning,
      },
      {
        into: (table) => {
          // For INSERT, we just need the table name, not a full FROM item compilation
          return sql`INTO ${table.rawFromExpr.compile(ctx)}`;
        },
        columns: (cols) =>
          sql`(${sqlJoin(cols.map((col) => sql.ref(col as string)))})`,
        overriding: ([systemOrUser, _value]) =>
          sql`OVERRIDING ${systemOrUser === "system" ? sql`SYSTEM` : sql`USER`} VALUE`,
        values: (vals) => {
          if (vals === "defaultValues") {
            return sql`DEFAULT VALUES`;
          }
          return sql`(${vals.compile(ctx)})`;
        },
        onConflict: ([_target, _action]) => {
          // TODO: Implement conflict handling
          throw new Error("ON CONFLICT not yet implemented");
        },
        returning: (fn) => {
          const returnList = fn(into.toSelectArgs()[0]);
          return sql`RETURNING ${sqlJoin(
            Object.entries(returnList).map(
              ([alias, v]) =>
                sql`${v.toExpression().compile(ctx)} AS ${sql.ref(alias)}`,
            ),
          )}`;
        },
      },
    );

    return sql`INSERT ${clauses}`;
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

    // If there's a RETURNING clause, parse the returned rows
    const [{ into }, , opts] = this.clause;
    if (opts?.returning) {
      const insertRowArgs = [into.toSelectArgs()[0]] as const;
      const returnShape = opts.returning(...insertRowArgs);

      return raw.rows.map((row) => {
        invariant(
          typeof row === "object" && row !== null,
          "Expected each row to be an object",
        );
        return parseRowLike(returnShape, row);
      }) as RowLikeResult<R>[];
    }

    return raw.rows as RowLikeResult<R>[];
  }
}

// Type for the VALUES clause - either literal values, VALUES clause, or a subquery
type ValuesInput<S extends Types.RowLike> =
  | "defaultValues"
  | Values<S>
  | Select<any, any, S>;

export const insert = <
  I extends Types.RowLike,
  K extends keyof I = keyof I,
  S extends Pick<I, K> = Pick<I, K>,
  R extends Types.RowLike = I,
>(
  tableClause: {
    into: Types.Table<I>;
    columns?: K[];
    overriding?: ["system" | "user", "value"];
  },
  values: ValuesInput<S>,
  opts?: {
    onConflict?: [
      target?: never, // TODO: implement conflict target
      action?: never, // TODO: implement conflict action
    ];
    returning?: (insertRow: I) => R;
  },
) => {
  return new Insert<I, K, S, R>([tableClause, values, opts]);
};
