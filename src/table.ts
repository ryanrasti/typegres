import { sql } from "./builder/sql";
import type { BoundSql, Sql } from "./builder/sql";
import type { Fromable} from "./builder/query";
import { QueryBuilder } from "./builder/query";
import { DeleteBuilder } from "./builder/delete";
import { UpdateBuilder } from "./builder/update";
import { InsertBuilder } from "./builder/insert";
import { isColumn } from "./types/overrides/any";
import type { InsertRow } from "./types/runtime";

// A per-op SQL rewrite hook. Tables opt in via the `transformer` option;
// each mutation builder runs its own slot at bind() time, replacing its
// default-finalized SQL with whatever the hook returns. Used by the live
// system to wrap mutations in event-emitting CTE chains.
export type QueryTransformer = {
  insert?: (builder: InsertBuilder<string, any>) => Sql;
  update?: (builder: UpdateBuilder<string, any>) => Sql;
  delete?: (builder: DeleteBuilder<string, any>) => Sql;
};

export type TableOptions = {
  transformer?: QueryTransformer;
};

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
  // Mutation builders on this table run this at bind() time and on each
  // raw result row before deserialization. Default none.
  static readonly transformer: QueryTransformer | undefined = undefined;
  // Per-scope tag carried by `Table.scope(ctx)`. Each `scope()` call
  // mints an anonymous subclass that overrides this static with the
  // supplied value; hydrated row instances read it through their
  // constructor (see `contextOf`). Stored as a *static* — instance
  // namespaces are reserved for columns, so a user table with a column
  // literally named "context" doesn't collide.
  static readonly context: unknown = undefined;

  // Narrow `instance.constructor` so `instance.constructor.tableName` /
  // `.tsAlias` / `.context` resolve without casts (TS defaults it to
  // `Function`). Subclass-narrowing isn't expressible here without
  // `typeof this` — callers that need the precise C of a row use the
  // static `Foo.contextOf(row)` form instead.
  declare ["constructor"]: typeof TableBase;

  static rowType<T extends typeof TableBase>(this: T): InstanceType<T> {
    return new (this as unknown as new () => InstanceType<T>)();
  }

  static bind(this: typeof TableBase): BoundSql {
    return sql.ident(this.tableName);
  }

  // Entry point for query builders: e.g., `Users.from()` 
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
    const instance = this.rowType();
    return new InsertBuilder({
      instance,
      columnNames: columnFieldNames(instance),
      rows: rows as [{ [key: string]: unknown }, ...{ [key: string]: unknown }[]],
    });
  }

  static update<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
  ): UpdateBuilder<T["tableName"], InstanceType<T>> {
    return new UpdateBuilder({ instance: this.rowType() });
  }

  static delete<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
  ): DeleteBuilder<T["tableName"], InstanceType<T>> {
    return new DeleteBuilder({ instance: this.rowType() });
  }

  // Return a subclass with a different tsAlias — use to join the same
  // table twice: `db.from(Users).join(Users.as("u2"), (ns) => ...)`.
  static as<T extends typeof TableBase, A extends string>(this: T, name: A) {
    return class extends (this as unknown as typeof TableBase) {
      static override readonly tsAlias = name;
    } as unknown as Omit<T, "tsAlias"> & { new (): InstanceType<T>; tsAlias: A };
  }

  // Return a query builder that carries `ctx` through every chain step
  // and onto each hydrated row instance (readable via `contextOf(row)`).
  // Implementation: mint an anonymous subclass that overrides the
  // `context` static, then call `from()` on it. Inherited tableName /
  // tsAlias / columns are unchanged — SQL output is identical to plain
  // `Table.from()`.
  //
  // `ctx`'s type is constrained to the class's declared `context` type
  // (set at `Table<Name, C>(...)` call site, propagated through
  // `Database<C>.Table`). Tables declared with the default `C =
  // undefined` accept anything via the `unknown` widening; tables that
  // pin a `C` reject mismatched scopes at compile time.
  static scope<T extends typeof TableBase & (new () => TableBase)>(
    this: T,
    ctx: T["context"],
  ) {
    const self = class extends (this as unknown as typeof TableBase) {
      static override readonly context = ctx;
    };
    return (self as unknown as T).from();
  }

  // Read the scope tag from a row instance via the calling class (the
  // class whose static is the source of truth). Called as
  // `Foo.contextOf(row)` — `this` resolves to `typeof Foo`, so the
  // return type is Foo's declared C (not `unknown`). Putting it on the
  // class side avoids the instance-namespace collision risk.
  static contextOf<T extends typeof TableBase>(this: T, row: InstanceType<T>): T["context"] {
    return (row.constructor as T).context;
  }
}

// Enumerate column field names on a Table instance. Columns are field
// initializers that hold an Any with an Unbound sentinel; isColumn
// filters out expressions and non-column fields.
export const columnFieldNames = (instance: TableBase): string[] => {
  return Object.getOwnPropertyNames(instance).filter(
    (k) => isColumn((instance as unknown as { [key: string]: unknown })[k]),
  );
};

// We can use a table class directly where a `Fromable` is expected. e.g., in the join:
//   Users.from().join(Dogs, ...)
TableBase satisfies Fromable;

// `C` is the per-app context (principal) type. Default `undefined`
// means "no scope expected" — `scope(ctx)` accepts anything via
// widening. Apps that thread a context type via `typegres<Principal>()`
// + `db.Table(name)` get tables whose `scope()` argument and
// `contextOf()` return type are pinned to `Principal`.
export const Table = <Name extends string, C = undefined>(name: Name, opts: TableOptions = {}) => {
  // Named class via computed-key shim — shows up as `name` in stack traces.
  const obj = {
    [name]: class extends TableBase {
      static override readonly tableName = name;
      static override readonly tsAlias = name;
      static override readonly transformer: QueryTransformer | undefined =
        opts.transformer;
      // Default value remains `undefined` until `scope()` overrides via
      // subclass; the type narrowing is purely compile-time.
      static override readonly context: C = undefined as C;
    },
  };
  type Obj = typeof obj;
  return obj[name] as NonNullable<Obj[Name]>;
};

export const isTableClass = (x: unknown): x is typeof TableBase => {
  return typeof x === "function" && x.prototype instanceof TableBase;
};
