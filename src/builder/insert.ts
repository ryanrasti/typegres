import { Executor } from "../executor";
import { Sql, sql } from "./sql";
import { compileSelectList, deserializeRows, RowType, RowTypeToTsType } from "./query";

type Namespace<Name extends string, T> = { [K in Name]: T };

type InsertOpts<Name extends string, T, R extends RowType> = {
  tableName: Name;
  executor: Executor;
  namespace: Namespace<Name, T>;
  columnNames: string[];
  rowSqls: Sql[];
  returning?: R;
};

export class InsertBuilder<Name extends string, T extends Record<string, any>, R extends RowType = never> {
  #opts: InsertOpts<Name, T, R>;

  constructor(opts: InsertOpts<Name, T, R>) {
    this.#opts = opts;
  }

  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): InsertBuilder<Name, T, R2> {
    return new InsertBuilder({
      ...this.#opts,
      returning: fn(this.#opts.namespace),
    });
  }

  async execute(): Promise<[R] extends [never] ? void : RowTypeToTsType<R>[]> {
    if (this.#opts.rowSqls.length === 0) {
      throw new Error("insert() requires at least one row");
    }
    const columns = this.#opts.columnNames.map((k) => sql.ident(k));
    const parts = [
      sql`INSERT INTO ${sql.ident(this.#opts.tableName)} (${sql.join(columns)}) VALUES ${sql.join(this.#opts.rowSqls)}`,
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

// Build row SQL tuples from raw insert data and column descriptors
export const buildRowSqls = (rows: Record<string, unknown>[], columnNames: string[], instance: Record<string, any>): Sql[] => {
  return rows.map((row) => {
    const vals = columnNames.map((k) => {
      const v = row[k];
      if (v === undefined) {
        return sql`DEFAULT`;
      }
      const col = instance[k];
      return new (col.__class as any)(v).compile() as Sql;
    });
    return sql`(${sql.join(vals)})`;
  });
};
