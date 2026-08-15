import { Any as Generated } from "../generated/any";
import { type Dialect, inListSql, meta } from "../../sql-value";
import * as types from "../index";
import { sql, type Sql } from "../../../builder/sql";
import { expose } from "../../../exoeval/tool";

export class Any<in out N extends number> extends Generated<N> {
  declare [meta]: {
    __class: typeof Any;
    __raw: Sql;
    __nullability: N;
    __nullable: Any<0 | 1>;
    __nonNullable: Any<1>;
    __aggregate: Any<number>;
  };
  static override dialect: Dialect = {
    name: "oracle",
    get root() { return types.Any; },
    get bool() { return types.Bool; },
  };
  static override __typname = sql`any`;
  static override __typnameText = "any";
  static override acceptsPrimitive(v: unknown): boolean {
    if (this !== Any) { return typeof v === this.primitiveTs; }
    return ["number", "string", "boolean"].includes(typeof v) || v instanceof Uint8Array;
  }

  isNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NULL)`) as types.Bool<1>;
  }

  isNotNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NOT NULL)`) as types.Bool<1>;
  }

  // eslint-disable-next-line no-restricted-syntax -- generic vararg signature inexpressible in zod
  @expose.unchecked()
  in(...vals: [Any<any> | boolean | number | string | Uint8Array, ...(Any<any> | boolean | number | string | Uint8Array)[]]): types.Bool<any> {
    return types.Bool.from(inListSql(this, vals)) as types.Bool<any>;
  }
}
