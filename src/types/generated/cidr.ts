// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Cidr<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Cidr;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Cidr<0 | 1>;
    __nonNullable: Cidr<1>;
    __aggregate: Cidr<number>;
    __any: Cidr<any>;
  };
  static __typname = runtime.sql`cidr`;
  static __typnameText = "cidr";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  abbrev(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("abbrev", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  cidrSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("cidr_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  setMasklen<M0 extends types.Int4<any> | number>(arg0: M0): types.Cidr<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Cidr]]); return runtime.PgFunc("set_masklen", [this, ...__rest], __rt) as any; }
}
