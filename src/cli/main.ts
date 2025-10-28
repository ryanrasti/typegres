#!/usr/bin/env node

import { Command, Options } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Effect, pipe } from "effect";
import { Pool } from "pg";
import { typegres } from "../db";
import { asType } from "../gen/as-type";
import { inspect } from "cross-inspect";

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

const introspectCommand = Command.make(
  "introspect",
  {
    database: Options.text("database").pipe(
      Options.withAlias("d"),
      Options.withDescription("PostgreSQL connection string"),
      Options.withDefault("postgres://postgres:postgres@localhost:5432/postgres"),
    ),
    schema: Options.text("schema").pipe(
      Options.withAlias("s"),
      Options.withDescription("Database schema to introspect"),
      Options.withDefault("public"),
    ),
  },
  ({ database, schema }) =>
    Effect.gen(function* () {
      // Parse connection string to get config
      const connectionString = new URL(database);
      const config = {
        host: connectionString.hostname,
        port: parseInt(connectionString.port || "5432"),
        user: connectionString.username,
        password: connectionString.password,
        database: connectionString.pathname.slice(1),
      };

      const db = yield* Effect.tryPromise({
        try: () => typegres({ type: "pg", PoolClass: Pool, config }),
        catch: (error) => new Error(`Failed to connect to database: ${error}`),
      });

      try {
        const result = yield* Effect.tryPromise({
          try: async () => {
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
            // Parse the JSON string result
            return rows[0]?.result ? (JSON.parse(rows[0].result) as TableGenFile) : null;
          },
          catch: (error) => new Error(`Failed to query database: ${inspect(error)}`),
        });

        if (!result) {
          return yield* Effect.fail(new Error(`No result returned from database`));
        }

        const tables = result[schema];
        if (!tables) {
          return yield* Effect.fail(new Error(`No tables found in schema '${schema}'`));
        }

        const outputContent = [
          `import * as Types from "typegres";`,
          `import { Table } from "typegres";`,
          ``,
          ...Object.entries(tables).flatMap(([tableName, columns]) => {
            // Convert table name to PascalCase for class name
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
                // Column is required if: not null AND no default AND not generated
                const isRequired = definition.not_null && !definition.has_default && !definition.is_generated;
                return `  ${column}: { type: ${typeStr}, required: ${isRequired} },`;
              }),
              `});`,
              ``,
            ];
          }),
        ].join("\n");

        console.log(outputContent);
      } finally {
        yield* Effect.tryPromise({
          try: () => db.end(),
          catch: () => {}, // Ignore errors on close
        });
      }
    }),
);

pipe(
  Command.make("tg"),
  Command.withSubcommands([introspectCommand]),
  Command.run({
    name: "tg",
    version: "0.0.1",
  }),
  (cli) => cli(process.argv),
  Effect.provide(NodeContext.layer),
  NodeRuntime.runMain,
);
