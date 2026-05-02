// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anycompatiblearray } from "../overrides/anycompatiblearray";
import * as types from "../index";

export class Anyarray<T extends types.Any<any>, in out N extends number> extends Anycompatiblearray<T, N> {
  @tool.unchecked()
  arrayDims(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("array_dims", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayLarger<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyarray<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("array_larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayLength<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("array_length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayLower<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("array_lower", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayNdims(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("array_ndims", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arraySmaller<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyarray<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("array_smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayUpper<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("array_upper", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arraycontained<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("arraycontained", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arraycontains<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("arraycontains", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayoverlap<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("arrayoverlap", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  cardinality(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("cardinality", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  trimArray<M0 extends types.Int4<any> | number>(arg0: M0): types.Anyarray<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("trim_array", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayAgg(): types.Anyarray<T, 0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgType(this)]]); return runtime.PgFunc("array_agg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Anyarray<T, 0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgType(this)]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Anyarray<T, 0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgType(this)]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  generateSubscripts<M0 extends types.Int4<any> | number, M1 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1): runtime.PgSrf<{ generate_subscripts: types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_subscripts">;
  generateSubscripts<M0 extends types.Int4<any> | number>(arg0: M0): runtime.PgSrf<{ generate_subscripts: types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "generate_subscripts">;
  @tool.unchecked()
  generateSubscripts(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Int4], [[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return new runtime.PgSrf("generate_subscripts", [this, ...__rest], [["generate_subscripts", __rt]]) as any; }
  @tool.unchecked()
  unnest(): runtime.PgSrf<{ unnest: T }, "unnest"> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgElement(this)]]); return new runtime.PgSrf("unnest", [this, ...__rest], [["unnest", __rt]]) as any; }
  @tool.unchecked()
  ['&&']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<@']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@>']<M0 extends types.Anyarray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyarray, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
