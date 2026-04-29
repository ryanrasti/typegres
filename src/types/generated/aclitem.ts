// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Aclitem<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Aclitem;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Aclitem<0 | 1>;
    __nonNullable: Aclitem<1>;
    __aggregate: Aclitem<number>;
    __any: Aclitem<any>;
  };
  static __typname = runtime.sql`aclitem`;
  static __typnameText = "aclitem";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  ['=']<M0 extends types.Aclitem<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Aclitem, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Aclitem<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Aclitem, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
