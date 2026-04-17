import { Sql, sql } from "./sql";
import type { CompileContext, TableAlias } from "./sql";
import { Bool } from "../types";
import type { RowType } from "./query";
import { combinePredicates, compileSelectList } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type DeleteOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  namespace: Namespace<Name, T>;
  tableAlias: TableAlias;
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
      where: combinePredicates(this.#opts.where, cond),
    });
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): DeleteBuilder<Name, T, R2> {
    return new DeleteBuilder({
      ...this.#opts,
      returning: fn(this.#opts.namespace),
    });
  }

  emit(ctx: CompileContext): string {
    if (!this.#opts.where) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }
    using _ = ctx.child();
    ctx.register(this.#opts.tableAlias, this.#opts.tableAlias.name);

    return sql.join([
      sql`DELETE FROM ${sql.ident(this.#opts.tableName)}`,
      sql`WHERE ${this.#opts.where.toSql()}`,
      this.#opts.returning && sql`RETURNING ${compileSelectList(this.#opts.returning as { [key: string]: unknown })}`,
    ], sql` `).emit(ctx);
  }

  debug(): this {
    const compiled = this.compile("pg");
    console.log(compiled.text, compiled.values, this.#opts);
    return this;
  }

  // Internal: expose structured parts for live-event wrapping.
  liveIntrospect() {
    return {
      tableName: this.#opts.tableName,
      where: this.#opts.where,
      returning: this.#opts.returning,
    };
  }
}
