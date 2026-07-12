// Dialect-agnostic base class for typed SQL expressions.
//
// Every typegres value — PG's Int4, SQLite's Integer (future), either
// dialect's Bool, etc. — descends from SqlValue. Behavior that doesn't
// depend on the dialect (cast, coalesce, from, serialize, column,
// deserialize, toSql, [meta]) lives here.
//
// Methods that return a Bool (isNull, isNotNull, in) stay on each
// dialect's root class (`Any` for PG). Reason: the shared Bool
// interface has and/or/not with `Bool<any> | boolean` args; each
// dialect's concrete Bool has narrower args (its own class), which
// makes the shared vs concrete return types contravariantly
// incompatible. Duplicating three method bodies per dialect is cheaper
// than plumbing a workaround; the shared surface stays clean.
//
// SqlValue is *sibling* to Sql, not a subclass. Typegres values expose
// `.toSql()` and are duck-type-spliced into sql`...` templates (see
// builder/sql.ts template handler). Keeping SqlValue outside the Sql
// hierarchy avoids inheriting Sql's abstract `bind()` down the whole
// concrete-type chain.
import { Cast, Column, Param, sql, Sql, TypedParam, Unbound } from "../builder/sql";
import { isPlainData } from "../util";
import type { DialectName } from "../builder/sql";
import type { BoolClass } from "./bool";
import type { NullOf } from "./runtime";

// Global metadata symbol — keyed onto SqlValue instances to hold class
// pointer + underlying Sql + phantom type info without cluttering
// user-facing autocomplete. Callers typically import from `./runtime`
// which re-exports this alongside its own utilities.
export const meta = Symbol("typegres");

// Rich per-dialect descriptor. `name` is the string tag used by
// compile ctx / driver / deserialize registry; `root` and `bool`
// point at the dialect's canonical classes (used by isBool detection
// and by dialect roots' isNull/isNotNull/in bodies).
export interface Dialect {
  readonly name: DialectName;
  readonly root: typeof SqlValue;
  readonly bool: BoolClass;
}

type ColumnOpts = { nonNull?: boolean; default?: Sql; generated?: boolean };

export class SqlValue<in out N extends number> {
  // [meta] is an internal bag keyed by a symbol so it doesn't clutter
  // autocomplete. __class is runtime-set (see from()); __raw holds the
  // underlying Sql node for this expression; __nullability is a phantom
  // that makes N structurally visible so TS distinguishes e.g. Text<0>
  // from Text<0|1>.
  declare [meta]: {
    __class: typeof SqlValue;
    __raw: Sql;
    __nullability: N;
    __aggregate: SqlValue<number>;
  };

  // Dialect descriptor. Each dialect's root class overrides this; leaf
  // classes inherit through the prototype chain. Kept as a static so
  // `this.constructor.dialect` reaches it from any instance.
  static dialect: Dialect;

  // __typname: the dialect type name as a SQL fragment (for use in
  // templates like `CAST(x AS int4)`). __typnameText: the same name as
  // a plain string (for map lookups, error messages). Codegen emits both.
  static __typname: Sql;
  static __typnameText: string;

  // The JS-primitive `typeof` this class accepts via serialize() — used
  // by match() when `allowPrimitive` is set. Defaults to `"string"` since
  // PG wire format hands everything back as strings; concrete overrides
  // set this to `"number"` / `"boolean"` (int4, bool, ...).
  static primitiveTs: string = "string";

  // Whether `v` is an acceptable JS-side primitive for this class.
  // The default is the historical typeof check; classes whose
  // primitive has no distinct typeof override it (sqlite Blob →
  // Uint8Array, sqlite Any → any plain data).
  static acceptsPrimitive(v: unknown): boolean {
    return typeof v === this.primitiveTs;
  }

  // Default: identity. Overrides on the ~6 non-string typed classes
  // (Bool → boolean, Int2/Int4/Oid → parseInt, Float4/Float8 → parseFloat)
  // return the parsed value. Return-typed as `unknown` here so subclass
  // overrides are free to narrow to any concrete type without a TS
  // covariance error. Identity-typed classes (Text, Bytea, ...) get a
  // `declare deserialize: (raw) => string` marker from codegen so
  // `TsTypeOf<Text<1>>` still resolves to `string`.
  deserialize(raw: string): unknown { return raw; }

  // Returns the underlying Sql node for embedding in other expressions
  toSql(): Sql {
    return this[meta].__raw;
  }

  // CAST this expression to another dialect type, preserving nullability.
  // Three cases, in order:
  //   - N is `number` (aggregate context) → target's __aggregate variant
  //   - N is exactly 1 (non-null) → target's __nonNullable variant
  //   - otherwise (0, or 0|1) → target's __nullable variant
  cast<T extends typeof SqlValue>(
    cls: T,
  ): [number] extends [N]
    ? (InstanceType<T> extends { [meta]: { __aggregate: infer U } } ? U : InstanceType<T>)
    : [N] extends [1]
      ? (InstanceType<T> extends { [meta]: { __nonNullable: infer U } } ? U : InstanceType<T>)
      : (InstanceType<T> extends { [meta]: { __nullable: infer U } } ? U : InstanceType<T>) {
    return cls.from(new Cast(this.toSql(), cls.__typname, cls.dialect.name)) as any;
  }

  // COALESCE(this, rhs) — returns first non-null. Chainable.
  // rhs must be same concrete type (via [meta].__any). If rhs is non-null, returns __nonNullable.
  coalesce<T extends SqlValue<any>, R extends (T extends { [meta]: { __any: infer A } } ? A : SqlValue<any>)>(
    this: T,
    rhs: R,
  ): 0 extends NullOf<R>
    ? T  // rhs can be null → preserve T (still nullable)
    : (T extends { [meta]: { __nonNullable: infer U } } ? U : T) {  // rhs is non-null → __nonNullable
    return this[meta].__class.from(sql`COALESCE(${this.toSql()}, ${rhs.toSql()})`) as any;
  }

  // Public constructor alternative with precise nullability.
  // Sql → nullable (0|1), primitive → non-null (1).
  static from<T extends typeof SqlValue>(this: T, v: Sql): InstanceType<T> extends { [meta]: { __nullable: infer U } } ? U : InstanceType<T>;
  static from<T extends typeof SqlValue>(this: T, v: unknown): InstanceType<T> extends { [meta]: { __nonNullable: infer U } } ? U : InstanceType<T>;
  static from(v: Sql | unknown): any {
    const instance = new this();
    let __raw: Sql;
    if (v instanceof Sql) {
      __raw = v;
    } else {
      // Reject class instances — they almost always indicate a bug.
      // The historical case: passing an SqlValue expression to .from()
      // silently wraps it as `Param(anAny)` which serializes as `{}`,
      // producing either invalid SQL or a confusing cast error far
      // from the call site. Plain objects (jsonb), arrays, nulls,
      // and primitives are fine — as is Uint8Array, the one class
      // instance that IS a bindable SQL value (blob/bytea).
      if (!(v instanceof Uint8Array) && !isPlainData(v)) {
        const name = (Object.getPrototypeOf(v) as { constructor?: { name?: string } } | null)?.constructor?.name ?? "anonymous";
        throw new TypeError(
          `${this.__typnameText}.from: cannot wrap ${name} instance as a typegres parameter. ` +
            `If this is a typegres expression, pass its .toSql() result; ` +
            `otherwise extract the primitive value first.`,
        );
      }
      // `any` is a placeholder, not a castable type name — a TypedParam
      // would compile to CAST(? AS any), which SQLite resolves to
      // NUMERIC affinity (mangling '!' → 0) and PG rejects. Root
      // classes bind bare params; concrete classes keep the forced
      // cast that makes their type claims true.
      __raw = this.__typnameText === "any"
        ? new Param(v)
        : new TypedParam(new Param(v), this.__typname, this.dialect.name);
    }
    // Set [meta] at runtime — subclasses' `declare [meta]` narrows the type only
    Object.defineProperty(instance, meta, {
      value: { __class: this, __raw },
      enumerable: false,
    });
    return instance;
  }

  // Internal: validate and wrap a TS value into a typed instance.
  // Used by match() for runtime overload dispatch.
  static serialize(v: unknown): SqlValue<any> {
    if (v instanceof this) { return v; }
    if (this.acceptsPrimitive(v)) { return this.from(v); }
    throw new Error(
      `${this.__typnameText}.serialize: expected a ${this.__typnameText} instance or an accepted primitive, got ${typeof v} (${String(v).slice(0, 60)}).`,
    );
  }

  // Column declaration for Table definitions. The field name doubles as
  // the column name:
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
    T extends typeof SqlValue<any>,
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

// True iff `v` is a SqlValue whose underlying SQL is the sql.unbound()
// sentinel — i.e., it was declared via `.column()` on a Table class, not
// built as an arbitrary expression. Dialect-agnostic.
export const isColumn = (v: unknown): v is SqlValue<any> =>
  v instanceof SqlValue && v[meta].__raw instanceof Unbound;

// Look up a column by name on a Table instance. Throws with a specific
// message when the field is missing or is an expression rather than a
// column declaration. Used by mutation builders and live wrappers.
export const getColumn = (
  instance: { constructor: { tableName: string } },
  name: string,
): SqlValue<any> => {
  const col = (instance as { [k: string]: unknown })[name];
  const tableName = instance.constructor.tableName;
  if (!(col instanceof SqlValue)) {
    throw new Error(
      `No column '${name}' on table '${tableName}'. ` +
      `Declare it as a field: \`${name} = Type.column(...)\`.`,
    );
  }
  // A column declaration's SQL is either Unbound (un-aliased rowType) or a
  // Column ref (after reAlias by a builder's finalize). Compound shapes
  // (Op, Func, ...) mean the field was assigned an expression, not declared.
  const raw = col[meta].__raw;
  if (!(raw instanceof Unbound) && !(raw instanceof Column)) {
    throw new Error(
      `Field '${name}' on table '${tableName}' is an expression, not a column. ` +
      `Only fields declared via \`Type.column(...)\` can be targeted by mutations.`,
    );
  }
  return col;
};
