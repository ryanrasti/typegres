// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anycompatiblemultirange } from "../generated/anycompatiblemultirange";
import * as types from "../index";

export class Anymultirange<T extends types.Any<any>, in out N extends number> extends Anycompatiblemultirange<T, N> {
  @tool.unchecked()
  isempty(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("isempty", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  lower(): T { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgElement(this)]]); return runtime.PgFunc("lower", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  lowerInc(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("lower_inc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  lowerInf(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("lower_inf", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeAdjacentMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_adjacent_multirange", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeAdjacentRange<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_adjacent_range", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeAfterMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_after_multirange", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeAfterRange<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_after_range", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeBeforeMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_before_multirange", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeBeforeRange<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_before_range", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeContainedByMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_contained_by_multirange", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeContainedByRange<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_contained_by_range", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeContainsElem<M0 extends T | runtime.TsTypeOf<T>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyelement, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_contains_elem", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeContainsMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_contains_multirange", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeContainsRange<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_contains_range", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeIntersectAggTransfn<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anymultirange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("multirange_intersect_agg_transfn", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeOverlapsMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_overlaps_multirange", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeOverlapsRange<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_overlaps_range", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeOverleftMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_overleft_multirange", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeOverleftRange<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_overleft_range", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeOverrightMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_overright_multirange", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  multirangeOverrightRange<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("multirange_overright_range", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  rangeMerge(): types.Anyrange<T, N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Anyrange]]); return runtime.PgFunc("range_merge", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  upper(): T { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgElement(this)]]); return runtime.PgFunc("upper", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  upperInc(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("upper_inc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  upperInf(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("upper_inf", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  rangeAgg(): types.Anymultirange<T, 0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgType(this)]]); return runtime.PgFunc("range_agg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  rangeIntersectAgg(): types.Anymultirange<T, 0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgType(this)]]); return runtime.PgFunc("range_intersect_agg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  unnest(): runtime.PgSrf<{ unnest: types.Anyrange<T, N> }, "unnest"> { const [__rt, ...__rest] = runtime.match([], [[[], types.Anyrange]]); return new runtime.PgSrf("unnest", [this, ...__rest], [["unnest", __rt]]) as any; }
  ['&&']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['&&']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['&&'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool], [[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['&<']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['&<']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['&<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['&>']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['&>']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['&>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool], [[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['*']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anymultirange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  times<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anymultirange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['+']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anymultirange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  plus<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anymultirange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['-']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anymultirange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  minus<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anymultirange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-|-']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-|-']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-|-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool], [[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`-|-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<<']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<<']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<@']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<@']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['<@'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool], [[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>>']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>>']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['>>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['@>']<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['@>']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['@>']<M0 extends T | runtime.TsTypeOf<T>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['@>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool], [[{ type: types.Anyelement, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
