// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Xid8<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof Xid8;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Xid8<0 | 1>;
    __nonNullable: Xid8<1>;
    __aggregate: Xid8<number>;
    __any: Xid8<any>;
  };
  static __typname = runtime.sql`xid8`;
  static __typnameText = "xid8";
  declare deserialize: (raw: string) => string;
  @expose.unchecked()
  pgVisibleInSnapshot<M0 extends types.PgSnapshot<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgSnapshot, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("pg_visible_in_snapshot", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xid(): types.Xid<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xid]]); return runtime.funcCall("xid", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xid8Larger<M0 extends types.Xid8<any> | string>(arg0: M0): types.Xid8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Xid8]]); return runtime.funcCall("xid8_larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xid8Smaller<M0 extends types.Xid8<any> | string>(arg0: M0): types.Xid8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Xid8]]); return runtime.funcCall("xid8_smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xid8Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("xid8send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Xid8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xid8]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Xid8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xid8]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Xid8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xid8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
