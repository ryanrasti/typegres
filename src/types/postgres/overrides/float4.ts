import { Float4 as Generated } from "../generated/float4";

// parseFloat handles NaN, Infinity, -Infinity natively — same as pg's
// text representation for these edge cases.
export class Float4<N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseFloat(raw); }
}
