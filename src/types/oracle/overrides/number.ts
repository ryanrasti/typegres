import { Number as Generated } from "../generated/number";

// Oracle NUMBER has up to 38 decimal digits. Accept JS numbers for
// parameters, but hydrate as string so large/decimal values stay exact.
export class Number<in out N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  declare deserialize: (raw: string) => string;
}
