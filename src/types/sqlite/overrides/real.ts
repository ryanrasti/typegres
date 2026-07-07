import { Real as Generated } from "../generated/real";

export class Real<N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseFloat(raw); }
}
