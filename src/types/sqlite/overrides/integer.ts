// INTEGER storage-class view — hand-written behavior over the
// generated method surface (../generated/integer.ts): deserialization
// and the integral-number narrowing for primitive args.
import { Integer as Generated } from "../generated/integer";

export class Integer<in out N extends number> extends Generated<N> {
  // Codegen reads the type table's matching primitiveTs to build
  // `M0 extends Integer<any> | number` arg constraints.
  static override primitiveTs = "number";
  // Typed-position rule: an integer-claimed argument accepts a JS
  // number only when it IS an integer — fractional values never
  // silently truncate through CAST(? AS INTEGER); they either route
  // to a real overload or fail dispatch. Explicit truncation remains
  // available via Integer.from(x) / .cast(Integer).
  static override acceptsPrimitive(v: unknown): boolean { return typeof v === "number" && Number.isInteger(v); }
  override deserialize(raw: string): number { return parseInt(raw, 10); }
}
