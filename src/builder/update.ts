import type { Executor } from "../executor";
import { Sql, sql } from "./sql";
import type { CompileContext, TableAlias } from "./sql";
import { Bool } from "../types";
import type { SetRow } from "../types/runtime";
import type { RowType, RowTypeToTsType } from "./query";
import { combinePredicates, compileSelectList, deserializeRows } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type UpdateOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  executor: Executor;
  instance: T;
  namespace: Namespace<Name, T>;
  tableAlias: TableAlias;
  where?: Bool<any>;
  set?: { [key: string]: unknown };
  returning?: R;
};

export class UpdateBuilder<Name extends string, T extends { [key: string]: any }, R extends RowType = {}> extends Sql {
  #opts: UpdateOpts<Name, T, R>;

  constructor(opts: UpdateOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  // Multiple where() calls are combined with AND
  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): UpdateBuilder<Name, T, R> {
    const cond = fn === true ? Bool.from(sql`TRUE`) : fn(this.#opts.namespace);
    return new UpdateBuilder({
      ...this.#opts,
      where: combinePredicates(this.#opts.where, cond),
    });
  }

  set(fn: (ns: Namespace<Name, T>) => SetRow<T>): UpdateBuilder<Name, T, R> {
    return new UpdateBuilder({
      ...this.#opts,
      set: fn(this.#opts.namespace) as { [key: string]: unknown },
    });
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): UpdateBuilder<Name, T, R2> {
    return new UpdateBuilder({
      ...this.#opts,
      returning: fn(this.#opts.namespace),
    });
  }

  emit(ctx: CompileContext): string {
    if (!this.#opts.where) {
      throw new Error("update() requires .where() — use .where(true) to update all rows");
    }
    if (!this.#opts.set) {
      throw new Error("update() requires .set()");
    }

    using _ = ctx.child();
    ctx.register(this.#opts.tableAlias, this.#opts.tableAlias.name);

    const setClauses = Object.entries(this.#opts.set).map(([k, v]) => {
      const col = this.#opts.instance[k];
      if (!col?.__column) { throw new Error(`Unknown column: ${k}`); }
      return sql`${sql.ident(k)} = ${col.__class.from(v).toSql()}`;
    });

    return sql.join([
      sql`UPDATE ${sql.ident(this.#opts.tableName)} SET ${sql.join(setClauses)}`,
      sql`WHERE ${this.#opts.where.toSql()}`,
      this.#opts.returning && sql`RETURNING ${compileSelectList(this.#opts.returning as { [key: string]: unknown })}`,
    ], sql` `).emit(ctx);
  }

  debug(): this {
    const compiled = this.compile("pg");
    console.log(compiled.text, compiled.values, this.#opts);
    return this;
  }

  async execute(): Promise<RowTypeToTsType<R>[]> {
    const result = await this.#opts.executor.execute(this);
    if (this.#opts.returning) {
      return deserializeRows(result, this.#opts.returning as { [key: string]: unknown }) as any;
    }
    return [] as any;
  }
}
