// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Polygon<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof Polygon;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Polygon<0 | 1>;
    __nonNullable: Polygon<1>;
    __aggregate: Polygon<number>;
    __any: Polygon<any>;
  };
  static __typname = runtime.sql`polygon`;
  static __typnameText = "polygon";
  declare deserialize: (raw: string) => string;
  @expose.unchecked()
  circle(): types.Circle<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Circle]]); return runtime.funcCall("circle", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  distPolyc<M0 extends types.Circle<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("dist_polyc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  npoints(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("npoints", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  path(): types.Path<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Path]]); return runtime.funcCall("path", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyAbove<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_above", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyBelow<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_below", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyContain<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_contain", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyContained<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_contained", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyDistance<M0 extends types.Polygon<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("poly_distance", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyLeft<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_left", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyNpoints(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("poly_npoints", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyOverabove<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_overabove", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyOverbelow<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_overbelow", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyOverlap<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_overlap", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyOverleft<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_overleft", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyOverright<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_overright", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polyRight<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_right", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polySame<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("poly_same", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polySend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("poly_send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['&&']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['&<']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`&<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['&<|']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`&<|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['&>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`&>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<->']<M0 extends types.Circle<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<->']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<->'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle }], types.Float8], [[{ type: types.Polygon, allowPrimitive: true }], types.Float8]]); return runtime.opCall(runtime.sql`<->`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<<']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<<|']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<<|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<@']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['@>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['|&>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`|&>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['|>>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`|>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~=']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
