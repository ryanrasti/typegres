import { Executor } from "./executor";
import { Sql, sql } from "./sql-builder";
import { Any, Bool } from "./types";
import { TsTypeOf, Nullable, meta } from "./types/runtime";

// Mapping of row name to type (class instance)
export type RowType = object;
// All of the row types in the current namespace
type Namespace = {
  [k: string]: RowType;
};

export type RowTypeToTsType<R extends RowType> = {
  [k in keyof R]: TsTypeOf<R[k]>;
};

type RowTypeToNullable<R extends RowType> = {
  [k in keyof R]: Nullable<R[k]>;
};

export const sortRowColumns = <R extends RowType>(row: R): R => {
  return Object.fromEntries(Object.entries(row).sort(([a], [b]) => a.localeCompare(b))) as R;
};

export const aliasRowType = <R extends RowType>(row: R, tableAlias: string): R => {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => {
      const col = sql`${sql.ident(tableAlias)}.${sql.ident(k)}`;
      if (v instanceof Any) {
        return [k, new (v[meta].__class as any)(col)];
      }
      // Column descriptor from Table definitions
      if (v && v.__column && v.__class) {
        return [k, new v.__class(col)];
      }
      return [k, v];
    }),
  ) as R;
};

export type Fromable = {
  alias: string;
  compile: (isSubquery?: boolean) => Sql;
} & ({ rowType: RowType } | { new (): object });

type RowTypeOfFromable<F extends Fromable> = 
  F extends { rowType: infer R } ? R : 
  F extends new () => infer R ? R : never;

const getRowType = (from: Fromable): RowType => {
  if ("rowType" in from) { return from.rowType; }
  return new (from as new () => object)();
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
  joins?: {
    from: Fromable;
    on: Bool<any>;
    type?: "left"; // we only support (inner) join and left join
  }[];
  limit?: number;
  offset?: number;
};

export class QueryBuilder<
  N extends Namespace,
  O extends RowType,
  GB extends Any<any>[],
> {
  private opts: QueryBuilderOptions<N, O, GB>;
  get alias(): string {
    return this.opts.alias;
  }
  get rowType(): RowType {
    return this.opts.output;
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

  join<F extends Fromable>(
    from: F,
    onFn: (ns: N & { [k in F["alias"]]: RowTypeOfFromable<F> }) => Bool<any>,
  ): QueryBuilder<N & { [k in F["alias"]]: RowTypeOfFromable<F> }, O, GB> {
    const namespace = {
      ...this.opts.namespace,
      [from.alias]: aliasRowType(getRowType(from), from.alias),
    } as any;
    return new QueryBuilder({
      ...this.opts,
      namespace,
      joins: [
        ...(this.opts.joins ?? []),
        {
          from,
          on: onFn(namespace),
        }
      ],
    });
  }

  leftJoin<F extends Fromable>(
    from: F,
    onFn: (ns: N & { [k in F["alias"]]: RowTypeToNullable<RowTypeOfFromable<F>> }) => Bool<any>,
  ): QueryBuilder<N & { [k in F["alias"]]: RowTypeToNullable<RowTypeOfFromable<F>> }, O, GB> {
    const namespace = {
      ...this.opts.namespace,
      [from.alias]: aliasRowType(getRowType(from), from.alias),
    } as any;
    return new QueryBuilder({
      ...this.opts,
      namespace,
      joins: [
        ...(this.opts.joins ?? []),
        {
          from,
          on: onFn(namespace),
          type: "left",
        }
      ],
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
        ...(this.opts.joins ?? []).map((j) =>
          j.type === "left"
            ? sql`LEFT JOIN ${j.from.compile(true)} ON ${j.on.compile()}`
            : sql`JOIN ${j.from.compile(true)} ON ${j.on.compile()}`
        ),
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

  debug(): this {
    const compiled = this.compile().compile("pg");
    console.log(compiled.text, compiled.values, this.opts);
    return this;
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

