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

class QueryBuilder<N extends Namespace, O extends RowType> implements Fromable {
  private namespace: N;
  private output: O;
  private from?: Fromable;
  private executor: Executor;
  public readonly alias: string;

  constructor(namespace: N, outputType: O, executor: Executor, alias: string) {
    this.namespace = namespace;
    this.output = outputType;
    this.executor = executor;
    this.alias = alias;
  }

  select<O2 extends RowType>(selectFn: (n: N) => O2): QueryBuilder<N, O2> {
    return new QueryBuilder(this.namespace, selectFn(this.namespace), this.executor, this.alias);
  }

  compile(isSubquery = false) {
    return sql.join(
      [
        isSubquery && sql`(`,
        // TODO: we should only select the `exposed` fields.
        sql`SELECT ${Object.entries(this.output).flatMap(([k, v]) =>
          v instanceof Any ? [sql`${v.compile()} as ${sql.ident(k)}`] : [],
        )}`,
        this.from && sql`FROM ${this.from.compile(true)}`,
        isSubquery && sql`) AS ${sql.ident(this.alias)}`,
      ],
      sql`\n`,
    );
  }

  execute(): RowTypeToTsType<O> {
    const rows = this.executor.execute(this.compile());
    return rows.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([k, v]) => {
          const type = this.output[k as keyof O];
          if (!(type instanceof Any)) {
            throw new Error(`Expected ${k} to be an Any type, got ${typeof v}`);
          }
          return [k, type.deserialize(v)];
        }),
      ),
    );
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
    if (isSubquery) {
      throw new Error("Values cannot be a subquery");
    }

    const mappedVals = [this.vals0, ...this.valsRest].map((v) => {
      const sorted = sortRowColumns(
        Object.entries(v).map(([k, v]) => {
          if (!(v instanceof Any)) {
            const type = this.vals0[k as keyof R];
            if (!type) {
              throw new Error(`Unknown column ${k}`);
            }
            if (!(type instanceof Any)) {
              throw new Error(`Expected ${k} to be an Any type, got ${typeof v}`);
            }
            v = new type.__class(v);
          }
          return [k, v.compile()];
        }),
      );
      return Object.fromEntries(sorted).map(([k, v]) => sql`${sql.ident(k)}`);
    });
    const columns = Object.keys(this.vals0).map((k) => sql.ident(k));

    return sql`(VALUES (${sql.join(mappedVals)})) AS ${sql.ident(this.alias)}(${sql.join(columns)})`;
  }
}

class Database {
  constructor(private executor: Executor) {}

  public values<R extends RowType>(
    vals0: R,
    ...valsRest: (R | RowTypeToTsType<R>)[]
  ): QueryBuilder<{ values: R }, R> {
    const vals = new Values(vals0, ...valsRest);
    return new QueryBuilder({ values: vals0 }, vals, this.executor, "values");
  }
}
