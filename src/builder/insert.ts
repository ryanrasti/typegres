import { Sql, sql, Alias } from "./sql";
import type { BoundSql } from "./sql";
import type { RowType } from "./query";
import { compileSelectList, reAlias } from "./query";
import type { TableBase } from "../table";
import type { Any } from "../types";
import { meta } from "../types/runtime";

type Namespace<Name extends string, T> = { [K in Name]: T };

type InsertOpts<Name extends string, T extends TableBase, R extends RowType> = {
  instance: T;
  columnNames: string[];
  rows: [{ [key: string]: unknown }, ...{ [key: string]: unknown }[]];
  returning?: (ns: Namespace<Name, T>) => R;
};

export class InsertBuilder<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  #opts: InsertOpts<Name, T, R>;

  constructor(opts: InsertOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  get #tableName(): Name {
    return this.#opts.instance.constructor.tableName as Name;
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): InsertBuilder<Name, T, R2> {
    return new InsertBuilder({ ...this.#opts, returning: fn });
  }

  // Shape of RETURNING rows, for deserialization. Fresh alias per call; the
  // returned Any instances carry column refs that are never compiled, so
  // the ephemeral alias is harmless.
  get returningRowType(): R | undefined {
    if (!this.#opts.returning) { return undefined; }
    const tableName = this.#tableName;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;
    return this.#opts.returning(ns);
  }

  bind(): BoundSql {
    const tableName = this.#tableName;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;

    const columns = this.#opts.columnNames.map((k) => sql.ident(k));
    const rowSqls = this.#opts.rows.map((row) => {
      const vals = this.#opts.columnNames.map((k) => {
        const v = row[k];
        if (v === undefined) { return sql`DEFAULT`; }
        const col = this.#opts.instance[k as keyof T] as Any<any>;
        return col[meta].__class.from(v).toSql();
      });
      return sql`(${sql.join(vals)})`;
    });

    const returning = this.#opts.returning?.(ns);
    const inner = sql.join([
      sql`INSERT INTO ${sql.ident(tableName)} (${sql.join(columns)}) VALUES ${sql.join(rowSqls)}`,
      returning && sql`RETURNING ${compileSelectList(returning as { [key: string]: unknown })}`,
    ], sql` `);
    return sql.withScope([alias], inner);
  }

  debug(): this {
    const compiled = this.bind().compile("pg");
    console.log(compiled.text, compiled.values, this.#opts);
    return this;
  }

  // Internal: expose raw callbacks for live-event wrapping. Caller mints
  // its own Alias per CTE scope and evaluates callbacks against a
  // reAlias'd namespace.
  liveIntrospect() {
    return {
      tableName: this.#tableName,
      instance: this.#opts.instance,
      columnNames: this.#opts.columnNames,
      rows: this.#opts.rows,
      returning: this.#opts.returning,
    };
  }
}
