import { Any as Generated } from "../generated/any";
import { getTypeDef } from "../deserialize";
import type { Sql } from "../../sql-builder";

export class Any<N extends number> extends Generated<N> {
  __class = this.constructor as typeof Any;
  static __typname = "any";

  constructor(public __raw: Sql) {
    super();
  }

  deserialize(raw: string): unknown {
    return getTypeDef((this.constructor as typeof Any).__typname).deserialize(raw);
  }

  compile(): Sql {
    return this.__raw;
  }
}
