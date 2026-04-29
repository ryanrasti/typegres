// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anyelement } from "../generated/anyelement";
import * as types from "../index";

export class Anycompatiblearray<T extends types.Any<any>, in out N extends number> extends Anyelement<N> {
  @tool.unchecked()
  arrayAppend<M0 extends T | runtime.TsTypeOf<T>>(arg0: M0): types.Anycompatiblearray<T, 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anycompatible, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("array_append", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayCat<M0 extends types.Anycompatiblearray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anycompatiblearray<T, 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anycompatiblearray, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("array_cat", [this, ...__rest], __rt) as any; }
  arrayPosition<M0 extends T, M1 extends types.Int4<any>>(arg0: M0, arg1: M1): types.Int4<1>;
  arrayPosition<M0 extends T | runtime.TsTypeOf<T>>(arg0: M0): types.Int4<1>;
  @tool.unchecked()
  arrayPosition(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Anycompatible, allowPrimitive: true }, { type: types.Int4 }], types.Int4], [[{ type: types.Anycompatible, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("array_position", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayRemove<M0 extends T | runtime.TsTypeOf<T>>(arg0: M0): types.Anycompatiblearray<T, 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anycompatible, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("array_remove", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  arrayReplace<M0 extends T | runtime.TsTypeOf<T>, M1 extends T | runtime.TsTypeOf<T>>(arg0: M0, arg1: M1): types.Anycompatiblearray<T, 1> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Anycompatible, allowPrimitive: true }, { type: types.Anycompatible, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("array_replace", [this, ...__rest], __rt) as any; }
  ['||']<M0 extends types.Anycompatiblearray<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anycompatiblearray<T, runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['||']<M0 extends T | runtime.TsTypeOf<T>>(arg0: M0): types.Anycompatiblearray<T, runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['||'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anycompatiblearray, allowPrimitive: true }], runtime.pgType(this)], [[{ type: types.Anycompatible, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
