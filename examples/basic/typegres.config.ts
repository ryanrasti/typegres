import type { Config } from "typegres";

export default {
  db: process.env["DATABASE_URL"] ?? "postgres://localhost/postgres",
  tables: "src/tables",
  dbImport: "../db",
} satisfies Config;
