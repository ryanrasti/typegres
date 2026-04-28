import pg from "pg";
import * as fs from "node:fs";
import * as path from "node:path";
import type { Config } from "../config.ts";
import { pgNameToClassName } from "../types/introspect.ts";

// --- Config ---

const findConfig = async (): Promise<Config> => {
  // Walk up from cwd looking for typegres.config.ts
  let dir = process.cwd();
  while (true) {
    const configPath = path.join(dir, "typegres.config.ts");
    if (fs.existsSync(configPath)) {
      // eslint-disable-next-line no-restricted-syntax -- runtime config loaded from user's project
      const config = await import(configPath);
      return { db: config.default.db, tables: path.resolve(dir, config.default.tables), dbImport: config.default.dbImport };
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error("typegres.config.ts not found");
    }
    dir = parent;
  }
};

// --- PG type name → TS class name (shared with types/generate.ts) ---
const pgTypeToClass = pgNameToClassName;

// --- Introspect ---

interface ColumnInfo {
  column_name: string;
  udt_name: string;
  is_nullable: string;
  column_default: string | null;
  is_generated: string;
  identity_generation: string | null;
}

const introspectTable = async (client: pg.Client, tableName: string): Promise<ColumnInfo[]> => {
  const { rows } = await client.query<ColumnInfo>(
    `SELECT column_name, udt_name, is_nullable, column_default, is_generated, identity_generation
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = $1
     ORDER BY ordinal_position`,
    [tableName],
  );
  return rows;
};

const getTables = async (client: pg.Client): Promise<string[]> => {
  const { rows } = await client.query<{ table_name: string }>(
    `SELECT table_name FROM information_schema.tables
     WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
     ORDER BY table_name`,
  );
  return rows.map((r) => r.table_name);
};

// --- FK introspection ---

interface FkInfo {
  from_table: string;
  from_column: string;
  to_table: string;
  to_column: string;
  is_unique: boolean;
  is_nullable: boolean;
}

const introspectFks = async (client: pg.Client): Promise<FkInfo[]> => {
  const { rows } = await client.query<FkInfo>(`
    SELECT
      cl_from.relname AS from_table,
      att_from.attname AS from_column,
      cl_to.relname AS to_table,
      att_to.attname AS to_column,
      EXISTS (
        SELECT 1 FROM pg_index
        WHERE indrelid = con.conrelid
          AND indkey::int[] @> ARRAY[att_from.attnum::int]
          AND indisunique
      ) AS is_unique,
      NOT att_from.attnotnull AS is_nullable
    FROM pg_constraint con
    JOIN pg_class cl_from ON con.conrelid = cl_from.oid
    JOIN pg_class cl_to ON con.confrelid = cl_to.oid
    JOIN pg_attribute att_from ON att_from.attrelid = con.conrelid AND att_from.attnum = ANY(con.conkey)
    JOIN pg_attribute att_to ON att_to.attrelid = con.confrelid AND att_to.attnum = ANY(con.confkey)
    JOIN pg_namespace ns ON cl_from.relnamespace = ns.oid
    WHERE con.contype = 'f' AND ns.nspname = 'public'
    ORDER BY cl_from.relname, att_from.attname
  `);
  return rows;
};

type Cardinality = "one" | "maybe" | "many";

interface Relation {
  name: string;
  targetTable: string;
  cardinality: Cardinality;
  fromColumn: string;
  toColumn: string;
}

const deriveRelations = (tableName: string, allFks: FkInfo[]): Relation[] => {
  const relations: Relation[] = [];
  const usedNames = new Set<string>();

  const uniqueName = (base: string): string => {
    if (!usedNames.has(base)) {
      usedNames.add(base);
      return base;
    }
    // Disambiguate: e.g., dogs_rival_id
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

// --- Generate ---

const generateColumnLine = (col: ColumnInfo): string => {
  const cls = pgTypeToClass(col.udt_name);
  const nullable = col.is_nullable === "YES" ? "0 | 1" : "1";
  const opts: string[] = [];
  if (col.is_nullable === "NO") {
    opts.push("nonNull: true");
  }
  if (col.column_default !== null) {
    opts.push(`default: sql\`${col.column_default}\``);
  }
  if (col.identity_generation !== null) {
    opts.push("generated: true");
  }
  const optsArg = opts.length > 0 ? `{ ${opts.join(", ")} }` : "";
  return `  ${col.column_name} = (${cls}<${nullable}>).column(${optsArg});`;
};

const generateRelationLine = (rel: Relation): string => {
  const targetClass = pgNameToClassName(rel.targetTable);
  return `  ${rel.name}() { return ${targetClass}.from().where(({ ${rel.targetTable} }) => ${rel.targetTable}.${rel.toColumn}["="](this.${rel.fromColumn})).cardinality("${rel.cardinality}"); }`;
};

const generateTableFile = (tableName: string, columns: ColumnInfo[], relations: Relation[], config: Config): string => {
  // Collect unique type imports
  const typeClasses = [...new Set(columns.map((c) => pgTypeToClass(c.udt_name)))];
  const hasDefault = columns.some((c) => c.column_default !== null);

  // Collect relation target imports
  const relationTargets = [...new Set(relations.map((r) => r.targetTable))];
  const relImports = relationTargets
    .filter((t) => t !== tableName)
    .map((t) => `import { ${pgNameToClassName(t)} } from "./${t}";`);

  const imports = [
    `import { db } from "${config.dbImport}";`,
    `import { ${typeClasses.join(", ")} } from "typegres/types";`,
    ...relImports,
  ];
  if (hasDefault) {
    imports.push(`import { sql } from "typegres/sql-builder";`);
  }

  const colLines = columns.map(generateColumnLine);
  const relLines = relations.map(generateRelationLine);
  const allLines = relLines.length > 0
    ? [...colLines, "  // relations", ...relLines]
    : colLines;

  return `${imports.join("\n")}

export class ${pgNameToClassName(tableName)} extends db.Table("${tableName}") {
  // @generated-start
${allLines.join("\n")}
  // @generated-end
}
`;
};

const updateTableFile = (existing: string, columns: ColumnInfo[], relations: Relation[]): string => {
  const startMarker = "// @generated-start";
  const endMarker = "// @generated-end";
  const startIdx = existing.indexOf(startMarker);
  const endIdx = existing.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error("Missing @generated-start or @generated-end markers");
  }

  const colLines = columns.map(generateColumnLine);
  const relLines = relations.map(generateRelationLine);
  const allLines = relLines.length > 0
    ? [...colLines, "  // relations", ...relLines]
    : colLines;
  const before = existing.slice(0, startIdx + startMarker.length);
  const after = existing.slice(endIdx);

  return `${before}\n${allLines.join("\n")}\n  ${after}`;
};

// --- Main ---

export const main = async () => {
  const config = await findConfig();
  const client = new pg.Client(config.db);
  await client.connect();

  try {
    const tables = await getTables(client);
    if (tables.length === 0) {
      console.log("No tables found in public schema.");
      return;
    }

    const allFks = await introspectFks(client);
    fs.mkdirSync(config.tables, { recursive: true });

    for (const tableName of tables) {
      const columns = await introspectTable(client, tableName);
      const relations = deriveRelations(tableName, allFks);
      const filePath = path.join(config.tables, `${tableName}.ts`);

      if (fs.existsSync(filePath)) {
        const existing = fs.readFileSync(filePath, "utf-8");
        if (existing.includes("@generated-start")) {
          const updated = updateTableFile(existing, columns, relations);
          fs.writeFileSync(filePath, updated);
          console.log(`Updated ${filePath}`);
        } else {
          console.log(`Skipped ${filePath} (no @generated markers)`);
        }
      } else {
        const content = generateTableFile(tableName, columns, relations, config);
        fs.writeFileSync(filePath, content);
        console.log(`Created ${filePath}`);
      }
    }
  } finally {
    await client.end();
  }
};

