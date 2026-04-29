// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Any } from "../overrides/any";
import * as types from "../index";

export class Anycompatible<in out N extends number> extends Any<N> {
  @tool.unchecked()
  arrayPrepend<M0 extends types.Anycompatiblearray<types.Any<any>, any>>(arg0: M0): types.Anycompatiblearray<types.Any<any>, 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anycompatiblearray, allowPrimitive: true }], types.Anycompatiblearray]]); return runtime.PgFunc("array_prepend", [this, ...__rest], __rt) as any; }
}
