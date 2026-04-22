// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Varchar<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Varchar;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Varchar<0 | 1>;
    __nonNullable: Varchar<1>;
    __aggregate: Varchar<number>;
    __any: Varchar<any>;
  };
  static __typname = runtime.sql`varchar`;
  static __typnameText = "varchar";
  declare deserialize: (raw: string) => string;
  varchar<M0 extends types.Int4<any> | number, M1 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1): types.Varchar<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Varchar]]); return runtime.PgFunc("varchar", [this, ...__rest], __rt) as any; }
}
