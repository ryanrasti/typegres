import { Float8 as Generated } from "../generated/float8";

export class Float8<N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseFloat(raw); }
}
