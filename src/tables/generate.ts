// Dialect-neutral table codegen orchestrator. Introspection + type-name
// mapping live in per-dialect modules (`postgres.ts`, `sqlite.ts`); this
// file owns config loading, per-entry `@expose()` preservation, the
// `@generated-start` / `@generated-end` marker handling, and the file-
// emission shape.

import * as fs from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import type { Config } from "../config.ts";
import { pgNameToClassName } from "../types/postgres/introspect.ts";

// --- Public types ---

// Shared column shape — the contract between introspectors and
// codegen, expressed in codegen's vocabulary (exactly the facts
// `generateColumnLine` needs), not any dialect's catalog-ese. Each
// introspector translates its native facts at the boundary: PG maps
// information_schema rows (`is_nullable === "YES"`, identity /
// stored-generated columns); SQLite maps PRAGMA `table_info` rows
// (`notnull`, rowid-alias detection).
export interface ColumnInfo {
  name: string;
  // Resolved TS class name for the type (e.g. "Int8", "Text",
  // "Integer", "Bool", "SqliteValue"). The introspector resolves this
  // at introspection time — shared codegen doesn't know how PG
  // typnames vs SQLite affinity resolve.
  className: string;
  nullable: boolean;
  // Raw SQL default expression, spliced into `default: sql`...``.
  default: string | null;
  // DB assigns the value (identity, stored generated, SQLite rowid
  // alias). PG's ALWAYS vs BY DEFAULT distinction is deliberately
  // collapsed — both emit `generated: true`; widen to a union if
  // typegres ever wants "insertable but defaulted" semantics.
  generated: boolean;
}

export interface FkInfo {
  from_table: string;
  from_column: string;
  to_table: string;
  to_column: string;
  is_unique: boolean;
  is_nullable: boolean;
}

export type Cardinality = "one" | "maybe" | "many";

export interface Relation {
  name: string;
  targetTable: string;
  cardinality: Cardinality;
  fromColumn: string;
  toColumn: string;
}

// A snapshot of the schema — pure data, no methods, no DB handle.
export interface TableIntrospection {
  columns: ColumnInfo[];
  fks: FkInfo[];
}

export interface Introspection {
  tables: Map<string, TableIntrospection>;
}

// Small factory that knows how to connect + read the schema for its
// dialect and produce the pure-data `Introspection`. `typeImportPath`
// lives here because it's a codegen concern tied to the dialect, not
// a schema fact.
export interface Introspector {
  typeImportPath: string;
  introspect(): Promise<Introspection>;
}

// --- Config ---

const findConfig = async (): Promise<Config> => {
  let dir = process.cwd();
  while (true) {
    const configPath = path.join(dir, "typegres.config.ts");
    if (fs.existsSync(configPath)) {
      // file URL, not the raw path — Windows paths (`C:\...`) aren't
      // valid ESM specifiers.
      // eslint-disable-next-line no-restricted-syntax -- runtime config loaded from user's project
      const config = await import(pathToFileURL(configPath).href);
      const c = config.default;
      return { dialect: c.dialect, db: c.db, tables: path.resolve(dir, c.tables), dbImport: c.dbImport };
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error("typegres.config.ts not found");
    }
    dir = parent;
  }
};

// --- Relations ---

export const deriveRelations = (tableName: string, allFks: FkInfo[]): Relation[] => {
  const relations: Relation[] = [];
  const usedNames = new Set<string>();

  const uniqueName = (base: string): string => {
    if (!usedNames.has(base)) {
      usedNames.add(base);
      return base;
    }
    let candidate = base;
    let i = 2;
    while (usedNames.has(candidate)) {
      candidate = `${base}_${i}`;
      i++;
    }
    usedNames.add(candidate);
    return candidate;
  };

  // Outbound: my FK → their PK (name from FK column, strip _id suffix)
  for (const fk of allFks.filter((f) => f.from_table === tableName)) {
    const card: Cardinality = fk.is_nullable ? "maybe" : "one";
    const baseName = fk.from_column.replace(/_id$/, "");
    relations.push({
      name: uniqueName(baseName),
      targetTable: fk.to_table,
      cardinality: card,
      fromColumn: fk.from_column,
      toColumn: fk.to_column,
    });
  }

  // Inbound: their FK → my PK
  for (const fk of allFks.filter((f) => f.to_table === tableName)) {
    const card: Cardinality = fk.is_unique ? (fk.is_nullable ? "maybe" : "one") : "many";
    relations.push({
      name: uniqueName(fk.from_table),
      targetTable: fk.from_table,
      cardinality: card,
      fromColumn: fk.to_column,
      toColumn: fk.from_column,
    });
  }

  return relations;
};

// --- Column / relation emission ---

const generateColumnLine = (col: ColumnInfo, withTool: boolean): string => {
  const cls = col.className;
  const nullable = col.nullable ? "0 | 1" : "1";
  const opts: string[] = [];
  if (!col.nullable) {
    opts.push("nonNull: true");
  }
  if (col.default !== null) {
    opts.push(`default: sql\`${col.default}\``);
  }
  if (col.generated) {
    opts.push("generated: true");
  }
  const optsArg = opts.length > 0 ? `{ ${opts.join(", ")} }` : "";
  const prefix = withTool ? "@expose() " : "";
  return `  ${prefix}${col.name} = (${cls}<${nullable}>).column(${optsArg});`;
};

const generateRelationLine = (rel: Relation, currentTable: string, withTool: boolean): string => {
  const targetClass = pgNameToClassName(rel.targetTable);
  const currentClass = pgNameToClassName(currentTable);
  const prefix = withTool ? "@expose() " : "";
  // `Target.scope(Current.contextOf(this))` propagates the row's scope
  // tag through every relation traversal — joins n-deep stay bound to
  // the same principal. Dialect-neutral (uses names + cardinality only).
  return `  ${prefix}${rel.name}() { return ${targetClass}.scope(${currentClass}.contextOf(this)).where(({ ${rel.targetTable} }) => ${rel.targetTable}.${rel.toColumn}.eq(this.${rel.fromColumn})).cardinality("${rel.cardinality}"); }`;
};

// Scan the existing @generated block to learn which columns/relations
// the user opted out of `@expose()` on. New entries default decorated;
// existing entries preserve their state.
const parseExistingDecorations = (
  block: string,
): { cols: Map<string, boolean>; rels: Map<string, boolean> } => {
  const cols = new Map<string, boolean>();
  const rels = new Map<string, boolean>();
  let pendingTool = false;
  for (const raw of block.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("//")) {
      continue;
    }
    if (/^@expose\(\)\s*$/.test(line)) {
      pendingTool = true;
      continue;
    }
    const inline = /^(@expose\(\)\s+)?(\w+)\s*(=|\()/.exec(line);
    if (!inline) {
      pendingTool = false;
      continue;
    }
    const hasTool = !!inline[1] || pendingTool;
    const name = inline[2]!;
    const isCol = inline[3] === "=";
    (isCol ? cols : rels).set(name, hasTool);
    pendingTool = false;
  }
  return { cols, rels };
};

const START_MARKER = "// @generated-start";
const END_MARKER = "// @generated-end";

// Pure generation entry point — no DB, no fs. `existing` (if provided)
// must contain @generated-start/@generated-end markers; only content
// between them is replaced, and per-entry `@expose()` state is preserved.
// Without `existing`, returns a brand-new full file.
export const generateTable = (
  tableName: string,
  columns: ColumnInfo[],
  relations: Relation[],
  opts: { typeImportPath: string; dbImport: string; existing?: string },
): string => {
  if (opts.existing !== undefined) {
    return updateBlock(opts.existing, tableName, columns, relations);
  }
  return newFile(tableName, columns, relations, opts.typeImportPath, opts.dbImport);
};

const newFile = (
  tableName: string,
  columns: ColumnInfo[],
  relations: Relation[],
  typeImportPath: string,
  dbImport: string,
): string => {
  const typeClasses = [...new Set(columns.map((c) => c.className))];
  const hasDefault = columns.some((c) => c.default !== null);

  const relationTargets = [...new Set(relations.map((r) => r.targetTable))];
  const relImports = relationTargets
    .filter((t) => t !== tableName)
    .map((t) => `import { ${pgNameToClassName(t)} } from "./${t}";`);

  // Split imports: dialect-specific type classes come from
  // `typeImportPath`; dialect-agnostic runtime helpers (`expose`,
  // `sql`) come from the top `typegres` barrel. Symbols within each
  // group sorted for stable diffs.
  const runtimeSyms = ["expose", ...(hasDefault ? ["sql"] : [])].sort();
  const typeSyms = [...typeClasses].sort();
  const imports = [
    `import { db } from "${dbImport}";`,
    `import { ${runtimeSyms.join(", ")} } from "typegres";`,
    `import { ${typeSyms.join(", ")} } from "${typeImportPath}";`,
    ...relImports,
  ];

  // New file: every column/relation gets `@expose()` by default.
  const colLines = columns.map((c) => generateColumnLine(c, true));
  const relLines = relations.map((r) => generateRelationLine(r, tableName, true));
  const allLines = relLines.length > 0
    ? [...colLines, "  // relations", ...relLines]
    : colLines;

  return `${imports.join("\n")}

export class ${pgNameToClassName(tableName)} extends db.Table("${tableName}") {
  ${START_MARKER}
${allLines.join("\n")}
  ${END_MARKER}
}
`;
};

const updateBlock = (
  existing: string,
  tableName: string,
  columns: ColumnInfo[],
  relations: Relation[],
): string => {
  const startIdx = existing.indexOf(START_MARKER);
  const endIdx = existing.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error("Missing @generated-start or @generated-end markers");
  }

  const blockContent = existing.slice(startIdx + START_MARKER.length, endIdx);
  const prior = parseExistingDecorations(blockContent);

  const colLines = columns.map((c) => generateColumnLine(c, prior.cols.get(c.name) ?? true));
  const relLines = relations.map((r) => generateRelationLine(r, tableName, prior.rels.get(r.name) ?? true));
  const allLines = relLines.length > 0
    ? [...colLines, "  // relations", ...relLines]
    : colLines;
  const before = existing.slice(0, startIdx + START_MARKER.length);
  const after = existing.slice(endIdx);

  return `${before}\n${allLines.join("\n")}\n  ${after}`;
};

// --- Main ---

const runGeneration = async (
  introspector: Introspector,
  tablesDir: string,
  dbImport: string,
): Promise<void> => {
  const intro = await introspector.introspect();
  if (intro.tables.size === 0) {
    console.log("No tables found.");
    return;
  }
  fs.mkdirSync(tablesDir, { recursive: true });

  // FK list flattened once so `deriveRelations` can scan
  // outbound + inbound in the shared shape.
  const allFks = [...intro.tables.values()].flatMap((t) => t.fks);

  for (const [tableName, tableData] of intro.tables) {
    const relations = deriveRelations(tableName, allFks);
    const filePath = path.join(tablesDir, `${tableName}.ts`);

    const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : undefined;
    if (existing !== undefined && !existing.includes(START_MARKER)) {
      console.log(`Skipped ${filePath} (no @generated markers)`);
      continue;
    }
    const content = generateTable(tableName, tableData.columns, relations,
      existing === undefined
        ? { typeImportPath: introspector.typeImportPath, dbImport }
        : { typeImportPath: introspector.typeImportPath, dbImport, existing },
    );
    fs.writeFileSync(filePath, content);
    console.log(`${existing ? "Updated" : "Created"} ${filePath}`);
  }
};

export const main = async (): Promise<void> => {
  const config = await findConfig();
  if (config.dialect === "postgres") {
    // eslint-disable-next-line no-restricted-syntax -- lazy so SQLite users don't pay the `pg` peer-dep cost
    const { postgresIntrospector } = await import("./postgres.ts");
    await runGeneration(postgresIntrospector(config.db), config.tables, config.dbImport);
  } else if (config.dialect === "sqlite") {
    // eslint-disable-next-line no-restricted-syntax -- lazy so PG users don't pay the `better-sqlite3` peer-dep cost
    const { sqliteIntrospector } = await import("./sqlite.ts");
    await runGeneration(await sqliteIntrospector(config.db), config.tables, config.dbImport);
  } else {
    // Exhaustive over Config["dialect"]. Extend when a new dialect
    // lands in the config union.
    const _exhaustive: never = config;
    throw new Error(`Unknown dialect: ${String((_exhaustive as { dialect: string }).dialect)}`);
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
