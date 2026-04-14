import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { Any } from "../types";

export class DeleteBuilder<T extends Record<string, any>> {
  #tableName: string;
  #executor: Executor;
  #aliased: T;
  #whereCond?: Sql;

  constructor(tableName: string, executor: Executor, aliased: T) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#aliased = aliased;
  }

  where(fn: ((t: T) => Any<any>) | true): DeleteBuilder<T> {
    if (fn === true) {
      this.#whereCond = sql`TRUE`;
    } else {
      this.#whereCond = fn(this.#aliased).compile();
    }
    return this;
  }

  async execute(): Promise<void> {
    if (!this.#whereCond) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }
    const query = sql.join([
      sql`DELETE FROM ${sql.ident(this.#tableName)}`,
      sql`WHERE ${this.#whereCond}`,
    ], sql` `);
    await this.#executor.execute(query);
  }
}
