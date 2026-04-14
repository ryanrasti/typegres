import pg from "pg";
import * as fs from "node:fs";
import * as path from "node:path";
import type { Config } from "../config.ts";
import { pgNameToClassName } from "../types/generate.ts";

// --- Config ---

const findConfig = async (): Promise<Config> => {
  // Walk up from cwd looking for typegres.config.ts
  let dir = process.cwd();
  while (true) {
    const configPath = path.join(dir, "typegres.config.ts");
    if (fs.existsSync(configPath)) {
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
  const optsStr = opts.length > 0 ? `{ ${opts.join(", ")} }` : "";
  return `  ${col.column_name} = (${cls}<${nullable}>).column(${optsStr});`;
};

const generateTableFile = (tableName: string, columns: ColumnInfo[], config: Config): string => {
  // Collect unique type imports
  const typeClasses = [...new Set(columns.map((c) => pgTypeToClass(c.udt_name)))];
  const hasDefault = columns.some((c) => c.column_default !== null);

  const imports = [
    `import { db } from "${config.dbImport}";`,
    `import { ${typeClasses.join(", ")} } from "typegres/types";`,
  ];
  if (hasDefault) {
    imports.push(`import { sql } from "typegres/sql-builder";`);
  }

  const lines = columns.map(generateColumnLine);

  return `${imports.join("\n")}

export class ${pgNameToClassName(tableName)} extends db.Table("${tableName}") {
  // @generated-start
${lines.join("\n")}
  // @generated-end
}
`;
};

const updateTableFile = (existing: string, columns: ColumnInfo[]): string => {
  const startMarker = "// @generated-start";
  const endMarker = "// @generated-end";
  const startIdx = existing.indexOf(startMarker);
  const endIdx = existing.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error("Missing @generated-start or @generated-end markers");
  }

  const lines = columns.map(generateColumnLine);
  const before = existing.slice(0, startIdx + startMarker.length);
  const after = existing.slice(endIdx);

  return `${before}\n${lines.join("\n")}\n  ${after}`;
};

// --- Main ---

const main = async () => {
  const config = await findConfig();
  const client = new pg.Client(config.db);
  await client.connect();

  try {
    const tables = await getTables(client);
    if (tables.length === 0) {
      console.log("No tables found in public schema.");
      return;
    }

    fs.mkdirSync(config.tables, { recursive: true });

    for (const tableName of tables) {
      const columns = await introspectTable(client, tableName);
      const filePath = path.join(config.tables, `${tableName}.ts`);

      if (fs.existsSync(filePath)) {
        const existing = fs.readFileSync(filePath, "utf-8");
        if (existing.includes("@generated-start")) {
          const updated = updateTableFile(existing, columns);
          fs.writeFileSync(filePath, updated);
          console.log(`Updated ${filePath}`);
        } else {
          console.log(`Skipped ${filePath} (no @generated markers)`);
        }
      } else {
        const content = generateTableFile(tableName, columns, config);
        fs.writeFileSync(filePath, content);
        console.log(`Created ${filePath}`);
      }
    }
  } finally {
    await client.end();
  }
};

main();
