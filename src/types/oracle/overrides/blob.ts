import { hexToBytes } from "../../../util";
import { Blob as Generated } from "../generated/blob";

export class Blob<in out N extends number> extends Generated<N> {
  static override acceptsPrimitive(v: unknown): boolean { return v instanceof Uint8Array; }
  override deserialize(raw: string): Uint8Array { return hexToBytes(raw); }
}
