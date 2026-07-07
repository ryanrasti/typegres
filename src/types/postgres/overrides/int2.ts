import { Int2 as Generated } from "../generated/int2";

export class Int2<N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseInt(raw, 10); }
}
