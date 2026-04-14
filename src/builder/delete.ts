import { Executor } from "../executor";
import { sql } from "./sql";
import { Any, Bool } from "../types";
import { compileSelectList, deserializeRows, RowType, RowTypeToTsType } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type DeleteOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  executor: Executor;
  namespace: Namespace<Name, T>;
  where?: Bool<any>;
  returning?: R;
};

export class DeleteBuilder<Name extends string, T extends Record<string, any>, R extends RowType = never> {
  #opts: DeleteOpts<Name, T, R>;

  constructor(opts: DeleteOpts<Name, T, R>) {
    this.#opts = opts;
  }

  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): DeleteBuilder<Name, T, R> {
    return new DeleteBuilder({
      ...this.#opts,
      where: fn === true ? new Bool(sql`TRUE`) : fn(this.#opts.namespace),
    });
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): DeleteBuilder<Name, T, R2> {
    return new DeleteBuilder({
      ...this.#opts,
      returning: fn(this.#opts.namespace),
    });
  }

  async execute(): Promise<[R] extends [never] ? void : RowTypeToTsType<R>[]> {
    if (!this.#opts.where) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }
    const parts = [
      sql`DELETE FROM ${sql.ident(this.#opts.tableName)}`,
      sql`WHERE ${this.#opts.where.compile()}`,
    ];
    if (this.#opts.returning) {
      parts.push(sql`RETURNING ${compileSelectList(this.#opts.returning as Record<string, unknown>)}`);
    }
    const result = await this.#opts.executor.execute(sql.join(parts, sql` `));
    if (this.#opts.returning) {
      return deserializeRows(result, this.#opts.returning as Record<string, unknown>) as any;
    }
    return undefined as any;
  }
}
