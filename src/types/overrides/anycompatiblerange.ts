import { Anycompatiblerange as Generated } from "../generated/anycompatiblerange";
import type { Any } from "../index";

// See note in anyrange.ts — raw literal only.
export class Anycompatiblerange<T extends Any<any>, N extends number> extends Generated<T, N> {
  declare deserialize: (raw: string) => string;
}
