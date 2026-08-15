// BLOB storage-class view — hand-written behavior over the generated
// method surface (../generated/blob.ts). Uint8Array instances are the
// accepted primitive (instanceof, not typeof), and blobs come back as
// Uint8Array too: the driver normalizes result blobs to \x-prefixed
// hex (PG bytea repr — see driver.ts normalizeValue), which
// deserialize() parses back to bytes.
import { hexToBytes } from "../../../util";
import { Blob as Generated } from "../generated/blob";

export class Blob<in out N extends number> extends Generated<N> {
  static override acceptsPrimitive(v: unknown): boolean { return v instanceof Uint8Array; }
  override deserialize(raw: string): Uint8Array {
    if (!raw.startsWith("\\x")) { throw new TypeError("SQLite BLOB must use \\x-prefixed hex"); }
    return hexToBytes(raw.slice(2));
  }
}
