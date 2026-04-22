// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anycompatible } from "../generated/anycompatible";
import * as types from "../index";

export class Anyelement<in out N extends number> extends Anycompatible<N> {
  anyValueTransfn<M0 extends types.Anyelement<any>>(arg0: M0): types.Anyelement<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyelement, allowPrimitive: true }], runtime.pgType(this)]]); return runtime.PgFunc("any_value_transfn", [this, ...__rest], __rt) as any; }
  elemContainedByMultirange<M0 extends types.Anymultirange<types.Any<any>, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anymultirange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("elem_contained_by_multirange", [this, ...__rest], __rt) as any; }
  elemContainedByRange<M0 extends types.Anyrange<types.Any<any>, any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anyrange, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("elem_contained_by_range", [this, ...__rest], __rt) as any; }
  anyValue(): types.Anyelement<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgType(this)]]); return runtime.PgFunc("any_value", [this, ...__rest], __rt) as any; }
  jsonAgg(): types.Json<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Json]]); return runtime.PgFunc("json_agg", [this, ...__rest], __rt) as any; }
  jsonAggStrict(): types.Json<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Json]]); return runtime.PgFunc("json_agg_strict", [this, ...__rest], __rt) as any; }
  jsonbAgg(): types.Jsonb<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Jsonb]]); return runtime.PgFunc("jsonb_agg", [this, ...__rest], __rt) as any; }
  jsonbAggStrict(): types.Jsonb<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Jsonb]]); return runtime.PgFunc("jsonb_agg_strict", [this, ...__rest], __rt) as any; }
  mode(): types.Anyelement<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], runtime.pgType(this)]]); return runtime.PgFunc("mode", [this, ...__rest], __rt) as any; }
}
