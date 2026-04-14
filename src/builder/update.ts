import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { Bool } from "../types";
import { SetRow } from "../types/runtime";
import { compileSelectList, deserializeRows, RowType, RowTypeToTsType } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type UpdateOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  executor: Executor;
  instance: T;
  namespace: Namespace<Name, T>;
  where?: Bool<any>;
  set?: Sql;
  returning?: R;
};

export class UpdateBuilder<Name extends string, T extends Record<string, any>, R extends RowType = never> {
  #opts: UpdateOpts<Name, T, R>;

  constructor(opts: UpdateOpts<Name, T, R>) {
    this.#opts = opts;
  }

  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): UpdateBuilder<Name, T, R> {
    return new UpdateBuilder({
      ...this.#opts,
      where: fn === true ? new Bool(sql`TRUE`) : fn(this.#opts.namespace),
    });
  }

  set(fn: (ns: Namespace<Name, T>) => SetRow<T>): UpdateBuilder<Name, T, R> {
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

  compile(): Sql {
    if (!this.#opts.where) {
      throw new Error("update() requires .where() — use .where(true) to update all rows");
    }
    if (!this.#opts.set) {
      throw new Error("update() requires .set()");
    }
    return sql.join([
      sql`UPDATE ${sql.ident(this.#opts.tableName)} SET ${this.#opts.set}`,
      sql`WHERE ${this.#opts.where.compile()}`,
      this.#opts.returning && sql`RETURNING ${compileSelectList(this.#opts.returning as Record<string, unknown>)}`,
    ], sql` `);
  }

  debug(): this {
    const compiled = this.compile().compile("pg");
    console.log(compiled.text, compiled.values, this.#opts);
    return this;
  }

  async execute(): Promise<[R] extends [never] ? void : RowTypeToTsType<R>[]> {
    const result = await this.#opts.executor.execute(this.compile());
    if (this.#opts.returning) {
      return deserializeRows(result, this.#opts.returning as Record<string, unknown>) as any;
    }
    return undefined as any;
  }
}
