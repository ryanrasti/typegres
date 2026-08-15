import { BinaryFloat as Generated } from "../generated/binary_float";

export class BinaryFloat<in out N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseFloat(raw); }
}
