import { Oid as Generated } from "../generated/oid";

export class Oid<N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseInt(raw, 10); }
}
