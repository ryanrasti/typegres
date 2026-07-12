// REAL storage-class view — hand-written behavior over the generated
// method surface (../generated/real.ts): deserialization and the
// typeof narrowing for primitive args.
import { Real as Generated } from "../generated/real";

export class Real<in out N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  // Restore typeof narrowing (Any's permissive acceptsPrimitive is
  // inherited by statics).
  static override acceptsPrimitive(v: unknown): boolean { return typeof v === "number"; }
  override deserialize(raw: string): number { return parseFloat(raw); }
}
