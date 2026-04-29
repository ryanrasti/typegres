// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Float8<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Float8;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Float8<0 | 1>;
    __nonNullable: Float8<1>;
    __aggregate: Float8<number>;
    __any: Float8<any>;
  };
  static __typname = runtime.sql`float8`;
  static __typnameText = "float8";
  declare deserialize: (raw: string) => number;
  @tool.unchecked()
  abs(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  acos(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("acos", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  acosd(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("acosd", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  acosh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("acosh", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  asin(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("asin", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  asind(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("asind", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  asinh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("asinh", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  atan(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("atan", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  atan2<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("atan2", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  atan2D<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("atan2d", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  atand(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("atand", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  atanh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("atanh", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  cbrt(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("cbrt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ceil(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("ceil", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ceiling(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("ceiling", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  cos(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("cos", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  cosd(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("cosd", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  cosh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("cosh", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  cot(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("cot", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  cotd(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("cotd", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dcbrt(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("dcbrt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  degrees(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("degrees", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dexp(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("dexp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dlog1(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("dlog1", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dlog10(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("dlog10", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dround(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("dround", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dsqrt(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("dsqrt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  dtrunc(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("dtrunc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  erf(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("erf", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  erfc(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("erfc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  exp(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("exp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("float4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8Abs(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("float8abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8Larger<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("float8larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("float8send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8Smaller<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("float8smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  floor(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("floor", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ln(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("ln", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  log(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("log", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  log10(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("log10", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pow<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("pow", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  power<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("power", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  radians(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("radians", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  round(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("round", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sign(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("sign", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sin(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("sin", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sind(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("sind", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sinh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("sinh", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sqrt(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("sqrt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tan(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("tan", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tand(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("tand", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tanh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("tanh", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  toTimestamp(): types.Timestamptz<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timestamptz]]); return runtime.PgFunc("to_timestamp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  trunc(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("trunc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  widthBucket<M0 extends types.Float8<any> | number, M1 extends types.Float8<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Float8, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("width_bucket", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  avg(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("avg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  corr<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("corr", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  covarPop<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("covar_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  covarSamp<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("covar_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  percentileCont<M0 extends types.Interval<any>>(arg0: M0): types.Interval<0 | 1>;
  percentileCont<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1>;
  @tool.unchecked()
  percentileCont(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Interval], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("percentile_cont", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  percentileDisc<M0 extends types.Anyelement<any>>(arg0: M0): types.Anyelement<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyelement, allowPrimitive: true }], types.Anyelement]]); return runtime.PgFunc("percentile_disc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrAvgx<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("regr_avgx", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrAvgy<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("regr_avgy", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrCount<M0 extends types.Float8<any> | number>(arg0: M0): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Int8]]); return runtime.PgFunc("regr_count", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrIntercept<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("regr_intercept", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrR2<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("regr_r2", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrSlope<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("regr_slope", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrSxx<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("regr_sxx", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrSxy<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("regr_sxy", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regrSyy<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("regr_syy", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddev(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("stddev", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddevPop(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("stddev_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddevSamp(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("stddev_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sum(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("sum", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  varPop(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("var_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  varSamp(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("var_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  variance(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("variance", [this, ...__rest], __rt) as any; }
  ['*']<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Interval<any>>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Float4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['*'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Money }], types.Money], [[{ type: types.Float8, allowPrimitive: true }], types.Float8], [[{ type: types.Interval }], types.Interval], [[{ type: types.Float4, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  times<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Interval<any>>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Float4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  times(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Money }], types.Money], [[{ type: types.Float8, allowPrimitive: true }], types.Float8], [[{ type: types.Interval }], types.Interval], [[{ type: types.Float4, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Float4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Float8], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Float4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Float8], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Float4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Float4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['/']<M0 extends types.Float4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['/'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Float8], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  divide<M0 extends types.Float4<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  divide(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Float8], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['^']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.PgOp(runtime.sql`^`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
