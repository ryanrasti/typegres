import { Sql, sql } from "./sql-builder";
import { Any } from "./types";
import { TsTypeOf } from "./types/runtime";

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
          v instanceof Any ? [sql`${v.compile()} as ${sql.ident(k)}`] : [],
        )}`,
        this.from && sql`FROM ${this.from.compile(true)}`,
        isSubquery && sql`) AS ${sql.ident(this.alias)}`,
      ],
      sql`\n`,
    );
  }

  execute(): { [k in keyof O]: TsTypeOf<O[k]> } {
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
