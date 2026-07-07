// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Tid<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof Tid;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Tid<0 | 1>;
    __nonNullable: Tid<1>;
    __aggregate: Tid<number>;
    __any: Tid<any>;
  };
  static __typname = runtime.sql`tid`;
  static __typnameText = "tid";
  declare deserialize: (raw: string) => string;
  @expose.unchecked()
  tidlarger<M0 extends types.Tid<any> | string>(arg0: M0): types.Tid<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Tid]]); return runtime.funcCall("tidlarger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tidsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("tidsend", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tidsmaller<M0 extends types.Tid<any> | string>(arg0: M0): types.Tid<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Tid]]); return runtime.funcCall("tidsmaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Tid<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Tid]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Tid<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Tid]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Tid<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tid, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
