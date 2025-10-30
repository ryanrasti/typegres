import { RpcTarget } from "capnweb";
import { QueryAlias } from "../expression";
import { Any, RowLike, RowLikeStrict } from "../types";
import { FromItem, Joins, withFromItem, WithFromItem } from "./from-item";
import { aliasRowLike, AnyOrParsed, RawTableReferenceExpression } from "./values";

export type InstanceType<C> = C extends { new (...args: any[]): infer R } ? (R extends Any ? R : never) : never;

export type RowSchema = {
  [key: string]: typeof Any<unknown, 0 | 1>;
};

export type RowSchemaToRowLike<S extends RowSchema> = {
  [key in keyof S]: InstanceType<S[key]>;
};

export type TableSchema = {
  [key: string]: {
    type: typeof Any<unknown, 0 | 1>;
    required: boolean; // false = has default or is generated
  };
};

type Expand<T> = T extends object ? { [K in keyof T]: T[K] } : T;

export type TableSchemaToRowLike<T extends TableSchema> = Expand<{
  [key in keyof T]: InstanceType<T[key]["type"]>;
}>;

export type Table<R extends RowLikeStrict, S extends TableSchema = TableSchema, E extends RowLike = any> = {
  new (data: AnyOrParsed<R>): R & RowImpl<R>;
  extend<E2 extends object>(): Table<R, S, E & E2>;
  schema: S;
} & WithFromItem<R & E, {}>;

class RowImpl<R extends RowLikeStrict> extends RpcTarget {
  static schema: TableSchema;
  static asFromItem: <T extends typeof RowImpl>(this: T) => FromItem<T["prototype"], {}>;

  constructor(data: AnyOrParsed<R>) {
    super();
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (value instanceof Any) {
            return [key, value];
          } else {
            const schemaEntry = (this.constructor as typeof RowImpl).schema[key];
            return [key, schemaEntry.type.new(value)];
          }
        }),
      ),
    );
  }

  static extend() {
    return this;
  }
}

export const Table = <S extends TableSchema>(name: string, schema: S) => {
  const alias = new QueryAlias(name);
  const row = aliasRowLike(
    alias,
    Object.fromEntries(
      Object.entries(schema).map(([column, schemaEntry]) => {
        return [column, schemaEntry.type.new("")];
      }),
    ),
  );
  return View(new FromItem(new RawTableReferenceExpression(name, row), alias, {}, row)) as unknown as Table<
    TableSchemaToRowLike<S>,
    S,
    RowImpl<TableSchemaToRowLike<S>>
  >;
};

export const View = <R extends RowLikeStrict, J extends Joins>(fromItem: FromItem<R, J>) => {
  const name = fromItem.fromAlias.name;
  const ret = {
    [name]: class extends RowImpl<R> {
      static tableName = name;
      static schema = Object.fromEntries(
        Object.entries(fromItem.from)
          .filter(([_, value]) => value instanceof Any)
          .map(([key, value]) => [key, { type: value.constructor, required: true }]),
      ) as TableSchema;
      static asFromItem<T extends typeof RowImpl>(): FromItem<T["prototype"], {}> {
        return new FromItem(fromItem.rawFromExpr, fromItem.fromAlias, {}, new this(fromItem.from as AnyOrParsed<R>));
      }
    },
  }[name];
  return withFromItem(ret) as unknown as Table<R, {}, RowImpl<R>>;
};
