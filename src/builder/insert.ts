import { Sql, sql, Alias, compile } from "./sql";
import type { BoundSql } from "./sql";
import type { RowType, RowTypeToTsType } from "./query";
import { compileSelectList, reAlias } from "./query";
import type { TableBase } from "../table";
import type { Database } from "../database";
import { getColumn } from "../types/overrides/any";
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

  // Shape of RETURNING rows, for deserialization. The Any instances in
  // the output carry sql.unbound() as their SQL — harmless since rowType
  // is never compiled, only its [meta].__class is read for deserialize.
  rowType(): R | undefined {
    return this.#opts.returning?.({ [this.#tableName]: this.#opts.instance } as Namespace<Name, T>);
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
        const col = getColumn(this.#opts.instance, k);
        return col[meta].__class.from(v).toSql();
      });
      return sql`(${sql.join(vals)})`;
    });

    const returning = this.#opts.returning?.(ns);
    const inner = sql.join([
      sql`INSERT INTO ${sql.ident(tableName)} AS ${alias} (${sql.join(columns)}) VALUES ${sql.join(rowSqls)}`,
      returning && sql`RETURNING ${compileSelectList(returning as { [key: string]: unknown })}`,
    ], sql` `);
    return sql.withScope([alias], inner);
  }

  override async execute(db: Database): Promise<RowTypeToTsType<R>[]> {
    return db.execute(this);
  }

  async hydrate(db: Database): Promise<R[]> {
    return db.hydrate<any, any, R>(this);
  }

  debug(): this {
    const compiled = compile(this, "pg");
    console.log("Debugging query:", { sql: compiled.text, parameters: compiled.values });
    return this;
  }
}
