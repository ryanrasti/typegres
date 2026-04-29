// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Int2<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Int2;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Int2<0 | 1>;
    __nonNullable: Int2<1>;
    __aggregate: Int2<number>;
    __any: Int2<any>;
  };
  static __typname = runtime.sql`int2`;
  static __typnameText = "int2";
  declare deserialize: (raw: string) => number;
  @tool.unchecked()
  abs(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("float4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("float8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Abs(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2abs", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2And<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgFunc("int2and", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Larger<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgFunc("int2larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Not(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2not", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Or<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgFunc("int2or", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Send(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("int2send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Shl<M0 extends types.Int4<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int2]]); return runtime.PgFunc("int2shl", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Shr<M0 extends types.Int4<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int2]]); return runtime.PgFunc("int2shr", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Smaller<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgFunc("int2smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2Xor<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgFunc("int2xor", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  mod<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgFunc("mod", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  avg(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("avg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bitAnd(): types.Int2<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("bit_and", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bitOr(): types.Int2<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("bit_or", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bitXor(): types.Int2<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("bit_xor", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Int2<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Int2<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddev(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddevPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stddevSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("stddev_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sum(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("sum", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  varPop(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("var_pop", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  varSamp(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("var_samp", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  variance(): types.Numeric<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("variance", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ['#']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgOp(runtime.sql`#`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['%']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgOp(runtime.sql`%`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['&']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgOp(runtime.sql`&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['*']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['*']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['*'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2], [[{ type: types.Money }], types.Money], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  times<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Money<any>>(arg0: M0): types.Money<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  times<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  times(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2], [[{ type: types.Money }], types.Money], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Int8], [[{ type: types.Int2, allowPrimitive: true }], types.Int2], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Int8], [[{ type: types.Int2, allowPrimitive: true }], types.Int2], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2], [[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['/']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['/']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['/'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8], [[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  divide<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Int8<any>>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  divide<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  divide(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Int8 }], types.Int8], [[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgOp(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<<']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int2]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Bool], [[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Int8<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Int4<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Int2<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Bool], [[{ type: types.Int4, allowPrimitive: true }], types.Bool], [[{ type: types.Int2, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int2]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['|']<M0 extends types.Int2<any> | number>(arg0: M0): types.Int2<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int2, allowPrimitive: true }], types.Int2]]); return runtime.PgOp(runtime.sql`|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
