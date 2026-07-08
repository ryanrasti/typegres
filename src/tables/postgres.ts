// Postgres introspection: information_schema + pg_catalog, mapped
// onto the shared `Introspection` shape.

import pg from "pg";
import { pgNameToClassName } from "../types/postgres/introspect.ts";
import type { ColumnInfo, FkInfo, Introspection, Introspector, TableIntrospection } from "./generate.ts";

interface PgColumnRow {
  column_name: string;
  udt_name: string;
  is_nullable: string;
  column_default: string | null;
  is_generated: string;
  identity_generation: string | null;
}

const queryColumns = async (client: pg.Client, tableName: string): Promise<PgColumnRow[]> => {
  const { rows } = await client.query<PgColumnRow>(
    `SELECT column_name, udt_name, is_nullable, column_default, is_generated, identity_generation
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = $1
     ORDER BY ordinal_position`,
    [tableName],
  );
  return rows;
};

const queryTables = async (client: pg.Client): Promise<string[]> => {
  const { rows } = await client.query<{ table_name: string }>(
    `SELECT table_name FROM information_schema.tables
     WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
     ORDER BY table_name`,
  );
  return rows.map((r) => r.table_name);
};

const FK_QUERY = `
    SELECT
      cl_from.relname AS from_table,
      att_from.attname AS from_column,
      cl_to.relname AS to_table,
      att_to.attname AS to_column,
      EXISTS (
        -- Single-column unique index over exactly this FK column.
        -- \`indkey\` is int2vector (0-indexed); casting to int[] preserves
        -- the 0 lower bound, so array-equality against ARRAY[x] (1-
        -- indexed) always fails. Compare length + first element instead
        -- to avoid the composite-index over-report (UNIQUE (a, b)
        -- would otherwise mark \`a\` alone as unique via @>).
        SELECT 1 FROM pg_index
        WHERE indrelid = con.conrelid
          AND indisunique
          -- Partial unique indexes don't guarantee global uniqueness.
          AND indpred IS NULL
          AND array_length(indkey::int[], 1) = 1
          AND indkey[0] = att_from.attnum
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
  `;

const queryFks = async (client: pg.Client): Promise<FkInfo[]> => {
  const { rows } = await client.query<FkInfo>(FK_QUERY);
  return rows;
};

const toColumnInfo = (row: PgColumnRow): ColumnInfo => ({
  name: row.column_name,
  // PG type-name → codegen class name is snake→PascalCase — the
  // pg_catalog names (int4, text, timestamptz) map 1:1 onto our
  // codegen'd classes.
  className: pgNameToClassName(row.udt_name),
  nullable: row.is_nullable === "YES",
  default: row.column_default,
  // Identity columns (ALWAYS or BY DEFAULT) and stored generated
  // columns (`GENERATED ALWAYS AS (...) STORED`, flagged by
  // is_generated) are all DB-assigned.
  generated: row.identity_generation !== null || row.is_generated === "ALWAYS",
});

export const postgresIntrospector = (dbUrl: string): Introspector => ({
  typeImportPath: "typegres/postgres",
  introspect: async (): Promise<Introspection> => {
    const client = new pg.Client(dbUrl);
    await client.connect();
    try {
      const tableNames = await queryTables(client);
      const allFks = await queryFks(client);
      const fksByTable = new Map<string, FkInfo[]>();
      for (const fk of allFks) {
        const arr = fksByTable.get(fk.from_table) ?? [];
        arr.push(fk);
        fksByTable.set(fk.from_table, arr);
      }
      const tables = new Map<string, TableIntrospection>();
      for (const name of tableNames) {
        const rows = await queryColumns(client, name);
        tables.set(name, {
          columns: rows.map(toColumnInfo),
          fks: fksByTable.get(name) ?? [],
        });
      }
      return { tables };
    } finally {
      await client.end();
    }
  },
});
