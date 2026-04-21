import { sql } from "./builder/sql";
import type { BoundSql } from "./builder/sql";
import type { Fromable} from "./builder/query";
import { QueryBuilder } from "./builder/query";
import { DeleteBuilder } from "./builder/delete";
import { UpdateBuilder } from "./builder/update";
import { InsertBuilder } from "./builder/insert";
import { Any } from "./types";
import type { InsertRow } from "./types/runtime";

// Concrete tables extend `Table(name)` and declare columns as field
// initializers:
//
//   class Users extends Table("users") {
//     id   = Int8.column({ nonNull: true });
//     name = Text.column();
//   }
//
// Column fields store `sql.unbound()` as their underlying SQL. No Alias
// is attached to the class or the instance. Query/mutation builders mint
// a fresh Alias at bind() time and call reAlias() on the row shape,
// replacing each column's unbound SQL with a real `Column(alias, key)`.
//
// For joining the same table twice: `Users.as("u2")` returns a fresh
// subclass whose `tsAlias` is "u2".
export abstract class TableBase {
  static readonly tableName: string;
  static readonly tsAlias: string;

  // Narrow `instance.constructor` so `instance.constructor.tableName` /
  // `.tsAlias` resolve without casts (TS defaults it to `Function`).
  declare ["constructor"]: typeof TableBase;

  // Fresh row-type instance per call — callers don't hold onto these;
  // they're just vessels for column references. Method form so the return
  // type can thread the subclass generic (`Users.rowType()` → Users).
  static rowType<T extends typeof TableBase>(this: T): InstanceType<T> {
    return new (this as unknown as new () => InstanceType<T>)();
  }

  // FROM-clause source fragment: just the table identifier. QB adds
  // `AS <alias>` in its own bind(), so no AS-clause here.
  static bind(this: typeof TableBase): BoundSql {
    return sql.ident(this.tableName);
  }

  // Entry points. Static — you call `Users.from()`, not `(new Users()).from()`.
  static from<T extends typeof TableBase & (new () => TableBase)>(this: T) {
    return new QueryBuilder<
      { [K in T["tsAlias"]]: InstanceType<T> },
      InstanceType<T>,
      []
    >({
      tsAlias: this.tsAlias,
      tables: [{ type: "from", source: this as unknown as Fromable }],
    });
  }

  static insert<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
    ...rows: [InsertRow<InstanceType<T>>, ...InsertRow<InstanceType<T>>[]]
  ): InsertBuilder<T["tableName"], InstanceType<T>> {
    const instance = this.rowType() as InstanceType<T>;
    return new InsertBuilder({
      instance,
      columnNames: columnFieldNames(instance),
      rows: rows as [{ [key: string]: unknown }, ...{ [key: string]: unknown }[]],
    });
  }

  static update<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
  ): UpdateBuilder<T["tableName"], InstanceType<T>> {
    return new UpdateBuilder({ instance: this.rowType() as InstanceType<T> });
  }

  static delete<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
  ): DeleteBuilder<T["tableName"], InstanceType<T>> {
    return new DeleteBuilder({ instance: this.rowType() as InstanceType<T> });
  }

  // Return a subclass with a different tsAlias — use to join the same
  // table twice: `db.From(Users).join(Users.as("u2"), (ns) => ...)`.
  static as<T extends typeof TableBase, A extends string>(this: T, name: A) {
    return class extends (this as unknown as typeof TableBase) {
      static override readonly tsAlias = name;
    } as unknown as Omit<T, "tsAlias"> & { new (): InstanceType<T>; tsAlias: A };
  }
}

// Enumerate column field names on a Table instance. Columns are field
// initializers, so they're own enumerable properties.
export const columnFieldNames = (instance: TableBase): string[] => {
  return Object.getOwnPropertyNames(instance).filter(
    (k) => (instance as unknown as { [key: string]: unknown })[k] instanceof Any,
  );
};

TableBase satisfies Fromable;

export const Table = <Name extends string>(name: Name) => {
  // Named class via computed-key shim — shows up as `name` in stack traces.
  const obj = {
    [name]: class extends TableBase {
      static override readonly tableName = name;
      static override readonly tsAlias = name;
    },
  };
  type Obj = typeof obj;
  return obj[name] as NonNullable<Obj[Name]>;
};
