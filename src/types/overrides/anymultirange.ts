import { Anymultirange as Generated } from "../generated/anymultirange";
import type { Any } from "../index";

// See note in anyrange.ts — raw literal only.
export class Anymultirange<T extends Any<any>, N extends number> extends Generated<T, N> {
  declare deserialize: (raw: string) => string;
}
