import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { Any } from "../types";
import { aliasRowType, RowType, RowTypeToTsType } from "./query";

export class InsertBuilder<T extends Record<string, any>> {
  #tableName: string;
  #executor: Executor;
  #instance: T;
  #columnNames: string[];
  #rowSqls: Sql[] = [];

  constructor(tableName: string, executor: Executor, instance: T) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#instance = instance;
    this.#columnNames = Object.keys(instance).filter((k) => instance[k]?.__column);
  }

  values(...rows: Record<string, unknown>[]): InsertBuilder<T> {
    for (const row of rows) {
      const vals = this.#columnNames.map((k) => {
        const v = row[k];
        if (v === undefined) {
          return sql`DEFAULT`;
        }
        const col = this.#instance[k];
        return new (col.__class as any)(v).compile() as Sql;
      });
      this.#rowSqls.push(sql`(${sql.join(vals)})`);
    }
    return this;
  }

  returning<R extends RowType>(fn: (t: T) => R): InsertReturningBuilder<T, R> {
    const aliased = aliasRowType(this.#instance, this.#tableName) as T;
    const output = fn(aliased);
    const retCols = Object.entries(output).flatMap(([k, v]) =>
      v instanceof Any ? [sql`${v.compile()} as ${sql.ident(k)}`] : [],
    );
    return new InsertReturningBuilder(
      this.#tableName, this.#executor, this.#columnNames,
      this.#rowSqls, retCols, output as Record<string, Any<any>>,
    );
  }

  async execute(): Promise<void> {
    if (this.#rowSqls.length === 0) {
      throw new Error("insert() requires at least one row via .values()");
    }
    const columns = this.#columnNames.map((k) => sql.ident(k));
    const query = sql`INSERT INTO ${sql.ident(this.#tableName)} (${sql.join(columns)}) VALUES ${sql.join(this.#rowSqls)}`;
    await this.#executor.execute(query);
  }
}

class InsertReturningBuilder<T extends Record<string, any>, R extends RowType> {
  #tableName: string;
  #executor: Executor;
  #columnNames: string[];
  #rowSqls: Sql[];
  #retCols: Sql[];
  #output: Record<string, Any<any>>;

  constructor(
    tableName: string, executor: Executor, columnNames: string[],
    rowSqls: Sql[], retCols: Sql[], output: Record<string, Any<any>>,
  ) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#columnNames = columnNames;
    this.#rowSqls = rowSqls;
    this.#retCols = retCols;
    this.#output = output;
  }

  async execute(): Promise<RowTypeToTsType<R>[]> {
    const columns = this.#columnNames.map((k) => sql.ident(k));
    const query = sql`INSERT INTO ${sql.ident(this.#tableName)} (${sql.join(columns)}) VALUES ${sql.join(this.#rowSqls)} RETURNING ${sql.join(this.#retCols)}`;
    const result = await this.#executor.execute(query);
    return result.map((row: Record<string, string>) =>
      Object.fromEntries(
        Object.entries(row).map(([k, v]) => {
          const type = this.#output[k];
          if (!(type instanceof Any)) {
            throw new Error(`Expected ${k} to be an Any type`);
          }
          if (v === null || v === undefined) {
            return [k, null];
          }
          return [k, type.deserialize(String(v))];
        }),
      ),
    ) as RowTypeToTsType<R>[];
  }
}
