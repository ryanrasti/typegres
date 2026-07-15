// migrate → temp sqlite file → tg generate.
// Keeps table classes in sync with the DDL in src/migrate.ts without needing
// a live Durable Object / wrangler path to the DO's SQLite.

import Database from "better-sqlite3";
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { MIGRATE_SQL } from "../src/migrate.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dbPath = path.join(root, ".tg-schema.sqlite");

if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");
db.exec(MIGRATE_SQL);
db.close();
console.log(`wrote ${dbPath}`);

const tg = spawnSync("npx", ["tg", "generate"], { cwd: root, stdio: "inherit", shell: true });
process.exit(tg.status ?? 1);
