import { sql, Alias } from "./builder/sql";
import type { CompileContext } from "./builder/sql";
import type { Fromable} from "./builder/query";
import { QueryBuilder } from "./builder/query";
import { DeleteBuilder } from "./builder/delete";
import { UpdateBuilder } from "./builder/update";
import { InsertBuilder } from "./builder/insert";
import { Any } from "./types";
import type { InsertRow } from "./types/runtime";

// Concrete tables extend `Table(name)` and declare columns as getters:
//
//   class Users extends Table("users") {
//     get id()   { return Int8.column(this, "id", { nonNull: true }); }
//     get name() { return Text.column(this, "name"); }
//   }
//
// `this` is the instance; Any.column reads the class's static alias from
// `this.constructor.alias` so you don't have to spell it out.
//
// The *class* implements Fromable (statics: alias, rowType, emit). Instances
// only appear inside namespace callbacks, where their column getters read
// `this.alias` (which forwards to the static) — one column identity per
// class, regardless of how many instances float around.
//
// For joining the same table twice: `Users.as("u2")` returns a fresh
// subclass with its own static alias.
export abstract class TableBase {
  static readonly tableName: string;
  static readonly alias: Alias;

  // Fresh row-type instance per call — callers don't hold onto these;
  // they're just vessels for the column getters. Method form so the return
  // type can thread the subclass generic (`Users.rowType()` → Users).
  static rowType<T extends typeof TableBase>(this: T): InstanceType<T> {
    return new (this as unknown as new () => InstanceType<T>)();
  }

  // Emit as a FROM-clause fragment. Registers the class's alias once per
  // compile scope (double-register throws — use .as() for repeated tables).
  static emit(this: typeof TableBase, ctx: CompileContext): string {
    const resolved = ctx.register(this.alias);
    return resolved === this.tableName
      ? sql.ident(this.tableName).emit(ctx)
      : `${sql.ident(this.tableName).emit(ctx)} AS ${sql.ident(resolved).emit(ctx)}`;
  }

  // Entry points. Static — you call `Users.from()`, not `(new Users()).from()`.
  static from<T extends typeof TableBase & (new () => TableBase)>(this: T) {
    return new QueryBuilder<
      { [K in T["alias"]["tsAlias"]]: InstanceType<T> },
      InstanceType<T>,
      []
    >({
      namespace: { [this.alias.tsAlias]: this.rowType() } as any,
      output: this.rowType() as any,
      from: this as any,
      tsAlias: this.alias.tsAlias,
    });
  }

  static insert<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
    ...rows: [InsertRow<InstanceType<T>>, ...InsertRow<InstanceType<T>>[]]
  ): InsertBuilder<T["tableName"], InstanceType<T>> {
    const instance = this.rowType() as InstanceType<T>;
    const ns = { [this.alias.tsAlias]: instance } as { [K in T["tableName"]]: InstanceType<T> };
    return new InsertBuilder({
      tableName: this.tableName as T["tableName"],
      instance,
      namespace: ns,
      columnNames: columnGetterNames(instance),
      rows: rows as { [key: string]: unknown }[],
      alias: this.alias,
    });
  }

  static update<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
  ): UpdateBuilder<T["tableName"], InstanceType<T>> {
    const instance = this.rowType() as InstanceType<T>;
    const ns = { [this.alias.tsAlias]: instance } as { [K in T["tableName"]]: InstanceType<T> };
    return new UpdateBuilder({
      tableName: this.tableName as T["tableName"],
      instance,
      namespace: ns,
      alias: this.alias,
    });
  }

  static delete<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
  ): DeleteBuilder<T["tableName"], InstanceType<T>> {
    const instance = this.rowType() as InstanceType<T>;
    const ns = { [this.alias.tsAlias]: instance } as { [K in T["tableName"]]: InstanceType<T> };
    return new DeleteBuilder({
      tableName: this.tableName as T["tableName"],
      namespace: ns,
      alias: this.alias,
    });
  }

  // Return a subclass with a different alias — use to join the same table
  // twice: `db.From(Users).join(Users.as("u2"), (ns) => ...)`.
  static as<T extends typeof TableBase, A extends string>(this: T, name: A) {
    const newAlias = new Alias(name);
    return class extends (this as unknown as typeof TableBase) {
      static override readonly alias = newAlias;
    } as unknown as Omit<T, "alias"> & { new (): InstanceType<T>; alias: Alias<A> };
  }
}

// Enumerate column getters on a Table instance. Walks the prototype chain,
// filters to getters whose values are Any.
export const columnGetterNames = (instance: TableBase): string[] => {
  const names = new Set<string>();
  for (
    let proto = Object.getPrototypeOf(instance);
    proto && proto !== Object.prototype;
    proto = Object.getPrototypeOf(proto)
  ) {
    for (const k of Object.getOwnPropertyNames(proto)) {
      const desc = Object.getOwnPropertyDescriptor(proto, k);
      if (desc?.get && (instance as { [key: string]: unknown })[k] instanceof Any) {
        names.add(k);
      }
    }
  }
  return [...names];
};

TableBase satisfies Fromable;

export const Table = <Name extends string>(name: Name) => {
  const alias = new Alias(name);
  // Named class via computed-key shim — shows up as `name` in stack traces.
  const obj = {
    [name]: class extends TableBase {
      static override readonly tableName = name;
      static override readonly alias = alias;
    },
  };
  type Obj = typeof obj;
  return obj[name] as NonNullable<Obj[Name]>;
};
