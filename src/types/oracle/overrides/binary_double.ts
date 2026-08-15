import { BinaryDouble as Generated } from "../generated/binary_double";

export class BinaryDouble<in out N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseFloat(raw); }
}
