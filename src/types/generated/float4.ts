// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Float4<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Float4;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Float4<0 | 1>;
    __nonNullable: Float4<1>;
    __aggregate: Float4<number>;
    __any: Float4<any>;
  };
  static __typname = runtime.sql`float4`;
  static __typnameText = "float4";
  declare deserialize: (raw: string) => number;
  @tool.unchecked()
  abs(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4Abs(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("float4abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4Larger<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgFunc("float4larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("float4send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4Smaller<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgFunc("float4smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("float8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  avg(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("avg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Float4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Float4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddev(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("stddev", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddevPop(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("stddev_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddevSamp(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("stddev_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sum(): types.Float4<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("sum", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  varPop(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("var_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  varSamp(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("var_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  variance(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("variance", [this, ...__rest], __rt) as any; }
  ['*']<M0 extends types.Money<any> | string>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Float8<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['*'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Money, allowPrimitive: true }], types.Money], [[{ type: types.Float8 }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  times<M0 extends types.Money<any> | string>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Float8<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  times(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Money, allowPrimitive: true }], types.Money], [[{ type: types.Float8 }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Float8<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Float8<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Float8<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Float8<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['/']<M0 extends types.Float8<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['/'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  divide<M0 extends types.Float8<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Float4<any> | number>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  divide(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Float8], [[{ type: types.Float4, allowPrimitive: true }], types.Float4]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8 }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8 }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8 }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8 }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8 }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float4, allowPrimitive: true }], types.Bool], [[{ type: types.Float8 }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Float8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Float4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8 }], types.Bool], [[{ type: types.Float4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
