import type { Executor } from "../executor";
import { sql } from "./sql";
import type { RowType, RowTypeToTsType } from "./query";
import { compileSelectList, deserializeRows } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type InsertOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  executor: Executor;
  instance: T;
  namespace: Namespace<Name, T>;
  columnNames: string[];
  rows: { [key: string]: unknown }[];
  returning?: R;
};

export class InsertBuilder<Name extends string, T extends { [key: string]: any }, R extends RowType = {}> {
  #opts: InsertOpts<Name, T, R>;

  constructor(opts: InsertOpts<Name, T, R>) {
    this.#opts = opts;
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): InsertBuilder<Name, T, R2> {
    return new InsertBuilder({
      ...this.#opts,
      returning: fn(this.#opts.namespace),
    });
  }

  compile() {
    if (this.#opts.rows.length === 0) {
      throw new Error("insert() requires at least one row");
    }
    const columns = this.#opts.columnNames.map((k) => sql.ident(k));
    const rowSqls = this.#opts.rows.map((row) => {
      const vals = this.#opts.columnNames.map((k) => {
        const v = row[k];
        if (v === undefined) {
          return sql`DEFAULT`;
        }
        const col = this.#opts.instance[k];
        return col.__class.from(v).toSql();
      });
      return sql`(${sql.join(vals)})`;
    });

    return sql.join([
      sql`INSERT INTO ${sql.ident(this.#opts.tableName)} (${sql.join(columns)}) VALUES ${sql.join(rowSqls)}`,
      this.#opts.returning && sql`RETURNING ${compileSelectList(this.#opts.returning as { [key: string]: unknown })}`,
    ], sql` `);
  }

  debug(): this {
    const compiled = this.compile().compile("pg");
    console.log(compiled.text, compiled.values, this.#opts);
    return this;
  }

  async execute(): Promise<RowTypeToTsType<R>[]> {
    const result = await this.#opts.executor.execute(this.compile());
    if (this.#opts.returning) {
      return deserializeRows(result, this.#opts.returning as { [key: string]: unknown }) as any;
    }
    return [] as any;
  }
}
