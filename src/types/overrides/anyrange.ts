import type { TsTypeOf } from "../runtime";
import { Anyrange as Generated } from "../generated/anyrange";
import type { Any } from "../index";

export class Anyrange<T extends Any<number>, N extends number> extends Generated<T, N> {
  static __element: unknown;
  deserialize(raw: unknown): [TsTypeOf<T>, TsTypeOf<T>] { return raw as [TsTypeOf<T>, TsTypeOf<T>]; }

  static of<T>(element: T) {
    return class extends (this as any) {
      static __element = element;
    };
  }
}
