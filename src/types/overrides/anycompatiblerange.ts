import { meta, type TsTypeOf } from "../runtime";
import { Anycompatiblerange as Generated } from "../generated/anycompatiblerange";
import type { Any } from "../index";

export class Anycompatiblerange<T extends Any<any>, N extends number> extends Generated<T, N> {
  static __element: unknown;

  deserialize(raw: string): [TsTypeOf<T>, TsTypeOf<T>] {
    // pg range format: [lower,upper) or (lower,upper] etc.
    // strip bounds characters
    const inner = raw.slice(1, -1);
    const commaIdx = inner.indexOf(",");
    const lower = inner.slice(0, commaIdx);
    const upper = inner.slice(commaIdx + 1);
    const elDeser = (this[meta].__class as any).__element.prototype.deserialize;
    return [elDeser(lower), elDeser(upper)] as [TsTypeOf<T>, TsTypeOf<T>];
  }

  static of<T>(element: T) {
    return class extends (this as any) {
      static __element = element;
    };
  }
}
