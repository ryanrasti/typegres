import type { Driver } from "typegres";

// A typegres Driver over Cloudflare's SqlStorage (a Durable Object's SQLite).
// Built and tested here in the example; promote to typegres core once proven.
//
// The contract is nailed down by test/sqlstorage.probe.test.ts. In short:
//   - SqlStorage binds numbers as REAL (integer affinity comes from the
//     sqlite dialect's CAST, same as the better-sqlite3 driver);
//   - it REJECTS BigInt, so typegres's boolean 0n/1n must be down-converted
//     to plain 0/1 before exec();
//   - results are native JS values (number / string / ArrayBuffer / null),
//     which we normalize to strings for typegres's deserialize layer.

// Derive the driver's sub-types from the exported Driver interface, so the
// example needs no deep imports into typegres internals.
type CompiledSql = Parameters<Driver["execute"]>[0];
type QueryResult = Awaited<ReturnType<Driver["execute"]>>;
type ExecuteFn = Driver["execute"];

// Duck-typed SqlStorage so this file needs no @cloudflare/workers-types.
export interface SqlStorageLike {
  exec(query: string, ...bindings: unknown[]): { toArray(): Record<string, unknown>[] };
}

// QueryBuilder.bind() wraps its output in `(...)` for subquery splicing;
// SQLite refuses to prepare a top-level parenthesized statement, so unwrap a
// single *matched* outer pair (mirrors the better-sqlite3 driver).
const stripMatchedOuterParens = (s: string): string => {
  const t = s.trim();
  if (!t.startsWith("(") || !t.endsWith(")")) return s;
  let depth = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === "(") depth++;
    else if (t[i] === ")") {
      depth--;
      if (depth === 0 && i !== t.length - 1) return s;
    }
  }
  return t.slice(1, -1);
};

const toHex = (bytes: Uint8Array): string => {
  let s = "\\x";
  for (const b of bytes) s += b.toString(16).padStart(2, "0");
  return s;
};

// Native SqlStorage value -> the string form typegres's deserialize expects
// (PG text-protocol contract; blobs as \x-hex, matching the sqlite driver).
const normalizeValue = (v: unknown): string | null => {
  if (v === null || v === undefined) return null;
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "bigint" || typeof v === "boolean") return String(v);
  if (v instanceof ArrayBuffer) return toHex(new Uint8Array(v));
  if (v instanceof Uint8Array) return toHex(v);
  return String(v);
};

const normalizeRow = (row: Record<string, unknown>): Record<string, string | null> =>
  Object.fromEntries(Object.entries(row).map(([k, v]) => [k, normalizeValue(v)]));

export class DoSqliteDriver implements Driver {
  readonly dialect = "sqlite" as const;

  constructor(private readonly sql: SqlStorageLike) {}

  execute: ExecuteFn = ({ text, values }: CompiledSql): Promise<QueryResult> => {
    const query = stripMatchedOuterParens(text);
    // SqlStorage rejects BigInt; typegres emits 0n/1n for booleans. Down-convert.
    const bound = values.map((v) => (typeof v === "bigint" ? Number(v) : v));
    const rows = this.sql.exec(query, ...bound).toArray().map(normalizeRow);
    return Promise.resolve({ rows });
  };

  // A Durable Object is single-threaded and single-connection.
  runInSingleConnection = <T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> => cb(this.execute);

  // Storage lifecycle belongs to the DO; nothing to close.
  close = (): Promise<void> => Promise.resolve();
}
