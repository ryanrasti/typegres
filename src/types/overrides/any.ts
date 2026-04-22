import { Any as Generated } from "../generated/any";
import { getTypeDef } from "../deserialize";
import { meta } from "../runtime";
import type { NullOf } from "../runtime";
import { sql, Sql, Unbound } from "../../builder/sql";
import * as types from "../index";

type ColumnOpts = { nonNull?: boolean; default?: Sql; generated?: boolean };

export class Any<in out N extends number> extends Generated<N> {
  // [meta] is an internal bag keyed by a symbol so it doesn't clutter
  // autocomplete. __class is runtime-set (see from()); __raw holds the
  // underlying Sql node for this expression; __nullability is a phantom
  // that makes N structurally visible so TS distinguishes e.g. Text<0>
  // from Text<0|1>.
  declare [meta]: {
    __class: typeof Any;
    __raw: Sql;
    __nullability: N;
  };
  // __typname: the pg type name as a SQL fragment (for use in templates
  // like `CAST(x AS int4)`). __typnameText: the same name as a plain
  // string (for map lookups, error messages). Codegen emits both.
  static __typname: Sql = sql`any`;
  static __typnameText = "any";

  deserialize(raw: string): unknown {
    return getTypeDef((this.constructor as typeof Any).__typnameText).deserialize(raw);
  }

  // Returns the underlying Sql node for embedding in other expressions
  toSql(): Sql {
    return this[meta].__raw;
  }

  isNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NULL)`) as types.Bool<1>;
  }

  isNotNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NOT NULL)`) as types.Bool<1>;
  }

  // CAST this expression to another pg type, preserving nullability. A
  // non-null source (N=1) casts to the target's __nonNullable variant;
  // anything else casts to __nullable.
  cast<T extends typeof Any>(
    cls: T,
  ): [N] extends [1]
    ? (InstanceType<T> extends { [meta]: { __nonNullable: infer U } } ? U : InstanceType<T>)
    : (InstanceType<T> extends { [meta]: { __nullable: infer U } } ? U : InstanceType<T>) {
    return cls.from(sql`CAST(${this.toSql()} AS ${cls.__typname})`) as any;
  }

  // COALESCE(this, rhs) — returns first non-null. Chainable.
  // rhs must be same concrete type (via [meta].__any). If rhs is non-null, returns __nonNullable.
  coalesce<T extends Any<any>, R extends (T extends { [meta]: { __any: infer A } } ? A : Any<any>)>(
    this: T,
    rhs: R,
  ): 0 extends NullOf<R>
    ? T  // rhs can be null → preserve T (still nullable)
    : (T extends { [meta]: { __nonNullable: infer U } } ? U : T) {  // rhs is non-null → __nonNullable
    return ((this as any)[meta].__class as typeof Any).from(sql`COALESCE(${this.toSql()}, ${rhs.toSql()})`) as any;
  }

  // Public constructor alternative with precise nullability.
  // Sql → nullable (0|1), primitive → non-null (1).
  static from<T extends typeof Any>(this: T, v: Sql): InstanceType<T> extends { [meta]: { __nullable: infer U } } ? U : InstanceType<T>;
  static from<T extends typeof Any>(this: T, v: unknown): InstanceType<T> extends { [meta]: { __nonNullable: infer U } } ? U : InstanceType<T>;
  static from(v: Sql | unknown): any {
    const instance = new this();
    const __raw = v instanceof Sql
      ? v
      : sql`CAST(${sql.param(v)} AS ${this.__typname})`;
    // Set [meta] at runtime — subclasses' `declare [meta]` narrows the type only
    Object.defineProperty(instance, meta, {
      value: { __class: this, __raw },
      enumerable: false,
    });
    return instance;
  }

  // Internal: validate and wrap a TS value into a typed instance.
  // Used by match() for runtime overload dispatch.
  static serialize(v: unknown): Any<any> {
    if (v instanceof this) { return v; }
    const expected = getTypeDef(this.__typnameText).tsType;
    if (typeof v === expected) { return this.from(v); }
    throw new Error(
      `${this.__typnameText}.serialize: expected a ${this.__typnameText} instance or ${expected} primitive, got ${typeof v} (${String(v).slice(0, 60)}).`,
    );
  }

  // Column declaration for Table definitions. The field name doubles as
  // the pg column name:
  //
  //   class Users extends Table("users") {
  //     id = Int8.column({ nonNull: true });
  //   }
  //
  // Underlying Sql is sql.unbound() — a sentinel that throws if emitted.
  // The query builder calls reAlias() on the row shape before compiling,
  // swapping each column's unbound SQL for a real `Column(alias, key)`
  // against a freshly-minted scope alias.
  //
  // __required is a type-level brand used by InsertRow to distinguish
  // required vs optional columns.
  static column<
    T extends typeof Any<any>,
    Opts extends ColumnOpts = {},
  >(
    this: T,
    _opts?: Opts,
  ): InstanceType<T> & {
    [meta]: {
      __required: Opts extends { nonNull: true }
        ? Opts extends { default: any } | { generated: true } ? false : true
        : false;
    };
  } {
    return this.from(sql.unbound()) as any;
  }
}

// True iff `v` is an Any whose underlying SQL is the sql.unbound() sentinel
// — i.e., it was declared via `.column()` on a Table class, not built as
// an arbitrary expression.
export const isColumn = (v: unknown): v is Any<any> =>
  v instanceof Any && v[meta].__raw instanceof Unbound;

// Look up a column by name on a Table instance. Throws with a specific
// message when the field is missing or is an expression rather than a
// column declaration. Used by mutation builders and live wrappers.
export const getColumn = (
  instance: { constructor: { tableName: string } },
  name: string,
): Any<any> => {
  const col = (instance as { [k: string]: unknown })[name];
  const tableName = instance.constructor.tableName;
  if (!(col instanceof Any)) {
    throw new Error(
      `No column '${name}' on table '${tableName}'. ` +
      `Declare it as a field: \`${name} = Type.column(...)\`.`,
    );
  }
  if (!(col[meta].__raw instanceof Unbound)) {
    throw new Error(
      `Field '${name}' on table '${tableName}' is an expression, not a column. ` +
      `Only fields declared via \`Type.column(...)\` can be targeted by mutations.`,
    );
  }
  return col;
};
