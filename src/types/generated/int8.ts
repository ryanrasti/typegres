// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Int8<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Int8;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Int8<0 | 1>;
    __nonNullable: Int8<1>;
    __aggregate: Int8<number>;
    __any: Int8<any>;
  };
  static __typname = runtime.sql`int8`;
  static __typnameText = "int8";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  abs(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bit<M0 extends types.Int4<any> | number>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("bit", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  factorial(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("factorial", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("float4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("float8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  gcd<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("gcd", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Sum<M0 extends types.Int2<any> | number>(arg0: M0): types.Int8<1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int2_sum", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int4Sum<M0 extends types.Int4<any> | number>(arg0: M0): types.Int8<1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int4_sum", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Abs(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8And<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8and", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Dec(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8dec", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8DecAny<M0 extends types.Any<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8dec_any", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Inc(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8inc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8IncAny<M0 extends types.Any<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8inc_any", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8IncFloat8Float8<M0 extends types.Float8<any> | number, M1 extends types.Float8<any> | number>(arg0: M0, arg1: M1): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Float8, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8inc_float8_float8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Larger<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Not(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8not", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Or<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8or", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8RangeSubdiff<M0 extends types.Int8<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("int8range_subdiff", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("int8send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Shl<M0 extends types.Int4<any> | number>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8shl", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Shr<M0 extends types.Int4<any> | number>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8shr", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Smaller<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Xor<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("int8xor", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  lcm<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("lcm", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  mod<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("mod", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  oid(): types.Oid<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Oid]]); return runtime.PgFunc("oid", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgSizePretty(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("pg_size_pretty", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  toBin(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("to_bin", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  toHex(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("to_hex", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  toOct(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("to_oct", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  txidVisibleInSnapshot<M0 extends types.TxidSnapshot<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.TxidSnapshot, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("txid_visible_in_snapshot", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  avg(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("avg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bitAnd(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("bit_and", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bitOr(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("bit_or", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bitXor(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("bit_xor", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddev(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddevPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddevSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sum(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("sum", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  varPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("var_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  varSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("var_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  variance(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("variance", [this, ...__rest], __rt) as any; }
  generateSeries<M0 extends types.Int8<any> | string, M1 extends types.Int8<any> | string>(arg0: M0, arg1: M1): runtime.PgSrf<{ generate_series: types.Int8<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_series">;
  generateSeries<M0 extends types.Int8<any> | string>(arg0: M0): runtime.PgSrf<{ generate_series: types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "generate_series">;
  @tool.unchecked()
  generateSeries(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int8, allowPrimitive: true }, { type: types.Int8, allowPrimitive: true }], types.Int8], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return new runtime.PgSrf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  @tool.unchecked()
  ['#']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`#`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['%']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`%`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['&']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['*']<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int4<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int2<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['*'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Money }], types.Money], [[{ type: types.Int4 }], types.Int8], [[{ type: types.Int8, allowPrimitive: true }], types.Int8], [[{ type: types.Int2 }], types.Int8]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  times<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int4<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int2<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  times(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Money }], types.Money], [[{ type: types.Int4 }], types.Int8], [[{ type: types.Int8, allowPrimitive: true }], types.Int8], [[{ type: types.Int2 }], types.Int8]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Inet<any>>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int2<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int4<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet }], types.Inet], [[{ type: types.Int2 }], types.Int8], [[{ type: types.Int4 }], types.Int8], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Inet<any>>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int2<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int4<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet }], types.Inet], [[{ type: types.Int2 }], types.Int8], [[{ type: types.Int4 }], types.Int8], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int4<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int2<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8], [[{ type: types.Int4 }], types.Int8], [[{ type: types.Int2 }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int4<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int2<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8], [[{ type: types.Int4 }], types.Int8], [[{ type: types.Int2 }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['/']<M0 extends types.Int2<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Int4<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['/'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Int8], [[{ type: types.Int4 }], types.Int8], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  divide<M0 extends types.Int2<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Int4<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  divide(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Int8], [[{ type: types.Int4 }], types.Int8], [[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<<']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int2 }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int2 }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4 }], types.Bool], [[{ type: types.Int2 }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4 }], types.Bool], [[{ type: types.Int2 }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4 }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4 }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4 }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool], [[{ type: types.Int4 }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Int2<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Int4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Int8<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2 }], types.Bool], [[{ type: types.Int4 }], types.Bool], [[{ type: types.Int8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['|']<M0 extends types.Int8<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
