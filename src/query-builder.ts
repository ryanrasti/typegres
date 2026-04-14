import { Executor } from "./executor";
import { Sql, sql } from "./sql-builder";
import { Any, Bool } from "./types";
import { TsTypeOf } from "./types/runtime";

// Mapping of row name to type (class instance)
export type RowType = object;
// All of the row types in the current namespace
type Namespace = {
  [k: string]: RowType;
};

export type RowTypeToTsType<R extends RowType> = {
  [k in keyof R]: TsTypeOf<R[k]>;
};


export const sortRowColumns = <R extends RowType>(row: R): R => {
  return Object.fromEntries(Object.entries(row).sort(([a], [b]) => a.localeCompare(b))) as R;
};

export const aliasRowType = <R extends RowType>(row: R, tableAlias: string): R => {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => {
      const col = sql`${sql.ident(tableAlias)}.${sql.ident(k)}`;
      if (v instanceof Any) {
        return [k, new (v.__class as any)(col)];
      }
      // Column descriptor from Table definitions
      if (v && v.__column && v.__class) {
        return [k, new v.__class(col)];
      }
      return [k, v];
    }),
  ) as R;
};

type OrderDirection = "asc" | "desc";
type OrderByEntry = Any<any> | [Any<any>, OrderDirection];

type QueryBuilderOptions<N extends Namespace, O extends RowType, GB extends Any<any>[]> = {
  namespace: N;
  output: O;
  executor: Executor;
  alias: string;
  from?: Fromable;
  where?: Bool<any>;
  groupBy?: GB;
  having?: Bool<any>;
  orderBy?: OrderByEntry[];
  limit?: number;
  offset?: number;
};

export class QueryBuilder<
  N extends Namespace,
  O extends RowType,
  GB extends Any<any>[],
> implements Fromable {
  private opts: QueryBuilderOptions<N, O, GB>;
  get alias(): string {
    return this.opts.alias;
  }

  constructor(opts: QueryBuilderOptions<N, O, GB>) {
    this.opts = opts;
  }

  // Must come after any 'groupBy' or 'having' calls (because they modify the output type).
  select<O2 extends RowType>(
    selectFn: (n: N) => O2,
  ): Omit<QueryBuilder<N, O2, GB>, "groupBy" | "having"> {
    return new QueryBuilder({
      ...this.opts,
      output: selectFn(this.opts.namespace),
    });
  }

  where(whereFn: (n: N) => Bool<any>): QueryBuilder<N, O, GB> {
    return new QueryBuilder({
      ...this.opts,
      where: whereFn(this.opts.namespace),
    });
  }

  // TODO: after groupBy, namespace values should be transformed to aggregate types
  // so that select can only reference group-by columns or aggregate functions
  groupBy<G extends Any<any>[]>(
    groupByFn: (n: N) => [...G],
  ): QueryBuilder<N & G, O, [...GB, ...G]> {
    let rawGroupBy = groupByFn(this.opts.namespace);
    const mergedGroupBy = [...(this.opts.groupBy ?? []), ...rawGroupBy];

    const indices = Object.keys(mergedGroupBy);
    for (const i of indices) {
      if (i in this.opts.namespace) {
        throw new Error(
          `Group by column index ${i} present in namespace. Namespace should only contain string keys by default.`,
        );
      }
    }

    return new QueryBuilder({
      ...this.opts,
      namespace: {
        ...this.opts.namespace,
        // We add the group by columns to the namespace -- they are accessible by index
        //  e.g., .select({ 0: g0 }) => select(n => ({ ret: g0 }))
        ...mergedGroupBy,
        [Symbol.iterator]: () => mergedGroupBy[Symbol.iterator](),
      },
      groupBy: mergedGroupBy,
    } as any);
  }

  having(havingFn: (n: N) => Bool<any>): QueryBuilder<N, O, GB> {
    return new QueryBuilder({
      ...this.opts,
      having: havingFn(this.opts.namespace),
    });
  }

  orderBy(
    orderByFn: (n: N) => OrderByEntry | OrderByEntry[],
  ): QueryBuilder<N, O, GB> {
    const result = orderByFn(this.opts.namespace);
    // Normalize: single entry → array
    const entries: OrderByEntry[] = result instanceof Any || (Array.isArray(result) && result[0] instanceof Any && typeof result[1] === "string")
      ? [result as OrderByEntry]
      : result as OrderByEntry[];
    return new QueryBuilder({
      ...this.opts,
      orderBy: [...(this.opts.orderBy ?? []), ...entries],
    });
  }

  limit(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, limit: n });
  }

  offset(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, offset: n });
  }

  compile(isSubquery = false) {
    return sql.join(
      [
        isSubquery && sql`(`,
        // TODO: we should only select the `exposed` fields.
        sql`SELECT ${sql.join(
          Object.entries(this.opts.output).flatMap(([k, v]) =>
            v instanceof Any ? [sql`${v.compile()} as ${sql.ident(k)}`] : [],
          ),
        )}`,
        this.opts.from && sql`FROM ${this.opts.from.compile(true)}`,
        this.opts.where && sql`WHERE ${this.opts.where.compile()}`,
        this.opts.groupBy &&
          this.opts.groupBy.length > 0 &&
          sql`GROUP BY ${sql.join(this.opts.groupBy.map((g) => g.compile()))}`,
        this.opts.having && sql`HAVING ${this.opts.having.compile()}`,
        this.opts.orderBy &&
          this.opts.orderBy.length > 0 &&
          sql`ORDER BY ${sql.join(
            this.opts.orderBy.map((entry) => {
              if (entry instanceof Any) { return entry.compile(); }
              const [expr, dir] = entry;
              if (dir === "desc") { return sql`${expr.compile()} DESC`; }
              return sql`${expr.compile()} ASC`;
            }),
          )}`,
        this.opts.limit !== undefined && sql`LIMIT ${sql.param(this.opts.limit)}`,
        this.opts.offset !== undefined && sql`OFFSET ${sql.param(this.opts.offset)}`,
        isSubquery && sql`) AS ${sql.ident(this.alias)}`,
      ],
      sql`\n`,
    );
  }

  async execute(): Promise<RowTypeToTsType<O>[]> {
    const rows = await this.opts.executor.execute(this.compile());
    return rows.map((row: Record<string, string>) =>
      Object.fromEntries(
        Object.entries(row).map(([k, v]) => {
          const type = this.opts.output[k as keyof O];
          if (!(type instanceof Any)) {
            throw new Error(`Expected ${k} to be an Any type, got ${typeof v}`);
          }
          if (v === null || v === undefined) {
            return [k, null];
          }
          return [k, type.deserialize(String(v))];
        }),
      ),
    ) as RowTypeToTsType<O>[];
  }
}

export type Fromable = {
  alias: string;
  compile: (isSubquery?: boolean) => Sql;
};

