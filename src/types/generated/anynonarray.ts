// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anycompatiblenonarray } from "../generated/anycompatiblenonarray";
import * as types from "../index";

export class Anynonarray<in out N extends number> extends Anycompatiblenonarray<N> {
  arrayAgg(): types.Anyarray<types.Any<any>, 0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Anyarray]]); return runtime.PgFunc("array_agg", [this, ...__rest], __rt) as any; }
}
