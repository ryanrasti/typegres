import type { Executor } from "../executor";
import { sql } from "./sql";
import { Bool } from "../types";
import type { RowType, RowTypeToTsType } from "./query";
import { combinePredicates, compileSelectList, deserializeRows } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type DeleteOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  executor: Executor;
  namespace: Namespace<Name, T>;
  where?: Bool<any>;
  returning?: R;
};

export class DeleteBuilder<Name extends string, T extends { [key: string]: any }, R extends RowType = {}> {
  #opts: DeleteOpts<Name, T, R>;

  constructor(opts: DeleteOpts<Name, T, R>) {
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

  compile() {
    if (!this.#opts.where) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }
    return sql.join([
      sql`DELETE FROM ${sql.ident(this.#opts.tableName)}`,
      sql`WHERE ${this.#opts.where.compile()}`,
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
