import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { Any } from "../types";
import { compileSelectList, deserializeRows, RowType, RowTypeToTsType } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

export class DeleteBuilder<Name extends string, T extends Record<string, any>> {
  #tableName: Name;
  #executor: Executor;
  #namespace: Namespace<Name, T>;
  #whereCond?: Sql;
  #returning?: { output: Record<string, unknown>; sql: Sql };

  constructor(tableName: Name, executor: Executor, namespace: Namespace<Name, T>) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#namespace = namespace;
  }

  where(fn: ((ns: Namespace<Name, T>) => Any<any>) | true): DeleteBuilder<Name, T> {
    if (fn === true) {
      this.#whereCond = sql`TRUE`;
    } else {
      this.#whereCond = fn(this.#namespace).compile();
    }
    return this;
  }

  returning<R extends RowType>(fn: (ns: Namespace<Name, T>) => R): DeleteBuilder<Name, T> & { execute(): Promise<RowTypeToTsType<R>[]> } {
    const output = fn(this.#namespace);
    this.#returning = { output: output as Record<string, unknown>, sql: compileSelectList(output as Record<string, unknown>) };
    return this as any;
  }

  async execute(): Promise<void> {
    if (!this.#whereCond) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }
    const parts = [
      sql`DELETE FROM ${sql.ident(this.#tableName)}`,
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
