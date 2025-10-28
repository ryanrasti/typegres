import { QueryResult, RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { XOR } from "ts-xor";
import { Typegres } from "../db";
import { Context } from "../expression";
import { TableSchema } from "../query/db";
import { bareRowLike, parseRowLike, PickAny, pickAny, rawAliasRowLike, RowLikeResult, Values } from "../query/values";
import * as Types from "../types";
import { Repeated } from "../types";
import { Select } from "./select";
import { compileClauses, sqlJoin } from "./utils";

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
  I extends Types.RowLikeStrict = Types.RowLikeStrict,
  TS extends TableSchema = TableSchema,
  K extends keyof I = keyof I,
  R extends Types.RowLike = I,
  V extends TableSchemaToRowLikeStrict<TS> = TableSchemaToRowLikeStrict<TS>,
> {
  constructor(public clause: Parameters<typeof insert<I, TS, K, R, V>>) {
    if (!clause[1]) {
      // insertion values are required, but we allow omitting them to make the
      // query builder more ergonomic:
      clause[1] = "defaultValues";
    }
  }

  values(values: "defaultValues" | Values<V> | Select<V, any, any>) {
    return new Insert<I, TS, K, R, V>([this.clause[0], values, this.clause[2]]);
  }

  onConflict(onConflict: OnConflictInput<I>) {
    return new Insert<I, TS, K, R, V>([this.clause[0], this.clause[1], { ...this.clause[2], onConflict }]);
  }

  returning<R2 extends Types.RowLike = I>(fn?: (insertRow: I) => R2): Insert<I, TS, K, R2, V> {
    return new Insert<I, TS, K, R2, V>([this.clause[0], this.clause[1], { ...this.clause[2], returning: fn }]);
  }

  compile(ctxIn = Context.new()) {
    const [{ into, overriding }, values, { onConflict, returning } = {}] = this.clause;

    const ctx = into.getContext(ctxIn);

    const clauses = compileClauses(
      {
        into,
        columns: values === "defaultValues" ? undefined : values,
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
        columns: (vals) => {
          const cols = Object.keys(pickAny(vals.asFromItem().from));
          invariant(
            cols.every((col) => col in into.schema),
            `All specified columns must exist in the target table schema: ${cols.join(", ")} not in ${Object.keys(into.schema).join(", ")}`,
          );
          return sql`(${sqlJoin(cols.toSorted().map((col) => sql.ref(col)))})`;
        },
        overriding: ([systemOrUser, _value]) =>
          sql`OVERRIDING ${systemOrUser === "system" ? sql`SYSTEM` : sql`USER`} VALUE`,
        values: (vals) => {
          if (vals === "defaultValues") {
            return sql`DEFAULT VALUES`;
          }
          if (vals instanceof Values) {
            return sql`${vals.rawFromExpr.compile(ctx)}`;
          }
          return sql`(${vals.compile(ctx)})`;
        },
        onConflict: (input) => compileOnConflictInput(input, into.toSelectArgs()[0], ctx),
        returning: (fn) => {
          const returnList = fn(into.toSelectArgs()[0]);
          return sql`RETURNING ${sqlJoin(
            Object.entries(returnList).map(([alias, v]) => sql`${v.toExpression().compile(ctx)} AS ${sql.ref(alias)}`),
          )}`;
        },
      },
    );

    return sql`INSERT ${clauses}`;
  }

  getRowLike(): R | undefined {
    const [{ into }, , opts] = this.clause;
    if (opts?.returning) {
      const insertRowArgs = [into.toSelectArgs()[0]] as const;
      return opts.returning(...insertRowArgs);
    }
    return undefined; // No RETURNING clause, so no specific row shape
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

    // If there's a RETURNING clause, parse the returned rows
    const returnShape = this.getRowLike();
    if (returnShape) {
      return raw.rows.map((row) => {
        invariant(typeof row === "object" && row !== null, "Expected each row to be an object");
        return parseRowLike(returnShape, row);
      }) as RowLikeResult<R>[];
    }

    return raw.rows as RowLikeResult<R>[];
  }
}

type ConflictTarget<I extends Types.RowLike> = XOR<
  {
    target: Repeated<
      | ((row: I) => Types.Any)
      | [
          index: (row: I) => Types.Any,
          {
            collate?: RawBuilder<unknown>;
            opclass?: RawBuilder<unknown>;
          }?,
        ]
    >;
    where?: (insertRow: I) => Types.Bool<0 | 1>;
  },
  { onConstraint: RawBuilder<unknown> }
>;

const compileConflictTarget = <I extends Types.RowLike>(
  target: ConflictTarget<I>["target"],
  args: I,
  ctx: Context,
): RawBuilder<any> => {
  const flat = [target].flat(2);
  const list = flat.map((x, idx) => {
    const index = typeof x === "function" ? x : undefined;
    if (!index) {
      return undefined;
    }
    const next = flat[idx + 1];
    const opts = typeof next === "function" ? {} : next;
    return compileClauses(
      { index, ...opts },
      {
        index: (index) => index(bareRowLike(args)).toExpression().compile(ctx),
        collate: (collate) => sql`COLLATE ${collate}`,
        opclass: (opclass) => sql`OPERATOR CLASS ${opclass}`,
      },
    );
  });
  return sqlJoin(list, sql`, `);
};

type OnConflictInput<I extends Types.RowLike> = XOR<
  { doNothing: true },
  ConflictTarget<I> &
    XOR<
      { doNothing: true },
      {
        doUpdateSet:
          | ((insertRow: I, excluded: I) => Partial<PickAny<I>>)
          | [
              (insertRow: I, excluded: I) => Partial<PickAny<I>>,
              { where?: (insertRow: I, excluded: I) => Types.Bool<0 | 1> }?,
            ];
      }
    >
>;

const compileOnConflictInput = <I extends Types.RowLike>(onConflict: OnConflictInput<I>, args: I, ctx: Context) => {
  const ret = compileClauses(onConflict, {
    target: (target) => sql`(${compileConflictTarget(target, args, ctx)})`,
    onConstraint: (constraintName) => sql`ON CONSTRAINT ${constraintName}`,
    where: (whereFn) => sql`WHERE ${whereFn(args).toExpression().compile(ctx)}`,
    doNothing: () => sql`DO NOTHING`,
    doUpdateSet: (updateSet) => {
      const normalized = Array.isArray(updateSet) ? updateSet : ([updateSet] as const);
      const [setFn, opts] = normalized;

      const pickedArgs = pickAny(args);
      const excluded = rawAliasRowLike("excluded", pickedArgs);

      const setClause = sql`SET ${sqlJoin(
        Object.entries(setFn(pickedArgs, excluded)).map(([col, val]) => {
          invariant(val instanceof Types.Any, `Expected value for column ${col} to be an instance of Any`);
          return sql`${sql.ref(col)} = ${val.toExpression().compile(ctx)}`;
        }),
      )}`;
      return sql`DO UPDATE ${sqlJoin(
        [setClause, opts?.where && sql`WHERE ${opts.where(args, excluded).toExpression().compile(ctx)}`].filter(
          Boolean,
        ),
        sql` `,
      )}`;
    },
  });
  return sql`ON CONFLICT ${ret}`;
};

type Expand<T> = T extends object ? { [K in keyof T]: T[K] } : T;

export type TableSchemaToRowLikeStrict<TS extends TableSchema> = Expand<
  {
    [K in keyof TS as TS[K]["required"] extends true ? K : never]: InstanceType<TS[K]["type"]>;
  } & Partial<{
    [K in keyof TS as TS[K]["required"] extends false ? K : never]: InstanceType<TS[K]["type"]>;
  }>
>;

export const insert = <
  I extends Types.RowLikeStrict,
  TS extends TableSchema,
  K extends keyof I,
  R extends Types.RowLike = I,
  V extends TableSchemaToRowLikeStrict<TS> = TableSchemaToRowLikeStrict<TS>,
>(
  tableClause: {
    // we omit `columns` here becase we can always infer them from the `values` parameter
    // and including them introduces both complexity and potential for mismatch
    into: Types.Table<I, TS>;
    overriding?: ["system" | "user", "value"];
  },
  values?: "defaultValues" | Values<V> | Select<V, any, any>,
  opts?: {
    onConflict?: OnConflictInput<I>;
    returning?: (insertRow: I) => R;
  },
) => {
  return new Insert<I, TS, K, R, V>([tableClause, values, opts]);
};
