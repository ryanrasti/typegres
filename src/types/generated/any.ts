// Auto-generated — do not edit
import * as runtime from "../runtime";
import { expose } from "../../exoeval/tool";
import * as types from "../index";

export class Any<in out N extends number> {
  @expose.unchecked()
  numNonnulls(): types.Int4<1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("num_nonnulls", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numNulls(): types.Int4<1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("num_nulls", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  count(): types.Int8<1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("count", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  cumeDist(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("cume_dist", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  denseRank(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("dense_rank", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonObjectAgg<M0 extends types.Any<any> | string>(arg0: M0): types.Json<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Json]]); return runtime.PgFunc("json_object_agg", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonObjectAggStrict<M0 extends types.Any<any> | string>(arg0: M0): types.Json<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Json]]); return runtime.PgFunc("json_object_agg_strict", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonObjectAggUnique<M0 extends types.Any<any> | string>(arg0: M0): types.Json<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Json]]); return runtime.PgFunc("json_object_agg_unique", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonObjectAggUniqueStrict<M0 extends types.Any<any> | string>(arg0: M0): types.Json<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Json]]); return runtime.PgFunc("json_object_agg_unique_strict", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbObjectAgg<M0 extends types.Any<any> | string>(arg0: M0): types.Jsonb<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_object_agg", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbObjectAggStrict<M0 extends types.Any<any> | string>(arg0: M0): types.Jsonb<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_object_agg_strict", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbObjectAggUnique<M0 extends types.Any<any> | string>(arg0: M0): types.Jsonb<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_object_agg_unique", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbObjectAggUniqueStrict<M0 extends types.Any<any> | string>(arg0: M0): types.Jsonb<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Any, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_object_agg_unique_strict", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  percentRank(): types.Float8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("percent_rank", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rank(): types.Int8<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("rank", [this, ...__rest], __rt) as any; }
}
