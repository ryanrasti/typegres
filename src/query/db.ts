import { Any, RowLikeStrict } from "../types";
import { aliasRowLike, AnyOrParsed, RawTableReferenceExpression, RowLike } from "./values";
import { QueryAlias } from "../expression";
import { FromItem, Joins, withFromItem, WithFromItem } from "./from-item";

export type InstanceType<C> = C extends { new (...args: any[]): infer R } ? (R extends Any ? R : never) : never;

export type TableSchema = {
  [key: string]: typeof Any<unknown, 0 | 1>;
};

export type TableSchemaToRowLike<T extends TableSchema> = {
  [key in keyof T]: InstanceType<T[key]>;
};

export type Table<R extends RowLikeStrict, E extends RowLike = any> = {
  new (data: AnyOrParsed<R>): R & RowImpl<R>;
  extend<E2 extends object>(): Table<R, E & E2>;
} & WithFromItem<R & E, {}>;

class RowImpl<R extends RowLikeStrict> {
  static schema: TableSchema;
  static asFromItem: <T extends typeof RowImpl>(this: T) => FromItem<T["prototype"], {}>;

  constructor(data: AnyOrParsed<R>) {
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (value instanceof Any) {
            return [key, value];
          } else {
            return [key, (this.constructor as typeof RowImpl).schema[key].new(value)];
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
    Object.fromEntries(Object.entries(schema).map(([column, type]) => [column, type.new("")])),
  );
  return View(new FromItem(new RawTableReferenceExpression(name, row), alias, {}, row)) as unknown as Table<
    TableSchemaToRowLike<S>,
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
          .map(([key, value]) => [key, value.constructor]),
      ) as TableSchema;
      static asFromItem<T extends typeof RowImpl>(): FromItem<T["prototype"], {}> {
        return new FromItem(fromItem.rawFromExpr, fromItem.fromAlias, {}, new this(fromItem.from as AnyOrParsed<R>));
      }
    },
  }[name];
  return withFromItem(ret) as unknown as Table<R, RowImpl<R>>;
};
