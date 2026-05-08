// Auto-generated — do not edit
import * as runtime from "../runtime";
import { expose } from "../../exoeval/tool";
import { Anycompatiblerange } from "../generated/anycompatiblerange";
import * as types from "../index";

export class Anyrange<T extends types.Any<any>, in out N extends number> extends Anycompatiblerange<T, N> {
  @expose.unchecked()
  lower(): T { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgElement(this)]]); return runtime.PgFunc("lower", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  lowerInc(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("lower_inc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  lowerInf(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("lower_inf", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  multirange(): types.Anymultirange<T, N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Anymultirange]]); return runtime.PgFunc("multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeAdjacent<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_adjacent", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeAdjacentMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_adjacent_multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeAfter<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_after", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeAfterMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_after_multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeBefore<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_before", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeBeforeMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_before_multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeContainedBy<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_contained_by", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeContainedByMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_contained_by_multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeContainsElem<M0 extends T | runtime.TsTypeOf<T>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyelement, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_contains_elem", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeContainsMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_contains_multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeIntersectAggTransfn<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyrange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("range_intersect_agg_transfn", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeOverlaps<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_overlaps", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeOverlapsMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_overlaps_multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeOverleft<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_overleft", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeOverleftMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_overleft_multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeOverright<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_overright", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeOverrightMultirange<M0 extends types.Anymultirange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("range_overright_multirange", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  upper(): T { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgElement(this)]]); return runtime.PgFunc("upper", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  upperInc(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("upper_inc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  upperInf(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("upper_inf", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeAgg(): types.Anymultirange<T, 0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Anymultirange]]); return runtime.PgFunc("range_agg", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rangeIntersectAgg(): types.Anyrange<T, 0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgType(this)]]); return runtime.PgFunc("range_intersect_agg", [this, ...__rest], __rt) as any; }
  ['&&']<M0 extends types.Anymultirange<T, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['&&']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['&&'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['&<']<M0 extends types.Anymultirange<T, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['&<']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['&<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['&>']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['&>']<M0 extends types.Anymultirange<T, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['&>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool], [[{ type: types.Anymultirange }], types.Bool]]); return runtime.PgOp(runtime.sql`&>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['*']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyrange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  times<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyrange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['+']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyrange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  plus<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyrange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['-']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyrange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  minus<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Anyrange<T, runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-|-']<M0 extends types.Anymultirange<T, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-|-']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['-|-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`-|-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<<']<M0 extends types.Anymultirange<T, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<<']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<@']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<@']<M0 extends types.Anymultirange<T, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['<@'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool], [[{ type: types.Anymultirange }], types.Bool]]); return runtime.PgOp(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>>']<M0 extends types.Anymultirange<T, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>>']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['>>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['@>']<M0 extends T>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['@>']<M0 extends types.Anymultirange<T, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['@>']<M0 extends types.Anyrange<T, any> | runtime.TsTypeOf<T>[]>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['@>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyelement }], types.Bool], [[{ type: types.Anymultirange }], types.Bool], [[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
