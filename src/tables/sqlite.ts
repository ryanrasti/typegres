// SQLite introspection: PRAGMAs (sqlite_master, table_info,
// foreign_key_list, index_list, index_info) mapped onto the shared
// `Introspection` shape. Type-name → class-name resolution (BOOLEAN
// overlay, SQLite affinity rules) happens here at introspection time.

import type BetterSqlite3 from "better-sqlite3";
import type { ColumnInfo, FkInfo, Introspection, Introspector, TableIntrospection } from "./generate.ts";

// --- PRAGMA row shapes ---

interface TableInfoRow {
  cid: number;
  name: string;
  type: string;         // declared type (may be empty string)
  notnull: 0 | 1;
  dflt_value: string | null;
  pk: number;           // 0 = not PK, 1..N = position in PK
}

interface FkListRow {
  id: number;
  seq: number;
  table: string;
  from: string;
  to: string;
}

interface IndexListRow {
  seq: number;
  name: string;
  unique: 0 | 1;
  origin: string;
  partial: 0 | 1;
}

interface IndexInfoRow {
  seqno: number;
  cid: number;          // -1 = rowid, -2 = expression
  name: string | null;  // NULL for rowid / expression index members
}

// --- Class-name resolution ---

// SQLite lets you declare any string as a column type and computes an
// "affinity" via ordered substring rules (§ 3.1 of the SQLite type
// docs). We follow those rules 1:1 plus a small overlay for BOOLEAN
// (a strong-enough convention to surface as our `Bool`). NUMERIC
// affinity resolves to `Any` — the base class with no narrow
// method surface, which honestly reflects SQLite's dynamic typing.
export const affinityToClass = (declaredType: string): string => {
  // BOOL/BOOLEAN overlay first — affinity rules would send this to
  // NUMERIC otherwise (no "BOOL" match term), losing the intent.
  if (/^BOOL(EAN)?$/i.test(declaredType.trim())) { return "Bool"; }

  // Ordered affinity rules. Substring match, case-insensitive, first
  // match wins. Order matters — `FLOATING POINT` contains both "FLOA"
  // and "INT" (via "POINT"); rule 1 fires first and yields INTEGER,
  // matching SQLite's own behavior.
  const t = declaredType.toUpperCase();
  if (t.includes("INT")) { return "Integer"; }
  if (/CHAR|CLOB|TEXT/.test(t)) { return "Text"; }
  if (t.includes("BLOB") || declaredType === "") { return "Blob"; }
  if (/REAL|FLOA|DOUB/.test(t)) { return "Real"; }

  // NUMERIC fallback — DATE, DATETIME, TIMESTAMP, DECIMAL, MONEY, and
  // custom names all land here. Bare Any<N>: no narrow
  // methods, `unknown` on hydration. User asserts intent at the call
  // site when treating it as a specific type.
  return "Any";
};

// `INTEGER PRIMARY KEY` (that exact declared type, not "INT") in a
// rowid table aliases the rowid — auto-increments, nulls are replaced.
// SQLite's own docs are strict about the literal string match.
const isRowidAlias = (declaredType: string, pk: number): boolean =>
  pk === 1 && /^\s*INTEGER\s*$/i.test(declaredType);

// --- PRAGMA helpers ---

const quoteIdent = (name: string): string => `"${name.replace(/"/g, '""')}"`;

const readTables = (db: BetterSqlite3.Database): string[] => {
  const rows = db
    .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name`)
    .all() as { name: string }[];
  return rows.map((r) => r.name);
};

const readTableInfo = (db: BetterSqlite3.Database, tableName: string): TableInfoRow[] =>
  db.prepare(`PRAGMA table_info(${quoteIdent(tableName)})`).all() as TableInfoRow[];

const toColumnInfo = (r: TableInfoRow): ColumnInfo => {
  const rowid = isRowidAlias(r.type, r.pk);
  return {
    name: r.name,
    className: affinityToClass(r.type),
    // INTEGER PRIMARY KEY reports notnull=0 in PRAGMA (SQLite treats
    // NULL inserts as "please auto-fill from rowid"), but it's
    // semantically non-null — the auto-fill guarantees a value.
    nullable: !rowid && !r.notnull,
    default: r.dflt_value,
    // Rowid aliases are SQLite's only DB-assigned column concept.
    generated: rowid,
  };
};

const readSingleColUniqueSet = (db: BetterSqlite3.Database, tableName: string, info: TableInfoRow[]): Set<string> => {
  const uniq = new Set<string>();
  // PRAGMA table_info's `pk` is 1-based ordinal within the PK, not a
  // boolean — for `PRIMARY KEY (a, b)` we get a.pk=1, b.pk=2. Only add
  // to the unique set if the PK is single-column.
  const pkCols = info.filter((c) => c.pk > 0);
  if (pkCols.length === 1) { uniq.add(pkCols[0]!.name); }
  const indexes = db.prepare(`PRAGMA index_list(${quoteIdent(tableName)})`).all() as IndexListRow[];
  for (const idx of indexes) {
    // Partial unique indexes (`... WHERE expr`) don't guarantee global
    // uniqueness — a non-matching row can duplicate the column freely,
    // so they must not upgrade inbound cardinality to "one".
    if (!idx.unique || idx.partial) { continue; }
    const cols = db.prepare(`PRAGMA index_info(${quoteIdent(idx.name)})`).all() as IndexInfoRow[];
    // name is NULL for expression members (`UNIQUE (lower(col))`) —
    // those aren't single-column uniqueness either.
    if (cols.length === 1 && cols[0]!.name !== null) { uniq.add(cols[0]!.name); }
  }
  return uniq;
};

const readFksFor = (db: BetterSqlite3.Database, tableName: string, info: TableInfoRow[], uniqueCols: Set<string>): FkInfo[] => {
  const fks = db.prepare(`PRAGMA foreign_key_list(${quoteIdent(tableName)})`).all() as FkListRow[];

  // A composite FK repeats the same `id` across multiple rows. Group
  // by id — if any group has more than one column, skip with a warning.
  const byId = new Map<number, FkListRow[]>();
  for (const fk of fks) {
    const arr = byId.get(fk.id) ?? [];
    arr.push(fk);
    byId.set(fk.id, arr);
  }
  const out: FkInfo[] = [];
  for (const [, group] of byId) {
    if (group.length > 1) {
      console.warn(
        `Skipping composite FK on ${tableName} (columns: ${group.map((g) => g.from).join(", ")}); ` +
          `multi-column FKs aren't emitted as relations.`,
      );
      continue;
    }
    const fk = group[0]!;
    const localCol = info.find((c) => c.name === fk.from);
    // Same rowid-alias exception as toColumnInfo: `INTEGER PRIMARY KEY`
    // reports notnull=0 but is semantically non-null. Without this,
    // a self-referencing single-col PK-as-FK is wrongly flagged
    // nullable and cardinality drops from "one" to "maybe".
    const isRowid = localCol ? isRowidAlias(localCol.type, localCol.pk) : false;
    out.push({
      from_table: tableName,
      from_column: fk.from,
      to_table: fk.table,
      to_column: fk.to,
      is_unique: uniqueCols.has(fk.from),
      is_nullable: !isRowid && (!localCol || localCol.notnull === 0),
    });
  }
  return out;
};

// --- Introspector ---

export const sqliteIntrospector = async (filename: string): Promise<Introspector> => {
  // eslint-disable-next-line no-restricted-syntax -- optional peer, matches other SQLite call sites
  const mod = (await import("better-sqlite3")).default;
  return {
    typeImportPath: "typegres/sqlite",
    introspect: async (): Promise<Introspection> => {
      const db = new mod(filename, { readonly: true });
      try {
        const tableNames = readTables(db);
        const tables = new Map<string, TableIntrospection>();
        for (const name of tableNames) {
          const info = readTableInfo(db, name);
          const uniqueCols = readSingleColUniqueSet(db, name, info);
          tables.set(name, {
            columns: info.map(toColumnInfo),
            fks: readFksFor(db, name, info, uniqueCols),
          });
        }
        return { tables };
      } finally {
        db.close();
      }
    },
  };
};
