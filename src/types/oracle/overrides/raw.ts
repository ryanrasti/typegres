import { hexToBytes } from "../../../util";
import { Raw as Generated } from "../generated/raw";

export class Raw<in out N extends number> extends Generated<N> {
  static override acceptsPrimitive(v: unknown): boolean { return v instanceof Uint8Array; }
  override deserialize(raw: string): Uint8Array { return hexToBytes(raw); }
}
