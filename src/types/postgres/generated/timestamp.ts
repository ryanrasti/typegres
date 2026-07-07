// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Timestamp<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof Timestamp;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Timestamp<0 | 1>;
    __nonNullable: Timestamp<1>;
    __aggregate: Timestamp<number>;
    __any: Timestamp<any>;
  };
  static __typname = runtime.sql`timestamp`;
  static __typnameText = "timestamp";
  declare deserialize: (raw: string) => string;
  @expose.unchecked()
  age<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Interval]]); return runtime.funcCall("age", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  date(): types.Date<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Date]]); return runtime.funcCall("date", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  isfinite(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.funcCall("isfinite", [this, ...__rest], __rt) as any; }
  overlaps<M0 extends types.Interval<any>, M1 extends types.Timestamp<any>, M2 extends types.Interval<any>>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Interval<any>, M1 extends types.Timestamp<any>, M2 extends types.Timestamp<any>>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Timestamp<any>, M1 extends types.Timestamp<any>, M2 extends types.Interval<any>>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Timestamp<any> | string, M1 extends types.Timestamp<any> | string, M2 extends types.Timestamp<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  @expose.unchecked()
  overlaps(arg0: unknown, arg1: unknown, arg2: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Interval }, { type: types.Timestamp }, { type: types.Interval }], types.Bool], [[{ type: types.Interval }, { type: types.Timestamp }, { type: types.Timestamp }], types.Bool], [[{ type: types.Timestamp }, { type: types.Timestamp }, { type: types.Interval }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }, { type: types.Timestamp, allowPrimitive: true }, { type: types.Timestamp, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("overlaps", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  time(): types.Time<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Time]]); return runtime.funcCall("time", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  timestamp<M0 extends types.Int4<any> | number>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Timestamp]]); return runtime.funcCall("timestamp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  timestampLarger<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Timestamp]]); return runtime.funcCall("timestamp_larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  timestampSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("timestamp_send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  timestampSmaller<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Timestamp]]); return runtime.funcCall("timestamp_smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsrangeSubdiff<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("tsrange_subdiff", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Timestamp<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timestamp]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Timestamp<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timestamp]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  generateSeries<M0 extends types.Timestamp<any> | string, M1 extends types.Interval<any> | string>(arg0: M0, arg1: M1): runtime.Srf<{ generate_series: types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_series"> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Timestamp, allowPrimitive: true }, { type: types.Interval, allowPrimitive: true }], types.Timestamp]]); return new runtime.Srf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  @expose.unchecked()
  ['+']<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamp]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  plus<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamp]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Interval<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Timestamp], [[{ type: types.Timestamp, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Interval<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Timestamp], [[{ type: types.Timestamp, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz }], types.Bool], [[{ type: types.Date }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz }], types.Bool], [[{ type: types.Date }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamptz }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamptz }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamptz }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamptz }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamptz }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamptz }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamptz }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Timestamptz<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamptz }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
