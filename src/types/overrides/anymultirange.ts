import type { TsTypeOf } from "../runtime";
import { Anymultirange as Generated } from "../generated/anymultirange";
import type { Any } from "../index";

export class Anymultirange<T extends Any<number>, N extends number> extends Generated<T, N> {
  static __element: unknown;
  deserialize(raw: unknown): [TsTypeOf<T>, TsTypeOf<T>][] { return raw as [TsTypeOf<T>, TsTypeOf<T>][]; }

  static of<T>(element: T) {
    return class extends (this as any) {
      static __element = element;
    };
  }
}
