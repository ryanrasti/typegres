import { Anycompatiblemultirange as Generated } from "../generated/anycompatiblemultirange";
import type { Any } from "../index";

// See note in anyrange.ts — raw literal only.
export class Anycompatiblemultirange<T extends Any<any>, N extends number> extends Generated<T, N> {
  declare deserialize: (raw: string) => string;
}
