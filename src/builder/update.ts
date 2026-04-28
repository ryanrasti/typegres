import { Sql, sql, Alias, compile } from "./sql";
import type { BoundSql } from "./sql";
import { Bool } from "../types";
import type { SetRow } from "../types/runtime";
import { meta } from "../types/runtime";
import type { RowType, RowTypeToTsType } from "./query";
import { combinePredicates, compileSelectList, reAlias } from "./query";
import type { TableBase } from "../table";
import type { Database } from "../database";
import { getColumn } from "../types/overrides/any";

type Namespace<Name extends string, T> = { [K in Name]: T };

type UpdateOpts<Name extends string, T extends TableBase, R extends RowType> = {
  instance: T;
  where?: (ns: Namespace<Name, T>) => Bool<any>;
  set?: (ns: Namespace<Name, T>) => SetRow<T>;
  returning?: (ns: Namespace<Name, T>) => R;
};

export class UpdateBuilder<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  #opts: UpdateOpts<Name, T, R>;

  constructor(opts: UpdateOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  get #tableName(): Name {
    return this.#opts.instance.constructor.tableName as Name;
  }

  // Multiple where() calls are combined with AND. .where(true) matches all rows.
  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): UpdateBuilder<Name, T, R> {
    const wrapped: (ns: Namespace<Name, T>) => Bool<any> =
      fn === true ? () => Bool.from(sql`TRUE`) as Bool<any> : fn;
    return new UpdateBuilder({
      ...this.#opts,
      where: combinePredicates(this.#opts.where, wrapped),
    });
  }

  set(fn: (ns: Namespace<Name, T>) => SetRow<T>): UpdateBuilder<Name, T, R> {
    return new UpdateBuilder({ ...this.#opts, set: fn });
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): UpdateBuilder<Name, T, R2> {
    return new UpdateBuilder({ ...this.#opts, returning: fn });
  }

  rowType(): R | undefined {
    return this.#opts.returning?.({ [this.#tableName]: this.#opts.instance } as Namespace<Name, T>);
  }

  bind(): BoundSql {
    if (!this.#opts.where) {
      throw new Error("update() requires .where() — use .where(true) to update all rows");
    }
    if (!this.#opts.set) {
      throw new Error("update() requires .set()");
    }

    const tableName = this.#tableName;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;

    const setRow = this.#opts.set(ns);
    const setClauses = Object.entries(setRow as { [key: string]: unknown }).map(([k, v]) => {
      const col = getColumn(this.#opts.instance, k);
      return sql`${sql.ident(k)} = ${col[meta].__class.from(v).toSql()}`;
    });

    const where = this.#opts.where(ns);
    const returning = this.#opts.returning?.(ns);
    const inner = sql.join([
      sql`UPDATE ${sql.ident(tableName)} AS ${alias} SET ${sql.join(setClauses)}`,
      sql`WHERE ${where.toSql()}`,
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
