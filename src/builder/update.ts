import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { Any } from "../types";
import { TsTypeOf } from "../types/runtime";

export class UpdateBuilder<T extends Record<string, any>> {
  #tableName: string;
  #executor: Executor;
  #instance: T;
  #aliased: T;
  #whereCond?: Sql;
  #setClauses?: Sql;

  constructor(tableName: string, executor: Executor, instance: T, aliased: T) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#instance = instance;
    this.#aliased = aliased;
  }

  where(fn: ((t: T) => Any<any>) | true): UpdateBuilder<T> {
    if (fn === true) {
      this.#whereCond = sql`TRUE`;
    } else {
      this.#whereCond = fn(this.#aliased).compile();
    }
    return this;
  }

  set(fn: (t: T) => Partial<{ [K in keyof T]: TsTypeOf<T[K]> }>): UpdateBuilder<T> {
    const setCols = fn(this.#aliased);
    const clauses = Object.entries(setCols).map(([k, v]) => {
      const col = this.#instance[k];
      if (!col?.__column) { throw new Error(`Unknown column: ${k}`); }
      return sql`${sql.ident(k)} = ${new (col.__class as any)(v).compile()}`;
    });
    this.#setClauses = sql.join(clauses);
    return this;
  }

  async execute(): Promise<void> {
    if (!this.#whereCond) {
      throw new Error("update() requires .where() — use .where(true) to update all rows");
    }
    if (!this.#setClauses) {
      throw new Error("update() requires .set()");
    }
    const query = sql.join([
      sql`UPDATE ${sql.ident(this.#tableName)} SET ${this.#setClauses}`,
      sql`WHERE ${this.#whereCond}`,
    ], sql` `);
    await this.#executor.execute(query);
  }
}
