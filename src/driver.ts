import type { CompiledSql } from "./builder/sql";
import type { DialectName } from "./builder/sql";
import type pg from "pg";
import type BetterSqlite3 from "better-sqlite3";

// Rows come back as plain objects keyed by column name. Values are
// strings (every driver's type parser is overridden to return raw text)
// or null (SQL NULL). Typed coercion happens downstream in
// QueryBuilder/InsertBuilder/etc.
export type QueryResult = { rows: { [key: string]: string | null }[] };
// Drivers receive an already-compiled `CompiledSql`. Compilation happens in
// Database (which owns the CompileContext); the driver's only job is to
// hand the query to its underlying pool/wasm and normalize the result rows.
export type ExecuteFn = (sql: CompiledSql) => Promise<QueryResult>;

export interface Driver {
  readonly dialect: DialectName;
  execute: ExecuteFn;
  runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

// pg adapter — returns raw text strings (no driver-side deserialization).
// `pg` is an *optional* peer dep (see package.json#peerDependenciesMeta):
// pglite-only consumers don't need it installed. The dynamic import keeps
// bundlers from pulling pg into browser builds (site / playground) and
// lets a missing peer fail late with a real module-not-found error rather
// than at load time.
export class PgDriver implements Driver {
  readonly dialect: DialectName = "postgres";

  static async create(
    connectionString: string,
    poolOptions: pg.PoolConfig = {},
  ): Promise<PgDriver> {
    // eslint-disable-next-line no-restricted-syntax -- optional peer, see class comment
    const pgMod = (await import(/* webpackIgnore: true */ "pg")).default;
    const pool = new pgMod.Pool({
      connectionString,
      ...poolOptions,
      types: { getTypeParser: () => (v: string) => v },
    });
    return new PgDriver(pool);
  }

  private constructor(private pool: pg.Pool) {}

  async execute({ text, values }: CompiledSql): Promise<QueryResult> {
    return this.pool.query(text, values as unknown[]);
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      return await cb(({ text, values }) => client.query(text, values as unknown[]));
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

// pglite adapter — returns raw text strings (no driver-side deserialization).
// There's no connection pool; the single in-process db instance serves all
// requests, so runInSingleConnection just routes through execute.
//
// Like `pg`, `@electric-sql/pglite` is an *optional* peer dep — pg-only
// consumers don't pay the ~5MB wasm cost. The dynamic import keeps it out
// of bundles that don't need it (server-only builds, the playground bundles
// it explicitly).
type PgliteDb = {
  query<R>(sql: string, params?: unknown[], opts?: { parsers: { [key: number]: (v: string) => string } }): Promise<{ rows: R[] }>;
  close(): Promise<void>;
};

export class PgliteDriver implements Driver {
  readonly dialect: DialectName = "postgres";

  static async create(): Promise<PgliteDriver> {
    // eslint-disable-next-line no-restricted-syntax -- optional peer, see class comment
    const { PGlite } = await import("@electric-sql/pglite");
    const db = new PGlite() as unknown as PgliteDb;
    // Query all type OIDs so we can override all parsers to return raw strings.
    const { rows: types } = await db.query<{ oid: number }>("SELECT oid FROM pg_type");
    const parsers: { [key: number]: (v: string) => string } = Object.fromEntries(
      types.map((t) => [t.oid, (v: string) => v]),
    );
    return new PgliteDriver(db, parsers);
  }

  private constructor(
    private db: PgliteDb,
    private parsers: { [key: number]: (v: string) => string },
  ) {}

  async execute({ text, values }: CompiledSql): Promise<QueryResult> {
    return this.db.query(text, values as unknown[], { parsers: this.parsers }) as Promise<QueryResult>;
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    return cb(this.execute.bind(this));
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}

// better-sqlite3 adapter. Synchronous under the hood; we wrap in
// Promise.resolve to satisfy the async Driver contract. Single
// in-process db serves all requests, so runInSingleConnection is a
// pass-through (nothing to acquire/release).
//
// Row value normalization: better-sqlite3 returns typed JS values
// (number, string, Buffer, bigint, null). Typegres' downstream
// deserialize() expects strings (PG contract). We stringify here so
// SQLite reads round-trip through the same code path. Details:
//   - number, bigint → String(v)
//   - Buffer         → hex ("\xDEADBEEF"-style, mirrors PG's bytea repr)
//   - null           → null (passthrough — SQL NULL preserved)
//   - string         → identity
// Once the SQLite driver picks up bespoke handling for typed values
// this normalization can move down to just the deserializer layer.
export class SqliteDriver implements Driver {
  readonly dialect: DialectName = "sqlite";

  static async create(
    filename: string = ":memory:",
    options: BetterSqlite3.Options = {},
  ): Promise<SqliteDriver> {
    // eslint-disable-next-line no-restricted-syntax -- optional peer, matches PgDriver/PgliteDriver pattern
    const mod = (await import("better-sqlite3")).default;
    const db = new mod(filename, options);
    return new SqliteDriver(db);
  }

  private constructor(private db: BetterSqlite3.Database) {}

  async execute({ text, values }: CompiledSql): Promise<QueryResult> {
    // QueryBuilder.FinalizedQuery.bind() wraps its output in `(...)` so
    // it can be spliced as a subquery. SQLite refuses to prepare a
    // top-level parenthesized statement ("near '(': syntax error"),
    // while PG tolerates it. Unwrap one layer here as a driver-side
    // affordance; only strips a *matched* outer pair to avoid mangling
    // user-authored `sql\`(SELECT ...)\`` fragments.
    return this.runOne(stripMatchedOuterParens(text), values);
  }

  private runOne(text: string, values: readonly unknown[]): QueryResult {
    const stmt = this.db.prepare(text);
    // .all() only works on SELECT-like statements. For INSERT/UPDATE/
    // DELETE that lack RETURNING, .all() throws — fall back to .run().
    if (stmt.reader) {
      const rows = stmt.all(...values) as { [key: string]: unknown }[];
      return { rows: rows.map(normalizeRow) };
    }
    stmt.run(...values);
    return { rows: [] };
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    return cb((compiled) => Promise.resolve(this.execute(compiled)));
  }

  async close(): Promise<void> {
    this.db.close();
    return Promise.resolve();
  }
}

// Strip one outer pair of parentheses iff they balance to enclose the
// entire string. `(SELECT 1)` → `SELECT 1`; `(SELECT 1) UNION (SELECT 2)`
// stays as-is (the leading `(` closes early and re-opens). This keeps
// the driver honest about what it's unwrapping.
const stripMatchedOuterParens = (s: string): string => {
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

const normalizeValue = (v: unknown): string | null => {
  if (v === null || v === undefined) { return null; }
  if (typeof v === "string") { return v; }
  if (typeof v === "number" || typeof v === "bigint" || typeof v === "boolean") { return String(v); }
  if (v instanceof Uint8Array) {
    // Match PG bytea repr: \x-prefixed lowercase hex.
    return "\\x" + Buffer.from(v).toString("hex");
  }
  return String(v);
};

const normalizeRow = (row: { [key: string]: unknown }): { [key: string]: string | null } =>
  Object.fromEntries(Object.entries(row).map(([k, v]) => [k, normalizeValue(v)]));
