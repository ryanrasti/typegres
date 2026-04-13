import type { TsTypeOf } from "../runtime";
import { Anyarray as Generated } from "../generated/anyarray";
import type { Any } from "../index";

export class Anyarray<T extends Any<number>, N extends number> extends Generated<T, N> {
  static __element: unknown;
  deserialize(raw: unknown): TsTypeOf<T>[] { return raw as TsTypeOf<T>[]; }

  static of<T>(element: T) {
    return class extends (this as any) {
      static __element = element;
    };
  }
}
