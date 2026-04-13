import { Executor } from "./executor";
import { Sql, sql } from "./sql-builder";
import { Any, Bool } from "./types";
import { TsTypeOf } from "./types/runtime";

// Mapping of row name to type (class instance)
type RowType = object;
// All of the row types in the current namespace
type Namespace = {
  [k: string]: RowType;
};

type RowTypeToTsType<R extends RowType> = {
  [k in keyof R]: TsTypeOf<R[k]>;
};

type KeepIndices<T extends unknown[]> = {
  [K in keyof T & number]: T[K];
};

const sortRowColumns = <R extends RowType>(row: R): R => {
  return Object.fromEntries(Object.entries(row).sort(([a], [b]) => a.localeCompare(b))) as R;
};

const aliasRowType = <R extends RowType>(row: R, tableAlias: string): R => {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => {
      // Create a column reference expression with the same type as the original
      // e.g., Int4 instance with __raw = "values"."col"
      if (v instanceof Any) {
        return [k, new (v.__class as any)(sql`${sql.ident(tableAlias)}.${sql.ident(k)}`)];
      }
      return [k, v];
    }),
  ) as R;
};

type QueryBuilderOptions<N extends Namespace, O extends RowType, GB extends Any<0 | 1>[]> = {
  namespace: N;
  output: O;
  executor: Executor;
  alias: string;
  from?: Fromable;
  where?: Bool<0 | 1>;
  groupBy?: GB;
};

class QueryBuilder<
  N extends Namespace,
  O extends RowType,
  GB extends Any<0 | 1>[],
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

  where(whereFn: (n: N) => Bool<0 | 1>): QueryBuilder<N, O, GB> {
    return new QueryBuilder({
      ...this.opts,
      where: whereFn(this.opts.namespace),
    });
  }

  // TODO: after groupBy, namespace values should be transformed to aggregate types
  // so that select can only reference group-by columns or aggregate functions
  groupBy<G extends Any<0 | 1>[]>(
    groupByFn: (n: N) => G,
  ): QueryBuilder<N & KeepIndices<G>, O, [...GB, ...G]> {
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
      },
      groupBy: mergedGroupBy,
    });
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
        this.opts.groupBy && this.opts.groupBy.length > 0 &&
          sql`GROUP BY ${sql.join(this.opts.groupBy.map((g) => g.compile()))}`,
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
          return [k, type.deserialize(String(v))];
        }),
      ),
    ) as RowTypeToTsType<O>[];
  }
}

type Fromable = {
  alias: string;
  compile: (isSubquery?: boolean) => Sql;
};

class Values<R extends RowType> implements Fromable {
  public alias: string = "values";
  private vals0: R;
  private valsRest: (R | RowTypeToTsType<R>)[];

  constructor(vals0: R, ...valsRest: (R | RowTypeToTsType<R>)[]) {
    this.vals0 = vals0;
    this.valsRest = valsRest;
  }

  compile(isSubquery?: boolean) {
    // Stable column order from the first (typed) row
    const columnNames = Object.keys(sortRowColumns(this.vals0));

    // Compile each row into a VALUES tuple
    const rowSqls = [this.vals0, ...this.valsRest].map((row) => {
      const vals = columnNames.map((k) => {
        let v = (row as Record<string, unknown>)[k];
        if (!(v instanceof Any)) {
          // Primitive — wrap using the type from the first row
          const type = this.vals0[k as keyof R];
          if (!(type instanceof Any)) {
            throw new Error(`Expected ${k} to be an Any type`);
          }
          v = new (type.__class as any)(v);
        }
        return (v as Any<any>).compile();
      });
      return sql`(${sql.join(vals)})`;
    });

    const columns = columnNames.map((k) => sql.ident(k));
    const valuesSql = sql`(VALUES ${sql.join(rowSqls)}) AS ${sql.ident(this.alias)}(${sql.join(columns)})`;

    if (isSubquery) {
      return valuesSql;
    }
    return valuesSql;
  }
}

export class Database {
  constructor(private executor: Executor) {}

  public values<R extends RowType>(
    vals0: R,
    ...valsRest: (R | RowTypeToTsType<R>)[]
  ): QueryBuilder<{ values: R }, R> {
    const vals = new Values(vals0, ...valsRest);
    const aliased = aliasRowType(vals0, "values");
    return new QueryBuilder({
      namespace: { values: aliased },
      output: aliased,
      from: vals,
      executor: this.executor,
      alias: "q",
    }) as any;
  }
}
