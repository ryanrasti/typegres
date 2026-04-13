import { Any as Generated } from "../generated/any";
import { getTypeDef } from "../deserialize";
import { sql, Sql } from "../../sql-builder";

export class Any<N extends number> extends Generated<N> {
  __class = this.constructor as typeof Any;
  __raw: Sql;
  declare __nullability: N;
  static __typname = "any";

  constructor(raw: Sql | unknown) {
    super();
    if (raw instanceof Sql) {
      this.__raw = raw;
    } else {
      // TS primitive — wrap in CAST($1 AS <typname>)
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
  // `this` in static context is the constructor — so Int4.column() returns Int4<N>
  static column<T extends typeof Any>(
    this: T,
    opts?: { nonNull?: boolean; default?: Sql },
  ): InstanceType<T> {
    // At runtime, column() returns a descriptor object — not a real expression
    // The type system tracks nullability via the generic
    return { __column: true, __class: this, ...opts } as any;
  }
}
