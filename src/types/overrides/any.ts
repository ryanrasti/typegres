import { Any as Generated } from "../generated/any";
import { getTypeDef } from "../deserialize";
import { sql, Sql } from "../../sql-builder";

export class Any<N extends number> extends Generated<N> {
  __class = this.constructor as typeof Any;
  __raw: Sql;
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
}
