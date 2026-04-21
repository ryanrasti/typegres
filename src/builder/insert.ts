import { Sql, sql } from "./sql";
import type { Alias , BoundSql} from "./sql";
import type { RowType } from "./query";
import { compileSelectList } from "./query";
import type { Any } from "../types";
import { meta } from "../types/runtime";

type Namespace<Name extends string, T> = { [K in Name]: T };

type InsertOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  instance: T;
  namespace: Namespace<Name, T>;
  alias: Alias;
  columnNames: string[];
  rows: { [key: string]: unknown }[];
  returning?: R;
};

export class InsertBuilder<Name extends string, T extends { [key: string]: any }, R extends RowType = {}> extends Sql {
  #opts: InsertOpts<Name, T, R>;

  get returningRowType(): R | undefined {
    return this.#opts.returning;
  }

  constructor(opts: InsertOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): InsertBuilder<Name, T, R2> {
    return new InsertBuilder({
      ...this.#opts,
      returning: fn(this.#opts.namespace),
    });
  }

  bind(): BoundSql {
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
        const col = this.#opts.instance[k] as Any<any>;
        return col[meta].__class.from(v).toSql();
      });
      return sql`(${sql.join(vals)})`;
    });

    const inner = sql.join([
      sql`INSERT INTO ${sql.ident(this.#opts.tableName)} (${sql.join(columns)}) VALUES ${sql.join(rowSqls)}`,
      this.#opts.returning && sql`RETURNING ${compileSelectList(this.#opts.returning as { [key: string]: unknown })}`,
    ], sql` `);
    return sql.withScope([this.#opts.alias], inner);
  }

  debug(): this {
    const compiled = this.bind().compile("pg");
    console.log(compiled.text, compiled.values, this.#opts);
    return this;
  }

  // Internal: expose structured parts for live-event wrapping.
  liveIntrospect() {
    return {
      tableName: this.#opts.tableName,
      instance: this.#opts.instance,
      alias: this.#opts.alias,
      columnNames: this.#opts.columnNames,
      rows: this.#opts.rows,
      returning: this.#opts.returning,
    };
  }
}
