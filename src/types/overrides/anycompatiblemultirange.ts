import type { TsTypeOf } from "../runtime";
import { Anycompatiblemultirange as Generated } from "../generated/anycompatiblemultirange";
import type { Any } from "../index";

export class Anycompatiblemultirange<T extends Any<number>, N extends number> extends Generated<T, N> {
  static __element: unknown;

  deserialize(raw: string): [TsTypeOf<T>, TsTypeOf<T>][] {
    // pg multirange format: {[lower,upper),[lower,upper)}
    // strip outer { }
    const inner = raw.slice(1, -1);
    if (inner === "") { return []; }
    // split on ],[  or ),( boundaries between ranges
    const ranges: [TsTypeOf<T>, TsTypeOf<T>][] = [];
    const elDeser = (this.__class as any).__element.prototype.deserialize;
    // each range is [lower,upper) or similar
    const rangePattern = /[[(][^[\]()]*,\s*[^[\]()]*[\])]/g;
    let match;
    while ((match = rangePattern.exec(inner)) !== null) {
      const r = match[0];
      const rInner = r.slice(1, -1);
      const commaIdx = rInner.indexOf(",");
      const lower = rInner.slice(0, commaIdx);
      const upper = rInner.slice(commaIdx + 1);
      ranges.push([elDeser(lower), elDeser(upper)] as [TsTypeOf<T>, TsTypeOf<T>]);
    }
    return ranges;
  }

  static of<T>(element: T) {
    return class extends (this as any) {
      static __element = element;
    };
  }
}
