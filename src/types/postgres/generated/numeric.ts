// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Numeric<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
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
  @expose.unchecked()
  abs(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("abs", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ceil(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("ceil", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ceiling(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("ceiling", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  div<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("div", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  exp(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("exp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.funcCall("float4", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("float8", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  floor(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("floor", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  gcd<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("gcd", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.funcCall("int2", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("int4", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.funcCall("int8", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int8Sum<M0 extends types.Int8<any> | string>(arg0: M0): types.Numeric<1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("int8_sum", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  lcm<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("lcm", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ln(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("ln", [this, ...__rest], __rt) as any; }
  log(): types.Numeric<N>;
  log<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  log(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Numeric], [[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("log", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  log10(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("log10", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  minScale(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("min_scale", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  mod<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("mod", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numeric<M0 extends types.Int4<any> | number>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("numeric", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericAbs(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("numeric_abs", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericDivTrunc<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("numeric_div_trunc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericExp(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("numeric_exp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericInc(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("numeric_inc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericLarger<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("numeric_larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericLn(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("numeric_ln", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericLog<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("numeric_log", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("numeric_send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericSmaller<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("numeric_smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numericSqrt(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("numeric_sqrt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numrangeSubdiff<M0 extends types.Numeric<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Float8]]); return runtime.funcCall("numrange_subdiff", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  pgLsn(): types.PgLsn<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.PgLsn]]); return runtime.funcCall("pg_lsn", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  pgSizePretty(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("pg_size_pretty", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  pow<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("pow", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  power<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("power", [this, ...__rest], __rt) as any; }
  round<M0 extends types.Int4<any> | number>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  round(): types.Numeric<N>;
  @expose.unchecked()
  round(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Numeric], [[], types.Numeric]]); return runtime.funcCall("round", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  scale(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("scale", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sign(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("sign", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sqrt(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("sqrt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  trimScale(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("trim_scale", [this, ...__rest], __rt) as any; }
  trunc(): types.Numeric<N>;
  trunc<M0 extends types.Int4<any> | number>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  trunc(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Numeric], [[{ type: types.Int4, allowPrimitive: true }], types.Numeric]]); return runtime.funcCall("trunc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  widthBucket<M0 extends types.Numeric<any> | string, M1 extends types.Numeric<any> | string, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Numeric, allowPrimitive: true }, { type: types.Numeric, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("width_bucket", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  avg(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("avg", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddev(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("stddev", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddevPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("stddev_pop", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stddevSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("stddev_samp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sum(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("sum", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  varPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("var_pop", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  varSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("var_samp", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  variance(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("variance", [this, ...__rest], __rt) as any; }
  generateSeries<M0 extends types.Numeric<any> | string, M1 extends types.Numeric<any> | string>(arg0: M0, arg1: M1): runtime.Srf<{ generate_series: types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_series">;
  generateSeries<M0 extends types.Numeric<any> | string>(arg0: M0): runtime.Srf<{ generate_series: types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "generate_series">;
  @expose.unchecked()
  generateSeries(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Numeric, allowPrimitive: true }, { type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return new runtime.Srf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  @expose.unchecked()
  ['%']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.opCall(runtime.sql`%`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['*']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.opCall(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  times<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.opCall(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.PgLsn<any>>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.PgLsn }], types.PgLsn]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.PgLsn<any>>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric], [[{ type: types.PgLsn }], types.PgLsn]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['-']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  minus<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['/']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.opCall(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  divide<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.opCall(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Numeric<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['^']<M0 extends types.Numeric<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.Numeric]]); return runtime.opCall(runtime.sql`^`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
