import { Int4 as Generated } from "../generated/int4";

export class Int4<N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseInt(raw, 10); }
}
