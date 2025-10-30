#!/usr/bin/env node

import { Command, Options } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Effect, pipe } from "effect";
import { Pool } from "pg";
import { typegres } from "../db";
import { inspect } from "cross-inspect";
import { generateModelsTsForDb } from "./generateModels";

export { generateModelsTs } from "./generateModels";

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
        const outputContent = yield* Effect.tryPromise({
          try: () => generateModelsTsForDb(db, schema),
          catch: (error) => new Error(`Failed to query database: ${inspect(error)}`),
        });
        console.log(outputContent);
      } finally {
        yield* Effect.tryPromise({
          try: () => db.end(),
          catch: () => {}, // Ignore errors on close
        });
      }
    }),
);

// Keep CLI runnable when executed as a script
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
