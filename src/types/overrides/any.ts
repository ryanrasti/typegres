import { Any as Generated } from "../generated/any";
import { getTypeDef } from "../deserialize";
import { meta } from "../runtime";
import type { NullOf } from "../runtime";
import { sql, Sql } from "../../builder/sql";

type ColumnOpts = { nonNull?: boolean; default?: Sql; generated?: boolean };

export class Any<N extends number> extends Generated<N> {
  declare [meta]: {
    __class: typeof Any;
  };
  // Phantom field — makes N structurally visible so TS distinguishes e.g. Text<0> from Text<0|1>.
  declare __nullability: N;
  __raw: Sql;
  static __typname = "any";

  constructor(raw: Sql | unknown) {
    super();
    // Set [meta] at runtime — subclasses' `declare [meta]` narrows the type only
    Object.defineProperty(this, meta, {
      value: { __class: this.constructor as typeof Any },
      enumerable: false,
    });
    if (raw instanceof Sql) {
      this.__raw = raw;
    } else {
      const typname = (this.constructor as typeof Any).__typname;
      this.__raw = sql`CAST(${sql.param(raw)} AS ${sql.raw(typname)})`;
    }
  }

  deserialize(raw: string): unknown {
    return getTypeDef((this.constructor as typeof Any).__typname).deserialize(raw);
  }

  compile(): Sql {
    return this.__raw;
  }

  // COALESCE(this, rhs) — returns first non-null. Chainable.
  // rhs must be same concrete type (via [meta].__any). If rhs is non-null, returns __nonNullable.
  coalesce<T extends Any<any>, R extends (T extends { [meta]: { __any: infer A } } ? A : Any<any>)>(
    this: T,
    rhs: R,
  ): 0 extends NullOf<R>
    ? T  // rhs can be null → preserve T (still nullable)
    : (T extends { [meta]: { __nonNullable: infer U } } ? U : T) {  // rhs is non-null → __nonNullable
    return new ((this as any)[meta].__class as any)(sql`COALESCE(${this.compile()}, ${rhs.compile()})`) as any;
  }

  // Validate and wrap a TS value into a typed instance.
  // Pass-through if already an instance, otherwise check typeof and wrap.
  static serialize(v: unknown): Any<any> {
    if (v instanceof this) { return v; }
    const expected = getTypeDef(this.__typname).tsType;
    if (typeof v === expected) { return new (this as any)(v); }
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
