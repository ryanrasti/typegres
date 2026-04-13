import { Sql, sql } from "./raw-builder";
import type { Any } from "./types";

// Mapping of row name to type (class instance)
type RowType = object;
// All of the row types in the current namespace
type Namespace = {
  [k: string]: RowType;
};

class QueryBuilder<N extends Namespace, O extends RowType> implements Fromable {
  private namespace: N;
  private output: O;
  private from?: Fromable;
  private executor: Executor;
  public readonly alias: string;

  constructor(namespace: N, outputType: O, executor: Executor, alias: string) {
    this.namespace = namespace;
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
          isCompilable(v) ? [sql`${v.compile()} as ${sql.ident(k)}`] : [],
        )}`,
        this.from && sql`FROM ${this.from.compile(true)}`,
        isSubquery && sql`) AS ${sql.ident(this.alias)}`,
      ],
      sql`\n`,
    );
  }

  execute() {
    return this.executor.execute(this.compile());
  }
}

type Fromable = {
  alias: string;
  compile: (isSubquery?: boolean) => Sql;
};

type Compilable = {
  compile: () => Sql;
};

const isCompilable = (value: unknown): value is Compilable => {
  return (
    typeof value === "object" &&
    value !== null &&
    "compile" in value &&
    typeof value.compile === "function"
  );
};
