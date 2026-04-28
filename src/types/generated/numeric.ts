// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Numeric<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Numeric;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Numeric<0 | 1>;
    __nonNullable: Numeric<1>;
    __aggregate: Numeric<number>;
    __any: Numeric<any>;
  };
  static __typname = runtime.sql`numeric`;
  static __typnameText = "numeric";
  declare deserialize: (raw: string) => string;
  abs(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("abs", [this, ...__rest], __rt) as any; }
  ceil(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("ceil", [this, ...__rest], __rt) as any; }
  ceiling(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("ceiling", [this, ...__rest], __rt) as any; }
  div<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("div", [this, ...__rest], __rt) as any; }
  exp(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("exp", [this, ...__rest], __rt) as any; }
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("float4", [this, ...__rest], __rt) as any; }
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("float8", [this, ...__rest], __rt) as any; }
  floor(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("floor", [this, ...__rest], __rt) as any; }
  gcd<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("gcd", [this, ...__rest], __rt) as any; }
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2", [this, ...__rest], __rt) as any; }
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4", [this, ...__rest], __rt) as any; }
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  int8Sum<M0 extends types.Int8<any> | bigint>(arg0: M0): types.Numeric<1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("int8_sum", [this, ...__rest], __rt) as any; }
  lcm<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("lcm", [this, ...__rest], __rt) as any; }
  ln(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("ln", [this, ...__rest], __rt) as any; }
  log(): types.Numeric<N>;
  log<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  log(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Numeric], [[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("log", [this, ...__rest], __rt) as any; }
  log10(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("log10", [this, ...__rest], __rt) as any; }
  minScale(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("min_scale", [this, ...__rest], __rt) as any; }
  mod<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("mod", [this, ...__rest], __rt) as any; }
  numeric<M0 extends types.Int4<any> | number>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric", [this, ...__rest], __rt) as any; }
  numericAbs(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_abs", [this, ...__rest], __rt) as any; }
  numericDivTrunc<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric_div_trunc", [this, ...__rest], __rt) as any; }
  numericExp(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_exp", [this, ...__rest], __rt) as any; }
  numericInc(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_inc", [this, ...__rest], __rt) as any; }
  numericLarger<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric_larger", [this, ...__rest], __rt) as any; }
  numericLn(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_ln", [this, ...__rest], __rt) as any; }
  numericLog<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric_log", [this, ...__rest], __rt) as any; }
  numericSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("numeric_send", [this, ...__rest], __rt) as any; }
  numericSmaller<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric_smaller", [this, ...__rest], __rt) as any; }
  numericSqrt(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_sqrt", [this, ...__rest], __rt) as any; }
  numrangeSubdiff<M0 extends types.Numeric<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("numrange_subdiff", [this, ...__rest], __rt) as any; }
  pgLsn(): types.PgLsn<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.PgLsn]]); return runtime.PgFunc("pg_lsn", [this, ...__rest], __rt) as any; }
  pgSizePretty(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("pg_size_pretty", [this, ...__rest], __rt) as any; }
  pow<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("pow", [this, ...__rest], __rt) as any; }
  power<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("power", [this, ...__rest], __rt) as any; }
  round<M0 extends types.Int4<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  round(): types.Numeric<N>;
  round(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4 }], types.Numeric], [[], types.Numeric]]); return runtime.PgFunc("round", [this, ...__rest], __rt) as any; }
  scale(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("scale", [this, ...__rest], __rt) as any; }
  sign(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("sign", [this, ...__rest], __rt) as any; }
  sqrt(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("sqrt", [this, ...__rest], __rt) as any; }
  trimScale(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("trim_scale", [this, ...__rest], __rt) as any; }
  trunc(): types.Numeric<N>;
  trunc<M0 extends types.Int4<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  trunc(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Numeric], [[{ type: types.Int4 }], types.Numeric]]); return runtime.PgFunc("trunc", [this, ...__rest], __rt) as any; }
  widthBucket<M0 extends types.Numeric<any> | string, M1 extends types.Numeric<any> | string, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Numeric, allowPrimitive: true }, { type: types.Numeric, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("width_bucket", [this, ...__rest], __rt) as any; }
  avg(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("avg", [this, ...__rest], __rt) as any; }
  max(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  min(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  stddev(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev", [this, ...__rest], __rt) as any; }
  stddevPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev_pop", [this, ...__rest], __rt) as any; }
  stddevSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev_samp", [this, ...__rest], __rt) as any; }
  sum(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("sum", [this, ...__rest], __rt) as any; }
  varPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("var_pop", [this, ...__rest], __rt) as any; }
  varSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("var_samp", [this, ...__rest], __rt) as any; }
  variance(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("variance", [this, ...__rest], __rt) as any; }
  generateSeries<M0 extends types.Numeric<any> | string, M1 extends types.Numeric<any> | string>(arg0: M0, arg1: M1): runtime.PgSrf<{ generate_series: types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_series">;
  generateSeries<M0 extends types.Numeric<any> | string>(arg0: M0): runtime.PgSrf<{ generate_series: types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "generate_series">;
  generateSeries(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Numeric, allowPrimitive: true }, { type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return new runtime.PgSrf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  ['%']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`%`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['*']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  times<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.PgLsn<any> | string>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.PgLsn, allowPrimitive: true }], types.PgLsn]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.PgLsn<any> | string>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.PgLsn, allowPrimitive: true }], types.PgLsn]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['/']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  divide<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['^']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`^`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
