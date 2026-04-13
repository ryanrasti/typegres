import { Any as Generated } from "../generated/any";
import { getTypeDef } from "../deserialize";
import { Sql } from "../../sql-builder";

export class Any<N extends number> extends Generated<N> {
  __class = this.constructor as typeof Generated<N>;
  static __typname = "any";

  constructor(private __raw: Sql) {
    super();
  }

  deserialize(raw: string): unknown {
    return getTypeDef((this.constructor as typeof Any).__typname).deserialize(raw);
  }

  compile(): Sql {
    return this.__raw;
  }
}
