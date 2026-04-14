import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { Any } from "../types";
import { TsTypeOf } from "../types/runtime";
import { compileSelectList, deserializeRows, RowType, RowTypeToTsType } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type UpdateOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  executor: Executor;
  instance: T;
  namespace: Namespace<Name, T>;
  where?: () => Any<any>;
  set?: Sql;
  returning?: R;
};

export class UpdateBuilder<Name extends string, T extends Record<string, any>, R extends RowType = never> {
  #opts: UpdateOpts<Name, T, R>;

  constructor(opts: UpdateOpts<Name, T, R>) {
    this.#opts = opts;
  }

  where(fn: ((ns: Namespace<Name, T>) => Any<any>) | true): UpdateBuilder<Name, T, R> {
    return new UpdateBuilder({
      ...this.#opts,
      where: fn === true ? () => new Any(sql`TRUE`) : () => fn(this.#opts.namespace),
    });
  }

  set(fn: (ns: Namespace<Name, T>) => Partial<{ [K in keyof T]: TsTypeOf<T[K]> }>): UpdateBuilder<Name, T, R> {
    const setCols = fn(this.#opts.namespace);
    const clauses = Object.entries(setCols).map(([k, v]) => {
      const col = this.#opts.instance[k];
      if (!col?.__column) { throw new Error(`Unknown column: ${k}`); }
      return sql`${sql.ident(k)} = ${new (col.__class as any)(v).compile()}`;
    });
    return new UpdateBuilder({
      ...this.#opts,
      set: sql.join(clauses),
    });
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): UpdateBuilder<Name, T, R2> {
    return new UpdateBuilder({
      ...this.#opts,
      returning: fn(this.#opts.namespace),
    });
  }

  async execute(): Promise<[R] extends [never] ? void : RowTypeToTsType<R>[]> {
    if (!this.#opts.where) {
      throw new Error("update() requires .where() — use .where(true) to update all rows");
    }
    if (!this.#opts.set) {
      throw new Error("update() requires .set()");
    }
    const parts = [
      sql`UPDATE ${sql.ident(this.#opts.tableName)} SET ${this.#opts.set}`,
      sql`WHERE ${this.#opts.where().compile()}`,
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
