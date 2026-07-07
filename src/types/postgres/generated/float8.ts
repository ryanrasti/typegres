// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Float8<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof types.Float8;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: types.Float8<0 | 1>;
    __nonNullable: types.Float8<1>;
    __aggregate: types.Float8<number>;
    __any: types.Float8<any>;
  };
  static __typname = runtime.sql`float8`;
  static __typnameText = "float8";
  @expose.unchecked()
  abs(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("abs", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  acos(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("acos", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  acosd(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("acosd", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  acosh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("acosh", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  asin(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("asin", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  asind(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("asind", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  asinh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("asinh", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  atan(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("atan", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  atan2<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("atan2", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  atan2D<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("atan2d", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  atand(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("atand", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  atanh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("atanh", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  cbrt(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("cbrt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ceil(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("ceil", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ceiling(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("ceiling", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  cos(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("cos", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  cosd(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("cosd", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  cosh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("cosh", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  cot(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("cot", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  cotd(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("cotd", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  dcbrt(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("dcbrt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  degrees(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("degrees", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  dexp(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("dexp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  dlog1(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("dlog1", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  dlog10(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("dlog10", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  dround(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("dround", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  dsqrt(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("dsqrt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  dtrunc(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("dtrunc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  erf(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("erf", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  erfc(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("erfc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  exp(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("exp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.funcCall("float4", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float8Abs(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("float8abs", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float8Larger<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("float8larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float8Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("float8send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float8Smaller<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("float8smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  floor(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("floor", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.funcCall("int2", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("int4", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.funcCall("int8", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ln(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("ln", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  log(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("log", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  log10(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("log10", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("numeric", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  pow<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("pow", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  power<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("power", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  radians(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("radians", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  round(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("round", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sign(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("sign", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sin(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("sin", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sind(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("sind", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sinh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("sinh", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sqrt(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("sqrt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tan(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("tan", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tand(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("tand", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tanh(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("tanh", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  toTimestamp(): types.Timestamptz<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timestamptz]]); return runtime.funcCall("to_timestamp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  trunc(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("trunc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  widthBucket<M0 extends types.Float8<any> | number, M1 extends types.Float8<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Float8, allowPrimitive: true }, { type: types.Float8, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("width_bucket", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  avg(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("avg", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  corr<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("corr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  covarPop<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("covar_pop", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  covarSamp<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("covar_samp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  percentileCont<M0 extends types.Interval<any> | string>(arg0: M0): types.Interval<0 | 1>;
  percentileCont<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1>;
  @expose.unchecked()
  percentileCont(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Interval], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("percentile_cont", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  percentileDisc<M0 extends types.Anyelement<any>>(arg0: M0): types.Anyelement<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyelement, allowPrimitive: true }], types.Anyelement]]); return runtime.funcCall("percentile_disc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrAvgx<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("regr_avgx", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrAvgy<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("regr_avgy", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrCount<M0 extends types.Float8<any> | number>(arg0: M0): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Int8]]); return runtime.funcCall("regr_count", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrIntercept<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("regr_intercept", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrR2<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("regr_r2", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrSlope<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("regr_slope", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrSxx<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("regr_sxx", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrSxy<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("regr_sxy", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  regrSyy<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("regr_syy", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddev(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("stddev", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddevPop(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("stddev_pop", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddevSamp(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("stddev_samp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sum(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("sum", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  varPop(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("var_pop", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  varSamp(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("var_samp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  variance(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("variance", [this, ...__rest], __rt) as any; }
  ['*']<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Interval<any>>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Float4<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['*'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Money }], types.Money], [[{ type: types.Float8, allowPrimitive: true }], types.Float8], [[{ type: types.Interval }], types.Interval], [[{ type: types.Float4 }], types.Float8]]); return runtime.opCall(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  times<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Interval<any>>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Float4<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  times(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Money }], types.Money], [[{ type: types.Float8, allowPrimitive: true }], types.Float8], [[{ type: types.Interval }], types.Interval], [[{ type: types.Float4 }], types.Float8]]); return runtime.opCall(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Float4<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Float8], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Float4<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Float8], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Float4<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8], [[{ type: types.Float4 }], types.Float8]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Float4<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8], [[{ type: types.Float4 }], types.Float8]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['/']<M0 extends types.Float4<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['/'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Float8], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.opCall(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  divide<M0 extends types.Float4<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  divide(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Float8], [[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.opCall(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Bool], [[{ type: types.Float4 }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Bool], [[{ type: types.Float4 }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Bool], [[{ type: types.Float4 }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Bool], [[{ type: types.Float4 }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Float4<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Float8<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4 }], types.Bool], [[{ type: types.Float8, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['^']<M0 extends types.Float8<any> | number>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Float8]]); return runtime.opCall(runtime.sql`^`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
