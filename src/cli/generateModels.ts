import { Pool } from "pg";
import { typegres } from "../db";
import { asType } from "../gen/as-type";

type ColumnDefinition = {
  type: string;
  not_null: boolean;
  has_default: boolean;
  is_generated: boolean;
};

type TableGenFile = {
  [schema: string]: {
    [table: string]: {
      [column: string]: ColumnDefinition;
    };
  };
};

const canonicalType = (type: string): string => (type === "varchar" ? "text" : type);

export const generateModelsTsForDb = async (db: Awaited<ReturnType<typeof typegres>>, schema: string) => {
  const rows = await db.sql<{ result: string }>`
    SELECT json_object_agg(schema_name, tables) AS result
    FROM (
      SELECT
        n.nspname AS schema_name,
        json_object_agg(c.relname, columns ORDER BY c.relname) AS tables
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      JOIN (
        SELECT
          attrelid,
          json_object_agg(attname, json_build_object(
            'type', t.typname,
            'not_null', a.attnotnull,
            'has_default', a.atthasdef,
            'is_generated', a.attgenerated != ''
          ) ORDER BY attname) AS columns
        FROM pg_attribute a
        JOIN pg_type t ON a.atttypid = t.oid
        WHERE a.attnum > 0 AND NOT a.attisdropped
        GROUP BY attrelid
      ) cols ON cols.attrelid = c.oid
      WHERE c.relkind = 'r' AND n.nspname = ${schema}
      GROUP BY n.nspname
    ) per_schema
  `.execute();
  const parsed: TableGenFile | null = rows[0]?.result ? JSON.parse(rows[0].result) : null;
  if (!parsed) throw new Error("No result returned from database");
  const tables = parsed[schema];
  if (!tables) throw new Error(`No tables found in schema '${schema}'`);

  const outputContent = [
    `import * as Types from "typegres";`,
    `import { Table } from "typegres";`,
    ``,
    ...Object.entries(tables).flatMap(([tableName, columns]) => {
      const className = tableName
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");

      return [
        `export const ${className} = Table("${tableName}", {`,
        ...Object.entries(columns as TableGenFile[string][string]).map(([column, definition]) => {
          const typeStr = asType(canonicalType(definition.type), {
            nullable: definition.not_null ? false : undefined,
          });
          const isRequired = definition.not_null && !definition.has_default && !definition.is_generated;
          return `  ${column}: { type: ${typeStr}, required: ${isRequired} },`;
        }),
        `});`,
        ``,
      ];
    }),
  ].join("\n");
  return outputContent;
};

export const generateModelsTs = async (options: { databaseUrl: string; schema?: string }) => {
  const { databaseUrl, schema = "public" } = options;
  const connectionString = new URL(databaseUrl);
  const config = {
    host: connectionString.hostname,
    port: parseInt(connectionString.port || "5432"),
    user: connectionString.username,
    password: connectionString.password,
    database: connectionString.pathname.slice(1),
  };
  const db = await typegres({ type: "pg", PoolClass: Pool, config });
  try {
    return await generateModelsTsForDb(db, schema);
  } finally {
    await db.end().catch(() => {});
  }
};


