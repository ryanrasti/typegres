// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Int4<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Int4;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Int4<0 | 1>;
    __nonNullable: Int4<1>;
    __aggregate: Int4<number>;
    __any: Int4<any>;
  };
  static __typname = runtime.sql`int4`;
  static __typnameText = "int4";
  declare deserialize: (raw: string) => number;
  abs(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("abs", [this, ...__rest], __rt) as any; }
  bit<M0 extends types.Int4<any> | number>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("bit", [this, ...__rest], __rt) as any; }
  bool(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("bool", [this, ...__rest], __rt) as any; }
  char(): types.Char<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Char]]); return runtime.PgFunc("char", [this, ...__rest], __rt) as any; }
  chr(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("chr", [this, ...__rest], __rt) as any; }
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("float4", [this, ...__rest], __rt) as any; }
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("float8", [this, ...__rest], __rt) as any; }
  gcd<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("gcd", [this, ...__rest], __rt) as any; }
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2", [this, ...__rest], __rt) as any; }
  int4Abs(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4abs", [this, ...__rest], __rt) as any; }
  int4And<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("int4and", [this, ...__rest], __rt) as any; }
  int4Inc(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4inc", [this, ...__rest], __rt) as any; }
  int4Larger<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("int4larger", [this, ...__rest], __rt) as any; }
  int4Not(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4not", [this, ...__rest], __rt) as any; }
  int4Or<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("int4or", [this, ...__rest], __rt) as any; }
  int4RangeSubdiff<M0 extends types.Int4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("int4range_subdiff", [this, ...__rest], __rt) as any; }
  int4Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("int4send", [this, ...__rest], __rt) as any; }
  int4Shl<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("int4shl", [this, ...__rest], __rt) as any; }
  int4Shr<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("int4shr", [this, ...__rest], __rt) as any; }
  int4Smaller<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("int4smaller", [this, ...__rest], __rt) as any; }
  int4Xor<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("int4xor", [this, ...__rest], __rt) as any; }
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  lcm<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("lcm", [this, ...__rest], __rt) as any; }
  makeDate<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Date<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Date]]); return runtime.PgFunc("make_date", [this, ...__rest], __rt) as any; }
  makeInterval<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Int4<any> | number, M5 extends types.Float8<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4, arg5: M5): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4> | runtime.NullOf<M5>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4, arg5], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }], types.Interval]]); return runtime.PgFunc("make_interval", [this, ...__rest], __rt) as any; }
  makeTime<M0 extends types.Int4<any> | number, M1 extends types.Float8<any> | number>(arg0: M0, arg1: M1): types.Time<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }], types.Time]]); return runtime.PgFunc("make_time", [this, ...__rest], __rt) as any; }
  makeTimestamp<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Float8<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }], types.Timestamp]]); return runtime.PgFunc("make_timestamp", [this, ...__rest], __rt) as any; }
  mod<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("mod", [this, ...__rest], __rt) as any; }
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric", [this, ...__rest], __rt) as any; }
  pgEncodingMaxLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("pg_encoding_max_length", [this, ...__rest], __rt) as any; }
  polygon<M0 extends types.Circle<any> | string>(arg0: M0): types.Polygon<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Circle, allowPrimitive: true }], types.Polygon]]); return runtime.PgFunc("polygon", [this, ...__rest], __rt) as any; }
  toBin(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("to_bin", [this, ...__rest], __rt) as any; }
  toHex(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("to_hex", [this, ...__rest], __rt) as any; }
  toOct(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("to_oct", [this, ...__rest], __rt) as any; }
  avg(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("avg", [this, ...__rest], __rt) as any; }
  bitAnd(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("bit_and", [this, ...__rest], __rt) as any; }
  bitOr(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("bit_or", [this, ...__rest], __rt) as any; }
  bitXor(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("bit_xor", [this, ...__rest], __rt) as any; }
  max(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  min(): types.Int4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  stddev(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev", [this, ...__rest], __rt) as any; }
  stddevPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev_pop", [this, ...__rest], __rt) as any; }
  stddevSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev_samp", [this, ...__rest], __rt) as any; }
  sum(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("sum", [this, ...__rest], __rt) as any; }
  varPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("var_pop", [this, ...__rest], __rt) as any; }
  varSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("var_samp", [this, ...__rest], __rt) as any; }
  variance(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("variance", [this, ...__rest], __rt) as any; }
  generateSeries<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): runtime.PgSrf<{ generate_series: types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_series">;
  generateSeries<M0 extends types.Int4<any> | number>(arg0: M0): runtime.PgSrf<{ generate_series: types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "generate_series">;
  generateSeries(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return new runtime.PgSrf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  ['#']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`#`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['%']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`%`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['&']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['*']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Int8], [[{ type: types.Int2, allowPrimitive: true }], types.Int4], [[{ type: types.Money }], types.Money], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  times<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int2<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Int8], [[{ type: types.Int2, allowPrimitive: true }], types.Int4], [[{ type: types.Money }], types.Money], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Date<any>>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Date], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int2, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Date<any>>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int2<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Date], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int2, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int2, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int2<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int2, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['/']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int4], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  divide<M0 extends types.Int2<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int4], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<<']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['|']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
