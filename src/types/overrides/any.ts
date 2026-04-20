import { Any as Generated } from "../generated/any";
import { getTypeDef } from "../deserialize";
import { meta } from "../runtime";
import type { NullOf } from "../runtime";
import { sql, Sql } from "../../builder/sql";
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
  static __typname = "any";

  deserialize(raw: string): unknown {
    return getTypeDef((this.constructor as typeof Any).__typname).deserialize(raw);
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
      : sql`CAST(${sql.param(v)} AS ${sql.raw(this.__typname)})`;
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
    const expected = getTypeDef(this.__typname).tsType;
    if (typeof v === expected) { return this.from(v); }
    throw new Error(`Expected ${this.__typname} (${expected}), got ${typeof v}`);
  }

  // Column descriptor for Table definitions
  // __required is computed at the type level: nonNull && no default && not generated
  static column<
    T extends typeof Any<any>,
    Opts extends ColumnOpts = {},
  >(
    this: T,
    opts?: Opts,
  ): InstanceType<T> & {
    [meta]: {
      __required: Opts extends { nonNull: true }
        ? Opts extends { default: any } | { generated: true } ? false : true
        : false;
    };
  } {
    // TODO: this should return a real instance -- and then we have special code that
    //         injects the instance with a reference to the table's column.
    //         Look for references to `__class` in the builders -- they shouldn't exist.
    return { __column: true, __class: this, ...opts } as any;
  }
}
