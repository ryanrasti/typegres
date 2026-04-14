import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { Any } from "../types";
import { TsTypeOf } from "../types/runtime";
import { compileSelectList, deserializeRows, RowType, RowTypeToTsType } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

export class UpdateBuilder<Name extends string, T extends Record<string, any>> {
  #tableName: Name;
  #executor: Executor;
  #instance: T;
  #namespace: Namespace<Name, T>;
  #whereCond?: Sql;
  #setClauses?: Sql;
  #returning?: { output: Record<string, unknown>; sql: Sql };

  constructor(tableName: Name, executor: Executor, instance: T, namespace: Namespace<Name, T>) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#instance = instance;
    this.#namespace = namespace;
  }

  where(fn: ((ns: Namespace<Name, T>) => Any<any>) | true): UpdateBuilder<Name, T> {
    if (fn === true) {
      this.#whereCond = sql`TRUE`;
    } else {
      this.#whereCond = fn(this.#namespace).compile();
    }
    return this;
  }

  set(fn: (ns: Namespace<Name, T>) => Partial<{ [K in keyof T]: TsTypeOf<T[K]> }>): UpdateBuilder<Name, T> {
    const setCols = fn(this.#namespace);
    const clauses = Object.entries(setCols).map(([k, v]) => {
      const col = this.#instance[k];
      if (!col?.__column) { throw new Error(`Unknown column: ${k}`); }
      return sql`${sql.ident(k)} = ${new (col.__class as any)(v).compile()}`;
    });
    this.#setClauses = sql.join(clauses);
    return this;
  }

  returning<R extends RowType>(fn: (ns: Namespace<Name, T>) => R): UpdateBuilder<Name, T> & { execute(): Promise<RowTypeToTsType<R>[]> } {
    const output = fn(this.#namespace);
    this.#returning = { output: output as Record<string, unknown>, sql: compileSelectList(output as Record<string, unknown>) };
    return this as any;
  }

  async execute(): Promise<void> {
    if (!this.#whereCond) {
      throw new Error("update() requires .where() — use .where(true) to update all rows");
    }
    if (!this.#setClauses) {
      throw new Error("update() requires .set()");
    }
    const parts = [
      sql`UPDATE ${sql.ident(this.#tableName)} SET ${this.#setClauses}`,
      sql`WHERE ${this.#whereCond}`,
    ];
    if (this.#returning) {
      parts.push(sql`RETURNING ${this.#returning.sql}`);
    }
    const result = await this.#executor.execute(sql.join(parts, sql` `));
    if (this.#returning) {
      return deserializeRows(result, this.#returning.output) as any;
    }
  }
}
