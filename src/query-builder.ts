import { Executor } from "./executor";
import { Sql, sql } from "./sql-builder";
import { Any } from "./types";
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

class QueryBuilder<N extends Namespace, O extends RowType> implements Fromable {
  private namespace: N;
  private output: O;
  private from?: Fromable;
  private executor: Executor;
  public readonly alias: string;

  constructor(namespace: N, outputType: O, executor: Executor, alias: string, from?: Fromable) {
    this.namespace = namespace;
    this.output = outputType;
    this.executor = executor;
    this.alias = alias;
    this.from = from;
  }

  select<O2 extends RowType>(selectFn: (n: N) => O2): QueryBuilder<N, O2> {
    return new QueryBuilder(
      this.namespace,
      selectFn(this.namespace),
      this.executor,
      this.alias,
      this.from,
    );
  }

  compile(isSubquery = false) {
    return sql.join(
      [
        isSubquery && sql`(`,
        // TODO: we should only select the `exposed` fields.
        sql`SELECT ${sql.join(
          Object.entries(this.output).flatMap(([k, v]) =>
            v instanceof Any ? [sql`${v.compile()} as ${sql.ident(k)}`] : [],
          ),
        )}`,
        this.from && sql`FROM ${this.from.compile(true)}`,
        isSubquery && sql`) AS ${sql.ident(this.alias)}`,
      ],
      sql`\n`,
    );
  }

  async execute(): Promise<RowTypeToTsType<O>[]> {
    const rows = await this.executor.execute(this.compile());
    return rows.map((row: Record<string, string>) =>
      Object.fromEntries(
        Object.entries(row).map(([k, v]) => {
          const type = this.output[k as keyof O];
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
    return new QueryBuilder(
      { values: aliased },
      aliased,
      this.executor,
      "q",
      vals,
    ) as any;
  }
}
