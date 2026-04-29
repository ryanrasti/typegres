// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Polygon<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
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
  @tool.unchecked()
  circle(): types.Circle<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Circle]]); return runtime.PgFunc("circle", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  distPolyc<M0 extends types.Circle<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("dist_polyc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  npoints(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("npoints", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  path(): types.Path<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Path]]); return runtime.PgFunc("path", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyAbove<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_above", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyBelow<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_below", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyContain<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_contain", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyContained<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_contained", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyDistance<M0 extends types.Polygon<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("poly_distance", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyLeft<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_left", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyNpoints(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("poly_npoints", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyOverabove<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_overabove", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyOverbelow<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_overbelow", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyOverlap<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_overlap", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyOverleft<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_overleft", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyOverright<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_overright", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polyRight<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_right", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polySame<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("poly_same", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polySend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("poly_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ['&&']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['&<']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['&<|']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&<|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['&>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<->']<M0 extends types.Circle<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<->']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<->'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Float8], [[{ type: types.Polygon, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`<->`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<<']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<<|']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<@']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['|&>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`|&>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['|>>']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`|>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~=']<M0 extends types.Polygon<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
