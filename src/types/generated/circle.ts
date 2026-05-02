// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Circle<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Circle;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Circle<0 | 1>;
    __nonNullable: Circle<1>;
    __aggregate: Circle<number>;
    __any: Circle<any>;
  };
  static __typname = runtime.sql`circle`;
  static __typnameText = "circle";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  area(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("area", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleAbove<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_above", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleBelow<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_below", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleContain<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_contain", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleContained<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_contained", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleDistance<M0 extends types.Circle<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("circle_distance", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleLeft<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_left", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleOverabove<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_overabove", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleOverbelow<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_overbelow", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleOverlap<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_overlap", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleOverleft<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_overleft", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleOverright<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_overright", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleRight<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_right", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleSame<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("circle_same", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  circleSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("circle_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  diameter(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("diameter", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  distCpoly<M0 extends types.Polygon<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("dist_cpoly", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  polygon(): types.Polygon<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Polygon]]); return runtime.PgFunc("polygon", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  radius(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("radius", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ['&&']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['&<']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['&<|']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&<|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['&>']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<->']<M0 extends types.Polygon<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<->']<M0 extends types.Circle<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<->'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Polygon }], types.Float8], [[{ type: types.Circle, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`<->`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<<']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<<|']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<@']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>>']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@>']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['|&>']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`|&>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['|>>']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`|>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~=']<M0 extends types.Circle<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
