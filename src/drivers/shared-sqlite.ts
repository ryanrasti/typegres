// Shared sqlite driver helpers (better-sqlite3 + SqlStorage).
// No optional peer imports — safe for workerd.

// PG bytea text-protocol form. Pure JS so it runs in workerd (no Buffer).
const toHex = (bytes: Uint8Array): string => {
  let s = "\\x";
  for (const b of bytes) {s += b.toString(16).padStart(2, "0");}
  return s;
};

// Native driver value → the string form typegres's deserialize expects
// (PG text-protocol contract). Handles better-sqlite3 (Uint8Array/Buffer)
// and SqlStorage (ArrayBuffer) blobs.
export const normalizeValue = (v: unknown): string | null => {
  if (v === null || v === undefined) { return null; }
  if (typeof v === "string") { return v; }
  if (typeof v === "number" || typeof v === "bigint" || typeof v === "boolean") { return String(v); }
  if (v instanceof ArrayBuffer) { return toHex(new Uint8Array(v)); }
  if (v instanceof Uint8Array) { return toHex(v); }
  return String(v);
};

export const normalizeRow = (row: { [key: string]: unknown }): { [key: string]: string | null } =>
  Object.fromEntries(Object.entries(row).map(([k, v]) => [k, normalizeValue(v)]));
