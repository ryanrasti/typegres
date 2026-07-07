// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Int4<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof types.Int4;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: types.Int4<0 | 1>;
    __nonNullable: types.Int4<1>;
    __aggregate: types.Int4<number>;
    __any: types.Int4<any>;
  };
  static __typname = runtime.sql`int4`;
  static __typnameText = "int4";
  @expose.unchecked()
  abs(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("abs", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bit<M0 extends types.Int4<any> | number>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bit]]); return runtime.funcCall("bit", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bool(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.funcCall("bool", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  char(): types.Char<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Char]]); return runtime.funcCall("char", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  chr(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("chr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.funcCall("float4", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("float8", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  gcd<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("gcd", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.funcCall("int2", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Abs(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("int4abs", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4And<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("int4and", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Inc(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("int4inc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Larger<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("int4larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Not(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("int4not", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Or<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("int4or", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4RangeSubdiff<M0 extends types.Int4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("int4range_subdiff", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("int4send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Shl<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("int4shl", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Shr<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("int4shr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Smaller<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("int4smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4Xor<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("int4xor", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.funcCall("int8", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  lcm<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("lcm", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  makeDate<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Date<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Date]]); return runtime.funcCall("make_date", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  makeInterval<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Int4<any> | number, M5 extends types.Float8<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4, arg5: M5): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4> | runtime.NullOf<M5>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4, arg5], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }], types.Interval]]); return runtime.funcCall("make_interval", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  makeTime<M0 extends types.Int4<any> | number, M1 extends types.Float8<any> | number>(arg0: M0, arg1: M1): types.Time<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }], types.Time]]); return runtime.funcCall("make_time", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  makeTimestamp<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Float8<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }], types.Timestamp]]); return runtime.funcCall("make_timestamp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  mod<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("mod", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("numeric", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  pgEncodingMaxLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("pg_encoding_max_length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  polygon<M0 extends types.Circle<any> | string>(arg0: M0): types.Polygon<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Polygon]]); return runtime.funcCall("polygon", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  toBin(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("to_bin", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  toHex(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("to_hex", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  toOct(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("to_oct", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  avg(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("avg", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bitAnd(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("bit_and", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bitOr(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("bit_or", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bitXor(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("bit_xor", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddev(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("stddev", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddevPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("stddev_pop", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddevSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("stddev_samp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sum(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.funcCall("sum", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  varPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("var_pop", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  varSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("var_samp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  variance(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("variance", [this, ...__rest], __rt) as any; }
  generateSeries<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): runtime.Srf<{ generate_series: types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_series">;
  generateSeries<M0 extends types.Int4<any> | number>(arg0: M0): runtime.Srf<{ generate_series: types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "generate_series">;
  @expose.unchecked()
  generateSeries(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return new runtime.Srf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  @expose.unchecked()
  ['#']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.opCall(runtime.sql`#`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['%']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.opCall(runtime.sql`%`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['&']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.opCall(runtime.sql`&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['*']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int2<any>>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['*'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Int8], [[{ type: types.Int2 }], types.Int4], [[{ type: types.Money }], types.Money], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.opCall(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  times<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int2<any>>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  times(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Int8], [[{ type: types.Int2 }], types.Int4], [[{ type: types.Money }], types.Money], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.opCall(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Date<any>>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int2<any>>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Date], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int2 }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Date<any>>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int2<any>>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Date], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int2 }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int2<any>>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int2 }], types.Int4], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int2<any>>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int2 }], types.Int4], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['/']<M0 extends types.Int2<any>>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['/'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Int4], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.opCall(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  divide<M0 extends types.Int2<any>>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  divide(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Int4], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.opCall(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2 }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2 }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<<']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.opCall(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2 }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2 }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.opCall(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['|']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.opCall(runtime.sql`|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
