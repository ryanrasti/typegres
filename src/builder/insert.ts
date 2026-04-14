import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { Any } from "../types";
import { compileSelectList, deserializeRows, aliasRowType, RowType, RowTypeToTsType } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

export class InsertBuilder<Name extends string, T extends Record<string, any>> {
  #tableName: Name;
  #executor: Executor;
  #namespace: Namespace<Name, T>;
  #columnNames: string[];
  #rowSqls: Sql[];
  #returning?: { output: Record<string, unknown>; sql: Sql };

  constructor(tableName: Name, executor: Executor, instance: T, namespace: Namespace<Name, T>, rows: Record<string, unknown>[]) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#namespace = namespace;
    this.#columnNames = Object.keys(instance).filter((k) => instance[k]?.__column);
    this.#rowSqls = rows.map((row) => {
      const vals = this.#columnNames.map((k) => {
        const v = row[k];
        if (v === undefined) {
          return sql`DEFAULT`;
        }
        const col = instance[k];
        return new (col.__class as any)(v).compile() as Sql;
      });
      return sql`(${sql.join(vals)})`;
    });
  }

  returning<R extends RowType>(fn: (ns: Namespace<Name, T>) => R): InsertBuilder<Name, T> & { execute(): Promise<RowTypeToTsType<R>[]> } {
    const output = fn(this.#namespace);
    this.#returning = { output: output as Record<string, unknown>, sql: compileSelectList(output as Record<string, unknown>) };
    return this as any;
  }

  async execute(): Promise<void> {
    if (this.#rowSqls.length === 0) {
      throw new Error("insert() requires at least one row");
    }
    const columns = this.#columnNames.map((k) => sql.ident(k));
    const parts = [
      sql`INSERT INTO ${sql.ident(this.#tableName)} (${sql.join(columns)}) VALUES ${sql.join(this.#rowSqls)}`,
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
