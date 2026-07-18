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
  // "Integer", "Bool", "Any"). The introspector resolves this
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
  // Parent-side column in the emitted FK map (`this.<fromColumn>`).
  fromColumn: string;
  // Target-side column in the emitted FK map (`{ <toColumn>: ... }`).
  toColumn: string;
  // Outbound: this table holds the FK (belongsTo). Inbound: the other
  // table holds the FK (hasOne / hasMaybe / hasMany).
  direction: "outbound" | "inbound";
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
      direction: "outbound",
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
      direction: "inbound",
    });
  }

  return relations;
};

// --- Column / relation emission ---

const generateColumnLine = (col: ColumnInfo, withTool: boolean): string => {
  const cls = col.className;
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
  return `  ${prefix}${col.name} = ${cls}.column(${optsArg});`;
};

// Outbound → belongsTo (default card "one"); inbound → has (default "many").
// Only emit `{ card: ... }` when it differs from the helper's default so
// the common path stays short.
const generateRelationLine = (rel: Relation, withTool: boolean): string => {
  const targetClass = pgNameToClassName(rel.targetTable);
  const prefix = withTool ? "@expose() " : "";
  const helper = rel.direction === "outbound" ? "belongsTo" : "has";
  const fkMap = `{ ${rel.toColumn}: this.${rel.fromColumn} }`;
  const defaultCard = helper === "belongsTo" ? "one" : "many";
  const optsArg =
    rel.cardinality === defaultCard ? "" : `, { card: "${rel.cardinality}" }`;
  // `Relation.*(this, Target, { targetCol: this.parentCol }[, { card }])`
  // — threads parent context via Target.scope(Current.contextOf(this))
  // under the hood. Single-column FK map (parity with prior emit).
  return `  ${prefix}${rel.name}() { return Relation.${helper}(this, ${targetClass}, ${fkMap}${optsArg}); }`;
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

// Pure generation entry point — no DB, no fs.
//
// New file: full skeleton (managed imports + class shell + generated body).
// Update (`existing`): **only** the interior of @generated-start/end is
// rewritten (plus per-entry `@expose()` preservation). Header imports,
// class declaration, and everything after @generated-end are left alone.
// Callers are responsible for imports when the schema gains types/relations
// (tsc will fail until they add them — better than clobbering the header).
export const generateTable = (
  tableName: string,
  columns: ColumnInfo[],
  relations: Relation[],
  opts: { typeImportPath: string; dbImport: string; existing?: string },
): string => {
  if (opts.existing !== undefined) {
    return updateBlock(opts.existing, columns, relations);
  }
  return emitNewFile(
    tableName,
    columns,
    relations,
    opts.typeImportPath,
    opts.dbImport,
  );
};

// Managed imports are pure functions of schema — same lines for new and
// update. Dialect types from `typeImportPath`; runtime helpers (`expose`,
// `sql`, `Relation`) from `typegres` (no optional node driver peers).
const buildImportLines = (
  tableName: string,
  columns: ColumnInfo[],
  relations: Relation[],
  typeImportPath: string,
  dbImport: string,
): string[] => {
  const typeSyms = [...new Set(columns.map((c) => c.className))].sort();
  const hasDefault = columns.some((c) => c.default !== null);
  const runtimeSyms = [
    "expose",
    ...(relations.length > 0 ? ["Relation"] : []),
    ...(hasDefault ? ["sql"] : []),
  ].sort();
  const relImports = [...new Set(relations.map((r) => r.targetTable))]
    .filter((t) => t !== tableName)
    .sort()
    .map((t) => `import { ${pgNameToClassName(t)} } from "./${t}";`);

  return [
    `import { db } from "${dbImport}";`,
    `import { ${runtimeSyms.join(", ")} } from "typegres";`,
    `import { ${typeSyms.join(", ")} } from "${typeImportPath}";`,
    ...relImports,
  ];
};

const bodyLines = (
  columns: ColumnInfo[],
  relations: Relation[],
  withTool: (name: string, kind: "col" | "rel") => boolean,
): string[] => {
  const colLines = columns.map((c) => generateColumnLine(c, withTool(c.name, "col")));
  const relLines = relations.map((r) => generateRelationLine(r, withTool(r.name, "rel")));
  return relLines.length > 0
    ? [...colLines, "  // relations", ...relLines]
    : colLines;
};

// Brand-new table file: managed imports + class shell + empty user tail.
const emitNewFile = (
  tableName: string,
  columns: ColumnInfo[],
  relations: Relation[],
  typeImportPath: string,
  dbImport: string,
): string => {
  const imports = buildImportLines(tableName, columns, relations, typeImportPath, dbImport);
  const body = bodyLines(columns, relations, () => true);
  return `${imports.join("\n")}

export class ${pgNameToClassName(tableName)} extends db.Table("${tableName}") {
  ${START_MARKER}
${body.join("\n")}
  ${END_MARKER}
}
`;
};

// Update mode: splice only between the markers. Prefix (imports, comments,
// class line) and suffix (END_MARKER through EOF, including user methods)
// are byte-preserved. `@expose` on/off inside the prior block is preserved.
const updateBlock = (
  existing: string,
  columns: ColumnInfo[],
  relations: Relation[],
): string => {
  const startIdx = existing.indexOf(START_MARKER);
  const endIdx = existing.indexOf(END_MARKER);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error("Missing @generated-start or @generated-end markers");
  }

  const prior = parseExistingDecorations(
    existing.slice(startIdx + START_MARKER.length, endIdx),
  );
  const body = bodyLines(columns, relations, (name, kind) =>
    kind === "col" ? (prior.cols.get(name) ?? true) : (prior.rels.get(name) ?? true),
  );

  const prefix = existing.slice(0, startIdx + START_MARKER.length);
  const suffix = existing.slice(endIdx); // begins with END_MARKER
  // Normalize interior to "\n" + indented lines + "\n  " before end marker,
  // matching emitNewFile layout regardless of prior whitespace.
  return `${prefix}\n${body.join("\n")}\n  ${suffix}`;
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
