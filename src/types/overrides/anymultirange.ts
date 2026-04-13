import { Anymultirange as Generated } from "../generated/anymultirange";
import type { Any } from "../index";

export class Anymultirange<T extends Any<any>, N extends number> extends Generated<T, N> {
  static __element: unknown;

  static of<T>(element: T) {
    return class extends (this as any) {
      static __element = element;
    };
  }
}
