// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Timestamptz<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Timestamptz;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Timestamptz<0 | 1>;
    __nonNullable: Timestamptz<1>;
    __aggregate: Timestamptz<number>;
    __any: Timestamptz<any>;
  };
  static __typname = runtime.sql`timestamptz`;
  static __typnameText = "timestamptz";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  age<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Interval]]); return runtime.PgFunc("age", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dateAdd<M0 extends types.Interval<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Interval, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Timestamptz]]); return runtime.PgFunc("date_add", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dateSubtract<M0 extends types.Interval<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Interval, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Timestamptz]]); return runtime.PgFunc("date_subtract", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  isfinite(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("isfinite", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  overlaps<M0 extends types.Timestamptz<any> | string, M1 extends types.Timestamptz<any> | string, M2 extends types.Timestamptz<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Timestamptz, allowPrimitive: true }, { type: types.Timestamptz, allowPrimitive: true }, { type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("overlaps", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  timestamptz<M0 extends types.Int4<any> | number>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Timestamptz]]); return runtime.PgFunc("timestamptz", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  timestamptzLarger<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Timestamptz]]); return runtime.PgFunc("timestamptz_larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  timestamptzSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("timestamptz_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  timestamptzSmaller<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Timestamptz]]); return runtime.PgFunc("timestamptz_smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tstzrangeSubdiff<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("tstzrange_subdiff", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Timestamptz<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timestamptz]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Timestamptz<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timestamptz]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  generateSeries<M0 extends types.Timestamptz<any> | string, M1 extends types.Interval<any> | string, M2 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2): runtime.PgSrf<{ generate_series: types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> }, "generate_series"> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Timestamptz, allowPrimitive: true }, { type: types.Interval, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Timestamptz]]); return new runtime.PgSrf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  @tool.unchecked()
  ['+']<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamptz]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  plus<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamptz]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Interval<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Timestamptz], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Interval]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Interval<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Timestamptz], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Interval]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp }], types.Bool], [[{ type: types.Date }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp }], types.Bool], [[{ type: types.Date }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Bool], [[{ type: types.Timestamp }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Bool], [[{ type: types.Timestamp }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamp }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamp }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Bool], [[{ type: types.Timestamp }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Bool], [[{ type: types.Timestamp }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamp }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Date<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Timestamp<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date }], types.Bool], [[{ type: types.Timestamp }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
