// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Macaddr8<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof Macaddr8;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Macaddr8<0 | 1>;
    __nonNullable: Macaddr8<1>;
    __aggregate: Macaddr8<number>;
    __any: Macaddr8<any>;
  };
  static __typname = runtime.sql`macaddr8`;
  static __typnameText = "macaddr8";
  declare deserialize: (raw: string) => string;
  @expose.unchecked()
  macaddr(): types.Macaddr<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Macaddr]]); return runtime.funcCall("macaddr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  macaddr8And<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Macaddr8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Macaddr8]]); return runtime.funcCall("macaddr8_and", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  macaddr8Not(): types.Macaddr8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Macaddr8]]); return runtime.funcCall("macaddr8_not", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  macaddr8Or<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Macaddr8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Macaddr8]]); return runtime.funcCall("macaddr8_or", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  macaddr8Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("macaddr8_send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  macaddr8Set7Bit(): types.Macaddr8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Macaddr8]]); return runtime.funcCall("macaddr8_set7bit", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  trunc(): types.Macaddr8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Macaddr8]]); return runtime.funcCall("trunc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['&']<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Macaddr8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Macaddr8]]); return runtime.opCall(runtime.sql`&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['|']<M0 extends types.Macaddr8<any> | string>(arg0: M0): types.Macaddr8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Macaddr8, allowPrimitive: true }], types.Macaddr8]]); return runtime.opCall(runtime.sql`|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
