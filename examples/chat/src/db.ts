import { Database } from "typegres/core";

// Dialect + provenance only — no driver. Each Durable Object attaches its
// own DoSqliteDriver via `db.attach(...)` to get a Connection over its storage.
export const db = new Database({ dialect: "sqlite" });
