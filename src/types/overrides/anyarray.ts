import { Anyarray as Generated } from "../generated/anyarray.js";
import type { Any } from "../index.js";

export class Anyarray<T extends Any<number>, N extends number> extends Generated<T, N> {
  declare __tsType: T["__tsType"][];
  static __element: unknown;

  static of<T>(element: T) {
    return class extends (this as any) {
      static __element = element;
    };
  }
}
