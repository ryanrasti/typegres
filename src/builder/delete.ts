import { Sql, BoundSql, sql } from "./sql";
import type { Alias } from "./sql";
import { Bool } from "../types";
import type { RowType } from "./query";
import { combineBoolPredicates, compileSelectList } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type DeleteOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  namespace: Namespace<Name, T>;
  alias: Alias;
  where?: Bool<any>;
  returning?: R;
};

export class DeleteBuilder<Name extends string, T extends { [key: string]: any }, R extends RowType = {}> extends Sql {
  #opts: DeleteOpts<Name, T, R>;

  get returningRowType(): R | undefined {
    return this.#opts.returning;
  }

  constructor(opts: DeleteOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  // Multiple where() calls are combined with AND
  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): DeleteBuilder<Name, T, R> {
    const cond = fn === true ? Bool.from(sql`TRUE`) : fn(this.#opts.namespace);
    return new DeleteBuilder({
      ...this.#opts,
      where: combineBoolPredicates(this.#opts.where, cond),
    });
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): DeleteBuilder<Name, T, R2> {
    return new DeleteBuilder({
      ...this.#opts,
      returning: fn(this.#opts.namespace),
    });
  }

  bind(): BoundSql {
    if (!this.#opts.where) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }

    const inner = sql.join([
      sql`DELETE FROM ${sql.ident(this.#opts.tableName)}`,
      sql`WHERE ${this.#opts.where.toSql()}`,
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
      alias: this.#opts.alias,
      where: this.#opts.where,
      returning: this.#opts.returning,
    };
  }
}
