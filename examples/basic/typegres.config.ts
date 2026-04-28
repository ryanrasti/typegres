import type { Config } from "typegres/config";

export default {
  db: process.env["DATABASE_URL"] ?? "postgres://localhost/postgres",
  tables: "src/tables",
  dbImport: "../db",
} satisfies Config;
