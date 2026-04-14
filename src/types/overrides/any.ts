import { Any as Generated } from "../generated/any";
import { getTypeDef } from "../deserialize";
import { meta } from "../runtime";
import { sql, Sql } from "../../sql-builder";

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

  // Column descriptor for Table definitions
  static column<T extends typeof Any<any>>(
    this: T,
    opts?: { nonNull?: boolean; default?: Sql; generated?: boolean },
  ): InstanceType<T> {
    return { __column: true, __class: this, ...opts } as any;
  }
}
