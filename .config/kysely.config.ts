import {
  DummyDriver,
  PostgresAdapter,
  PostgresDialect,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import { defineConfig } from "kysely-ctl";
import { Pool } from "pg";

export default defineConfig({
  $test: {
    dialect: new PostgresDialect({
      pool: new Pool({
        host: "localhost",
        user: "postgres",
        port: 1234,
        max: 10,
        database: "test",
      }),
    }),
  },
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      user: "postgres",
      port: 1234,
      max: 10,
      database: "test",
    }),
  }),
});
