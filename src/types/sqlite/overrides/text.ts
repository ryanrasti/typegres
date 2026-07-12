// TEXT storage-class view — hand-written behavior over the generated
// method surface (../generated/text.ts): the typeof narrowing for
// primitive args. Deserialization is the inherited identity — the
// declare only narrows the return type.
import { Text as Generated } from "../generated/text";

export class Text<in out N extends number> extends Generated<N> {
  static override primitiveTs = "string";
  // Restore typeof narrowing (Any's permissive acceptsPrimitive is
  // inherited by statics).
  static override acceptsPrimitive(v: unknown): boolean { return typeof v === "string"; }
  declare deserialize: (raw: string) => string;
}
