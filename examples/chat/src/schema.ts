import { Database, expose, sql, type Connection } from "typegres";
import { Integer, Text } from "typegres/sqlite";

// The chat schema. `db` is dialect + table definitions only (no driver) — each
// Durable Object attaches its own DoSqliteDriver to get a Connection over its
// own storage. Table classes are module-level (bound to this `db`); relations
// use the same scope-propagation the codegen emits.
export const db = new Database({ dialect: "sqlite" });

export class Users extends db.Table("users") {
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
}

export class Rooms extends db.Table("rooms") {
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() created_by = Integer.column({ nonNull: true });

  @expose() creator() {
    return Users.scope(Rooms.contextOf(this)).where(({ users }) => users.id.eq(this.created_by)).cardinality("one");
  }
  @expose() messages() {
    return Messages.scope(Rooms.contextOf(this)).where(({ messages }) => messages.room_id.eq(this.id)).cardinality("many");
  }
}

export class RoomMembers extends db.Table("room_members") {
  @expose() room_id = Integer.column({ nonNull: true });
  @expose() user_id = Integer.column({ nonNull: true });
}

export class Messages extends db.Table("messages") {
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() room_id = Integer.column({ nonNull: true });
  @expose() user_id = Integer.column({ nonNull: true });
  @expose() body = Text.column({ nonNull: true });
  // DB-defaulted (see the DDL below) → optional on insert.
  @expose() created_at = Text.column({ nonNull: true, default: sql`(datetime('now'))` });

  @expose() author() {
    return Users.scope(Messages.contextOf(this)).where(({ users }) => users.id.eq(this.user_id)).cardinality("one");
  }
  @expose() room() {
    return Rooms.scope(Messages.contextOf(this)).where(({ rooms }) => rooms.id.eq(this.room_id)).cardinality("one");
  }
}

// Idempotent schema creation. SqlStorage.exec runs one statement, so each
// CREATE TABLE is issued separately. Run once per DO in its init.
export const migrate = async (conn: Connection): Promise<void> => {
  await conn.execute(sql`CREATE TABLE IF NOT EXISTS users (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  )`);
  await conn.execute(sql`CREATE TABLE IF NOT EXISTS rooms (
    id         INTEGER PRIMARY KEY,
    name       TEXT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id)
  )`);
  await conn.execute(sql`CREATE TABLE IF NOT EXISTS room_members (
    room_id INTEGER NOT NULL REFERENCES rooms(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    PRIMARY KEY (room_id, user_id)
  )`);
  await conn.execute(sql`CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY,
    room_id    INTEGER NOT NULL REFERENCES rooms(id),
    user_id    INTEGER NOT NULL REFERENCES users(id),
    body       TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
};
