import pg from "pg";
import * as fs from "node:fs";
import * as path from "node:path";

const db = new pg.Client(process.env["DATABASE_URL"] ?? "postgres://localhost/postgres");
await db.connect();

const migrationsDir = path.resolve(import.meta.dirname, "migrations");
const files = fs.readdirSync(migrationsDir).sort();

for (const file of files) {
  if (!file.endsWith(".sql")) {
    continue;
  }
  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
  console.log(`Running ${file}...`);
  await db.query(sql);
}

console.log("Done.");
await db.end();
