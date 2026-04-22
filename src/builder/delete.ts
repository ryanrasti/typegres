import { Sql, sql, Alias, compile } from "./sql";
import type { BoundSql } from "./sql";
import { Bool } from "../types";
import type { RowType, RowTypeToTsType } from "./query";
import { combinePredicates, compileSelectList, reAlias } from "./query";
import type { TableBase } from "../table";
import type { Database } from "../database";

type Namespace<Name extends string, T> = { [K in Name]: T };

type DeleteOpts<Name extends string, T extends TableBase, R extends RowType> = {
  instance: T;
  where?: (ns: Namespace<Name, T>) => Bool<any>;
  returning?: (ns: Namespace<Name, T>) => R;
};

export class DeleteBuilder<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  #opts: DeleteOpts<Name, T, R>;

  constructor(opts: DeleteOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  get #tableName(): Name {
    return this.#opts.instance.constructor.tableName as Name;
  }

  // Multiple where() calls are combined with AND. .where(true) matches all rows.
  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): DeleteBuilder<Name, T, R> {
    const wrapped: (ns: Namespace<Name, T>) => Bool<any> =
      fn === true ? () => Bool.from(sql`TRUE`) as Bool<any> : fn;
    return new DeleteBuilder({
      ...this.#opts,
      where: combinePredicates(this.#opts.where, wrapped),
    });
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): DeleteBuilder<Name, T, R2> {
    return new DeleteBuilder({ ...this.#opts, returning: fn });
  }

  rowType(): R | undefined {
    return this.#opts.returning?.({ [this.#tableName]: this.#opts.instance } as Namespace<Name, T>);
  }

  bind(): BoundSql {
    if (!this.#opts.where) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }

    const tableName = this.#tableName;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;

    const where = this.#opts.where(ns);
    const returning = this.#opts.returning?.(ns);
    const inner = sql.join([
      sql`DELETE FROM ${sql.ident(tableName)} AS ${alias}`,
      sql`WHERE ${where.toSql()}`,
      returning && sql`RETURNING ${compileSelectList(returning as { [key: string]: unknown })}`,
    ], sql` `);
    return sql.withScope([alias], inner);
  }

  override async execute(db: Database): Promise<RowTypeToTsType<R>[]> {
    return db.execute<R>(this);
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
