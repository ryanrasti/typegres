import { sql } from "kysely";
import { Any } from "../types";
import { aliasRowLike, RowLike, ScalarResult } from "./values";
import { Context, QueryAlias, SelectableExpression } from "../expression";
import { asFromItem, WithFromItem, FromItem } from "./from-item";
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

type Expand<T> = T extends object ? { [K in keyof T]: T[K] } : T;

type Database<DB extends DbSchema> = {
  [t in keyof DB]: ToTable<DB[t]>;
};

type ToTable<T extends TableSchema> = ReturnType<typeof table<T>>;

const table = <T extends TableSchema>(name: string, columns: T) => {
  const alias = new QueryAlias(name);
  const rowLike = aliasRowLike(
    alias,
    Object.fromEntries(
      Object.entries(columns).map(([column, type]) => [column, type.new("")]),
    ),
  );

  // Create a dynamically named class that represents a row
  // Instances of this class will be individual rows
  const RowClass = {
    [name]: class extends Row {
      static row = rowLike;
      static asFromItem() {
        return new FromItem(
          new RawTableReferenceExpression(name, rowLike),
          alias,
          {},
          new this(rowLike),
        );
      }
      override _getRow(): { [key: string]: Any<unknown, 0 | 1> } {
        return RowClass.row;
      }
    },
  }[name];

  return asFromItem(RowClass) as unknown as Table<
    Expand<TableSchemaToRowLike<T>>
  >;
};

export const database = <DB extends DbSchema>(schema: DB) => {
  return Object.fromEntries(
    Object.entries(schema).map(([name, columns]) => [
      name,
      table(name, columns),
    ]),
  ) as unknown as Database<DB>;
};

type AnyOrParsed<T extends { [key in string]: Any<unknown, 0 | 1> }> = Expand<{
  [key in keyof T]: ScalarResult<T[key]> | T[key];
}>;

export type Table<T extends { [key in string]: Any<unknown, 0 | 1> }> = {
  new (data: AnyOrParsed<T>): T & Row;
  asFromItem(): FromItem<T, {}>;
  extend<E2 extends RowLike>(): BaseTable<T, E2> & WithFromItem<E2, {}>;
} & WithFromItem<T, {}>;

// Table is the Row **class** type. We add typings here to allow a user
// to subclass it properly.
export type BaseTable<
  T extends { [key in string]: Any<unknown, 0 | 1> },
  E extends RowLike = T,
> = {
  new (data: AnyOrParsed<T>): T & Row;
  asFromItem(): FromItem<E, {}>;
  extend<E2 extends RowLike>(): BaseTable<T, E2> & WithFromItem<E2, {}>;
};

export class Row {
  constructor(data: { [key in string]: Any | unknown }) {
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (value instanceof Any) {
            return [key, value];
          } else {
            return [key, this._getRow()[key].getClass().new(value)];
          }
        }),
      ),
    );
  }
  static row: { [key: string]: Any<unknown, 0 | 1> } = {};
  _getRow(): { [k in string]: Any<unknown, 0 | 1> } {
    throw new Error("Should be overridden by the subclass");
  }

  static asFromItem<C extends typeof Row>(
    this: C,
  ): FromItem<C["prototype"], {}> {
    throw new Error("Should be overridden by the subclass");
  }

  static extend(this: typeof Row) {
    return this;
  }
}
