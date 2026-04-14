import type { Executor } from "../executor";
import type { Sql} from "./sql";
import { sql } from "./sql";
import type { Bool} from "../types";
import { Any, Anyarray, Record } from "../types";
import type { TsTypeOf, Nullable} from "../types/runtime";
import { meta } from "../types/runtime";

// Extract only Any<> instances from a row type
export const selectList = <T extends RowType>(output: T): T => {
  return Object.fromEntries(
    Object.entries(output).filter(([, v]) => v instanceof Any),
  ) as T;
};

// Compile a row type into a SQL select list: col AS "name", ...
export const compileSelectList = (output: { [key: string]: unknown }): Sql => {
  return sql.join(
    Object.entries(output).flatMap(([k, v]) =>
      v instanceof Any ? [sql`${v.compile()} as ${sql.ident(k)}`] : [],
    ),
  );
};

// Deserialize raw string rows using typed output descriptors
export const deserializeRows = <R>(
  rows: { [key: string]: string }[],
  output: { [key: string]: unknown },
): R[] => {
  return rows.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([k, v]) => {
        const type = output[k];
        if (!(type instanceof Any)) {
          throw new Error(`Expected ${k} to be an Any type, got ${typeof v}`);
        }
        if (v === null || v === undefined) {
          return [k, null];
        }
        return [k, type.deserialize(String(v))];
      }),
    ),
  ) as R[];
};

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
  // Clone: preserve prototype (methods, relations), replace column values with aliased SQL
  const aliased = Object.fromEntries(
    Object.entries(row).map(([k, v]) => {
      const col = sql`${sql.ident(tableAlias)}.${sql.ident(k)}`;
      if (v instanceof Any) {
        return [k, new (v[meta].__class as any)(col)];
      }
      if (v && v.__column && v.__class) {
        return [k, new v.__class(col)];
      }
      return [k, v];
    }),
  );
  Object.setPrototypeOf(aliased, Object.getPrototypeOf(row));
  return aliased as R;
};

export type Fromable = {
  alias: string;
  compile: (isSubquery?: boolean) => Sql;
} & ({ rowType: RowType } | { new (): object });

type RowTypeOfFromable<F extends Fromable> = F extends { rowType: infer R }
  ? R
  : F extends new () => infer R
    ? R
    : never;

const getRowType = (from: Fromable): RowType => {
  if ("rowType" in from) {
    return from.rowType;
  }
  return new (from as new () => object)();
};

type OrderDirection = "asc" | "desc";
type OrderByEntry = Any<any> | [Any<any>, OrderDirection];
type Cardinality = "one" | "maybe" | "many";

type QueryBuilderOptions<
  N extends Namespace,
  O extends RowType,
  GB extends Any<any>[],
> = {
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

// TODO: make sure all methods have sane & documented behavior if called more than once
export class QueryBuilder<
  N extends Namespace,
  O extends RowType,
  GB extends Any<any>[],
  Card extends Cardinality = "many",
> {
  private opts: QueryBuilderOptions<N, O, GB>;
  private card: Card;
  get alias(): string {
    return this.opts.alias;
  }
  get rowType(): RowType {
    return this.opts.output;
  }

  constructor(opts: QueryBuilderOptions<N, O, GB>, card?: Card) {
    this.opts = opts;
    this.card = (card ?? "many") as Card;
  }

  // Must come after any 'groupBy' or 'having' calls (because they modify the output type).
  select<O2 extends RowType>(
    selectFn: (n: N) => O2,
  ): Omit<QueryBuilder<N, O2, GB, Card>, "groupBy" | "having"> {
    return new QueryBuilder({
      ...this.opts,
      output: selectFn(this.opts.namespace),
    }, this.card);
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
        },
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
        },
      ],
    });
  }

  // TODO: after groupBy, namespace values should be transformed to aggregate types
  // so that select can only reference group-by columns or aggregate functions
  groupBy<G extends Any<any>[]>(
    groupByFn: (n: N) => [...G],
  ): QueryBuilder<N & G, O, [...GB, ...G], Card> {
    const rawGroupBy = groupByFn(this.opts.namespace);
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
    } as any, this.card);
  }

  having(havingFn: (n: N) => Bool<any>): QueryBuilder<N, O, GB> {
    return new QueryBuilder({
      ...this.opts,
      having: havingFn(this.opts.namespace),
    });
  }

  orderBy(orderByFn: (n: N) => OrderByEntry | OrderByEntry[]): QueryBuilder<N, O, GB, Card> {
    const result = orderByFn(this.opts.namespace);
    // Normalize: single entry → array
    const entries: OrderByEntry[] =
      result instanceof Any ||
      (Array.isArray(result) && result[0] instanceof Any && typeof result[1] === "string")
        ? [result as OrderByEntry]
        : (result as OrderByEntry[]);
    return new QueryBuilder({
      ...this.opts,
      orderBy: [...(this.opts.orderBy ?? []), ...entries],
    }, this.card);
  }

  limit(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, limit: n });
  }

  offset(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, offset: n });
  }

  // TODO: ROW(), array_agg(), COALESCE should be regular typed ops once we support them
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  scalar(this: QueryBuilder<N, O, GB, "one">): Record<O, 1>;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  scalar(this: QueryBuilder<N, O, GB, "maybe">): Record<O, 0 | 1>;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  scalar(this: QueryBuilder<N, O, GB, "many">): Anyarray<Record<O, 1>, 1>;
  scalar(): any {
    const cols = selectList(this.opts.output);
    const RecordClass = Record.of(cols as any);
    // ROW() takes raw expressions without aliases
    const rowExprs = Object.values(cols).map((type: any) => type.compile());
    const rowSql = sql`ROW(${sql.join(rowExprs)})`;
    // Wrap as a subquery: (SELECT ROW(...) FROM ... WHERE ...)
    const subquery = this.select(() => ({ __row: new RecordClass(rowSql) })).compile({ isSubquery: true });
    if (this.card === "many") {
      return new (Anyarray.of(RecordClass) as any)(
        sql`COALESCE((SELECT array_agg("__row") FROM ${subquery}), '{}')`,
      );
    }
    return new RecordClass(sql`(SELECT "__row" FROM ${subquery})`);
  }

  compile({ isSubquery } = { isSubquery: false }): Sql {
    return sql.join(
      [
        isSubquery && sql`(`,
        sql`SELECT ${compileSelectList(this.opts.output as { [key: string]: unknown })}`,
        this.opts.from && sql`FROM ${this.opts.from.compile(true)}`,
        ...(this.opts.joins ?? []).map((j) =>
          j.type === "left"
            ? sql`LEFT JOIN ${j.from.compile(true)} ON ${j.on.compile()}`
            : sql`JOIN ${j.from.compile(true)} ON ${j.on.compile()}`,
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
              if (entry instanceof Any) {
                return entry.compile();
              }
              const [expr, dir] = entry;
              if (dir === "desc") {
                return sql`${expr.compile()} DESC`;
              }
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

  cardinality<C extends Cardinality>(card: C): QueryBuilder<N, O, GB, C> {
    return new QueryBuilder(this.opts, card);
  }

  debug(): this {
    const compiled = this.compile().compile("pg");
    console.log(compiled.text, compiled.values, this.opts);
    return this;
  }

  async execute(): Promise<RowTypeToTsType<O>[]> {
    const rows = await this.opts.executor.execute(this.compile());
    return deserializeRows<RowTypeToTsType<O>>(rows, this.opts.output as { [key: string]: unknown });
  }
}
