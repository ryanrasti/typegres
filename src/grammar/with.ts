import { QueryResult, sql } from "kysely";
import { Context, Expression, QueryAlias } from "../expression";
import { Typegres } from "../db";
import { aliasRowLike, parseRowLike, RowLikeResult } from "../query/values";
import { Values } from "../query/from-item";
import invariant from "tiny-invariant";
import { sqlJoin, compileClauses } from "./utils";
import { select, Select } from "./select";
import { Insert } from "./insert";
import { Update } from "./update";
import { Delete } from "./delete";
import { XOR } from "ts-xor";
import { FromItem, RowLike, Text } from "../types";

/*
and with_query is:

    with_query_name [ ( column_name [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( select | values | insert | update | delete | merge )
        [ SEARCH { BREADTH | DEPTH } FIRST BY column_name [, ...] SET search_seq_col_name ]
        [ CYCLE column_name [, ...] SET cycle_mark_col_name [ TO cycle_mark_value DEFAULT cycle_mark_default ] USING cycle_path_col_name ]
*/

class With<R extends RowLike, W extends WithQueryTables> {
  public resolvedCtes: W;

  constructor(public clause: Parameters<typeof with_<R, W>>) {
    this.resolvedCtes = this.resolveCtes();
  }

  resolveCtes(): W {
    const [ctes] = this.clause;
    const raw = ctes(
      <T extends RowLike>(
        expr: Values<T> | Select<T> | Insert<T> | Update<T> | Delete<T>,
        options?: CteArgs[0],
      ) => Cte.new(expr, options),
    );
    const props = Object.getOwnPropertyDescriptors(raw);

    const resolved: Partial<W> = {};
    const sentinel = Cte.new(
      select(() => ({ __foo: Text.new("bar") }), {
        where: () => {
          throw new Error("Sentinal CTE should never be used directly");
        },
      }),
    );
    const chain = new Set<keyof W>();

    const proxy: W = new Proxy(
      {},
      {
        get: (_, prop: keyof W & string) => {
          if (prop in resolved) {
            return resolved[prop];
          }
          const desc = props[prop];
          if (desc.value !== undefined) {
            resolved[prop] = desc.value.as(prop) as W[keyof W & string];
            return resolved[prop];
          }

          if (chain.has(prop)) {
            invariant(
              chain.size === 1,
              `Circular reference detected in CTE resolution: ${Array.from(
                chain,
              ).join(" -> ")} -> ${prop}`,
            );
            // This is a recursive CTE, return a sentinel
            resolved[prop] = sentinel.as(prop) as W[keyof W & string];
            return resolved[prop];
          }
          chain.add(prop);

          invariant(
            desc.get !== undefined,
            `No getter for CTE property ${prop}`,
          );
          const rawCte = desc.get.bind(proxy)();
          invariant(
            rawCte instanceof Cte,
            `Expected CTE for property ${prop}, but got ${typeof rawCte}`,
          );
          if (resolved[prop] !== undefined) {
            // If we've already resolved this prop, we must be in a recursive CTE.
            // Just make sure the alias is not created again:
            resolved[prop] = new Cte(
              resolved[prop].fromAlias,
              rawCte.expression,
              rawCte.args,
            ) as W[keyof W & string];
            // And then resolve it again:
            const { expression, args } = desc.get.bind(proxy)();
            resolved[prop] = new Cte(
              resolved[prop].fromAlias,
              expression,
              args,
            ) as W[keyof W & string];
          } else {
            resolved[prop] = rawCte.as(prop) as W[keyof W & string];
          }

          chain.delete(prop);
          return resolved[prop];
        },
      },
    ) as W;
    return Object.fromEntries(
      Object.keys(props).map((key) => {
        chain.clear();
        return [key, proxy[key as keyof W]];
      }),
    ) as unknown as W;
  }

  compile(ctxIn = Context.new()) {
    const [, then, { recursive } = {}] = this.clause;

    const ctx = ctxIn.withAliases(
      Object.values(this.resolvedCtes).map((cte) => cte.fromAlias),
    );

    const thenQuery = then(this.resolvedCtes);
    const needsParens = !(
      thenQuery instanceof Insert ||
      thenQuery instanceof Update ||
      thenQuery instanceof Delete
    );

    return sqlJoin(
      [
        sql`WITH`,
        recursive ? sql`RECURSIVE` : undefined,
        ...Object.values(this.resolvedCtes).map((cte) => cte.compileCte(ctx)),
        needsParens ? sql`(${thenQuery.compile(ctx)})` : thenQuery.compile(ctx),
      ],
      sql` `,
    );
  }

  getRowLike(): RowLike | undefined {
    const [, then] = this.clause;
    return then(this.resolvedCtes).getRowLike();
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
    if (returnShape) {
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

export class CteReferenceExpression extends Expression {
  constructor(public alias: QueryAlias) {
    super();
  }

  compile(ctx: Context) {
    return sql.ref(ctx.getAlias(this.alias));
  }
}

type CteArgs = [
  options?: XOR<{ materialized?: true }, { notMaterialized?: true }> & {
    search?: never;
    cycle?: never;
  },
];

export class Cte<R extends RowLike> extends FromItem<R> {
  constructor(
    alias: QueryAlias,
    public expression:
      | Values<R>
      | Select<R>
      | Insert<R>
      | Update<R>
      | Delete<R>,
    public args: CteArgs,
  ) {
    super(
      new CteReferenceExpression(alias),
      alias,
      {},
      aliasRowLike(alias, expression.getRowLike() ?? ({} as R)),
    );
  }

  getRowLike(): R | undefined {
    return this.expression.getRowLike();
  }

  static new<R extends RowLike>(
    expression: Values<R> | Select<R> | Insert<R> | Update<R> | Delete<R>,
    options?: CteArgs[0],
  ): Cte<R> {
    return new Cte(new QueryAlias("cte"), expression, [options]);
  }

  as(alias: string): Cte<R> {
    return new Cte(new QueryAlias(alias), this.expression, this.args);
  }

  compileCte(ctx: Context) {
    const { materialized, notMaterialized, search, cycle } = this.args[0] ?? {};
    return sqlJoin(
      [
        sql`${sql.ref(ctx.getAlias(this.fromAlias))}${
          this.expression instanceof Values
            ? sql`(${this.expression.tableColumnAlias()})`
            : sql``
        }`,
        sql`AS`,
        compileClauses(
          { materialized, notMaterialized },
          {
            materialized: () => sql`MATERIALIZED`,
            notMaterialized: () => sql`NOT MATERIALIZED`,
          },
        ),
        this.expression instanceof FromItem
          ? this.expression.rawFromExpr.compile(ctx)
          : sql`(${this.expression.compile(ctx)})`,
        compileClauses(
          { search, cycle },
          {
            search: () => {
              throw new Error("SEARCH clause not implemented");
            },
            cycle: () => {
              throw new Error("CYCLE clause not implemented");
            },
          },
        ),
      ],
      sql` `,
    );
  }
}

type WithQueryTables = {
  [k in string]: Cte<any>;
};

export const with_ = <R extends RowLike, W extends WithQueryTables>(
  ctes: (
    cte: <T extends RowLike>(
      expr:
        | Values<T>
        | Select<T>
        | Insert<any, any, any, T>
        | Update<any, any, any, T>
        | Delete<any, any, any, T>,
      options?: CteArgs[0],
    ) => Cte<T>,
  ) => W,
  then: (
    args: W,
  ) =>
    | Select<R>
    | Values<R>
    | Insert<any, any, any, R>
    | Update<any, any, any, R>
    | Delete<any, any, any, R>,
  opts?: {
    recursive?: true;
  },
): With<R, W> => {
  return new With<R, W>([ctes, then, opts]);
};
