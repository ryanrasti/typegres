import { sql } from "kysely";
import { Any } from "../types";
import { RowLike } from "./values";
import { Context, SelectableExpression } from "../expression";
import { FromItem, Joins } from "./from-item";

export const Generated = Symbol("Generated");

// Like `TableReferenceExpression` but referencing a table directly (not an alias)
export class RawTableReferenceExpression extends SelectableExpression {
  constructor(
    public table: string,
    schema: RowLike,
  ) {
    super(schema);
  }

  compile(_ctx: Context) {
    return sql.ref(this.table);
  }
}

export type InstanceType<C> = C extends { new (...args: any[]): infer R }
  ? R extends Any
    ? R
    : never
  : never;

type DbSchema = {
  [key: string]: TableSchema;
};

export type TableSchema = {
  [key: string]: typeof Any<unknown, 0 | 1>;
};

export type TableSchemaToRowLike<T extends TableSchema> = {
  [key in keyof T]: InstanceType<T[key]>;
};

type Database<DB extends DbSchema> = {
  [t in keyof DB]: Table<TableSchemaToRowLike<DB[t]>>;
};

const table = (name: string, columns: TableSchema) => {
  const rowLike = Object.fromEntries(
    Object.entries(columns).map(([name, col]) => [name, col.new("")]),
  ) as RowLike;
  const fromExpr = new RawTableReferenceExpression(name, rowLike);
  return Table.of(rowLike).new(fromExpr, fromExpr.table);
};

export const database = <DB extends DbSchema>(schema: DB) => {
  return Object.fromEntries(
    Object.entries(schema).map(([name, columns]) => [
      name,
      table(name, columns),
    ]),
  ) as Database<DB>;
};

export class Table<
  R extends RowLike = RowLike,
  J extends Joins = Joins,
> extends FromItem<R, J> {}
