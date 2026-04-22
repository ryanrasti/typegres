// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Cid<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Cid;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Cid<0 | 1>;
    __nonNullable: Cid<1>;
    __aggregate: Cid<number>;
    __any: Cid<any>;
  };
  static __typname = runtime.sql`cid`;
  static __typnameText = "cid";
  declare deserialize: (raw: string) => string;
  cidsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("cidsend", [this, ...__rest], __rt) as any; }
  ['=']<M0 extends types.Cid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Cid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Cid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Cid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
