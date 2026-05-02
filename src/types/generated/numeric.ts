// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
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
  @tool.unchecked()
  abs(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ceil(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("ceil", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ceiling(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("ceiling", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  div<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("div", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  exp(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("exp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("float4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("float8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  floor(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("floor", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  gcd<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("gcd", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8Sum<M0 extends types.Int8<any> | string>(arg0: M0): types.Numeric<1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("int8_sum", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  lcm<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("lcm", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ln(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("ln", [this, ...__rest], __rt) as any; }
  log(): types.Numeric<N>;
  log<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  log(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Numeric], [[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("log", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  log10(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("log10", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  minScale(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("min_scale", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  mod<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("mod", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numeric<M0 extends types.Int4<any> | number>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericAbs(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericDivTrunc<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric_div_trunc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericExp(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_exp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericInc(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_inc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericLarger<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric_larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericLn(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_ln", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericLog<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric_log", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("numeric_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericSmaller<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("numeric_smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numericSqrt(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric_sqrt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numrangeSubdiff<M0 extends types.Numeric<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("numrange_subdiff", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgLsn(): types.PgLsn<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.PgLsn]]); return runtime.PgFunc("pg_lsn", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgSizePretty(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("pg_size_pretty", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pow<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("pow", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  power<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("power", [this, ...__rest], __rt) as any; }
  round<M0 extends types.Int4<any> | number>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  round(): types.Numeric<N>;
  @tool.unchecked()
  round(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Numeric], [[], types.Numeric]]); return runtime.PgFunc("round", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  scale(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("scale", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sign(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("sign", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sqrt(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("sqrt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  trimScale(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("trim_scale", [this, ...__rest], __rt) as any; }
  trunc(): types.Numeric<N>;
  trunc<M0 extends types.Int4<any> | number>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  trunc(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Numeric], [[{ type: types.Int4, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("trunc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  widthBucket<M0 extends types.Numeric<any> | string, M1 extends types.Numeric<any> | string, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Numeric, allowPrimitive: true }, { type: types.Numeric, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("width_bucket", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  avg(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("avg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
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
  generateSeries<M0 extends types.Numeric<any> | string, M1 extends types.Numeric<any> | string>(arg0: M0, arg1: M1): runtime.PgSrf<{ generate_series: types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_series">;
  generateSeries<M0 extends types.Numeric<any> | string>(arg0: M0): runtime.PgSrf<{ generate_series: types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "generate_series">;
  @tool.unchecked()
  generateSeries(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Numeric, allowPrimitive: true }, { type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return new runtime.PgSrf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  @tool.unchecked()
  ['%']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`%`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['*']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  times<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.PgLsn<any>>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.PgLsn }], types.PgLsn]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.PgLsn<any>>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.PgLsn }], types.PgLsn]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['-']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  minus<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['/']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  divide<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['^']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`^`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
