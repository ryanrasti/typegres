import { sql, type Connection } from "typegres";
import { db } from "./api.js";

const statements = [
  sql`CREATE TABLE ${db.scopedIdent("users")} (
    ${db.scopedIdent("id")} VARCHAR2(36) PRIMARY KEY,
    ${db.scopedIdent("name")} VARCHAR2(32) NOT NULL UNIQUE,
    ${db.scopedIdent("password_hash")} VARCHAR2(512) NOT NULL
  )`,
  sql`CREATE TABLE ${db.scopedIdent("notes")} (
    ${db.scopedIdent("id")} VARCHAR2(36) PRIMARY KEY,
    ${db.scopedIdent("user_id")} VARCHAR2(36) NOT NULL
      REFERENCES ${db.scopedIdent("users")} (${db.scopedIdent("id")}) ON DELETE CASCADE,
    ${db.scopedIdent("title")} VARCHAR2(120) NOT NULL,
    ${db.scopedIdent("body")} VARCHAR2(4000),
    ${db.scopedIdent("created_at")} VARCHAR2(30) NOT NULL,
    ${db.scopedIdent("updated_at")} VARCHAR2(30) NOT NULL
  )`,
  // Oracle represents an empty VARCHAR2 as NULL, so note bodies are nullable.
  // This also upgrades databases created by the earlier NOT NULL definition.
  sql`ALTER TABLE ${db.scopedIdent("notes")} MODIFY (${db.scopedIdent("body")} NULL)`,
  sql`CREATE INDEX ${db.scopedIdent("notes_user_updated")}
      ON ${db.scopedIdent("notes")} (${db.scopedIdent("user_id")}, ${db.scopedIdent("updated_at")})`,
];

export const migrate = async (conn: Connection): Promise<void> => {
  for (const statement of statements) {
    try {
      await conn.execute(statement);
    } catch (error) {
      if (!(error instanceof Error)
        || (!error.message.includes("ORA-00955") && !error.message.includes("ORA-01451"))) {
        throw error;
      }
    }
  }
};
