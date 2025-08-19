import { Any, RowLikeStrict } from "../types";
import {
  aliasRowLike,
  RawTableReferenceExpression,
  RowLike,
  ScalarResult,
} from "./values";
import { QueryAlias } from "../expression";
import { FromItem, withFromItem, WithFromItem } from "./from-item";

export type InstanceType<C> = C extends { new (...args: any[]): infer R }
  ? R extends Any
    ? R
    : never
  : never;

export type TableSchema = {
  [key: string]: typeof Any<unknown, 0 | 1>;
};

export type TableSchemaToRowLike<T extends TableSchema> = {
  [key in keyof T]: InstanceType<T[key]>;
};

export type Table<R extends RowLikeStrict, E extends RowLike = any> = {
  new (data: AnyOrParsed<R>): R & RowImpl<R>;
  extend<E2 extends object>(): Table<R, E2>;
} & WithFromItem<R & E, {}>;

type Expand<T> = T extends object ? { [K in keyof T]: T[K] } : T;
type AnyOrParsed<T extends RowLikeStrict> = Expand<{
  [key in keyof T]: ScalarResult<T[key]> | T[key];
}>;

class RowImpl<R extends RowLikeStrict> {
  static tableName: string;
  static schema: TableSchema;

  constructor(data: AnyOrParsed<R>) {
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (value instanceof Any) {
            return [key, value];
          } else {
            return [
              key,
              (this.constructor as typeof RowImpl).schema[key].new(value),
            ];
          }
        }),
      ),
    );
  }

  static asFromItem<T extends typeof RowImpl>(
    this: T,
  ): FromItem<T["prototype"], {}> {
    const alias = new QueryAlias(this.tableName);
    const row = aliasRowLike(
      alias,
      Object.fromEntries(
        Object.entries(this.schema).map(([column, type]) => [
          column,
          type.new(""),
        ]),
      ),
    );
    return new FromItem(
      new RawTableReferenceExpression(this.tableName, row),
      alias,
      {},
      new this(row),
    );
  }

  static extend() {
    return this;
  }
}

export const Table = <S extends TableSchema>(name: string, schema: S) => {
  const ret = {
    [name]: class extends RowImpl<TableSchemaToRowLike<S>> {
      static tableName = name;
      static schema = schema;
    },
  }[name];
  return withFromItem(ret) as unknown as Table<
    TableSchemaToRowLike<S>,
    RowImpl<TableSchemaToRowLike<S>> & TableSchemaToRowLike<S>
  >;
};
