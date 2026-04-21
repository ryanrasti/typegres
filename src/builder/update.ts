import { Sql, sql, Alias } from "./sql";
import type { BoundSql } from "./sql";
import { Any, Bool } from "../types";
import type { SetRow } from "../types/runtime";
import { meta } from "../types/runtime";
import type { RowType } from "./query";
import { combinePredicates, compileSelectList, reAlias } from "./query";
import type { TableBase } from "../table";

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

  get returningRowType(): R | undefined {
    if (!this.#opts.returning) { return undefined; }
    const tableName = this.#tableName;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;
    return this.#opts.returning(ns);
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
      const col = this.#opts.instance[k as keyof T];
      if (!(col instanceof Any)) {
        throw new Error(
          `update().set({${k}: ...}) on "${tableName}" — no column '${k}' on the table class. ` +
          `Declare it as a column field (\`${k} = Type.column(...)\`).`,
        );
      }
      return sql`${sql.ident(k)} = ${(col as Any<any>)[meta].__class.from(v).toSql()}`;
    });

    const where = this.#opts.where(ns);
    const returning = this.#opts.returning?.(ns);
    const inner = sql.join([
      sql`UPDATE ${sql.ident(tableName)} SET ${sql.join(setClauses)}`,
      sql`WHERE ${where.toSql()}`,
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
  // its own Alias per CTE scope and evaluates the callbacks against a
  // reAlias'd namespace.
  liveIntrospect() {
    return {
      tableName: this.#tableName,
      instance: this.#opts.instance,
      where: this.#opts.where,
      set: this.#opts.set,
      returning: this.#opts.returning,
    };
  }
}
