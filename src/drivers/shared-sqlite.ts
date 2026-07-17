// Shared sqlite driver helpers (better-sqlite3 + SqlStorage).
// No optional peer imports — safe for workerd.

// Strip one outer pair of parentheses iff they balance to enclose the
// entire string. `(SELECT 1)` → `SELECT 1`; `(SELECT 1) UNION (SELECT 2)`
// stays as-is. QueryBuilder.bind() wraps statements in `(...)` for
// subquery splicing; SQLite refuses top-level parenthesized statements.
export const stripMatchedOuterParens = (s: string): string => {
  const t = s.trim();
  if (!t.startsWith("(") || !t.endsWith(")")) {return s;}
  let depth = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === "(") {depth++;}
    else if (t[i] === ")") {
      depth--;
      if (depth === 0 && i !== t.length - 1) {return s;}
    }
  }
  return t.slice(1, -1);
};

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
