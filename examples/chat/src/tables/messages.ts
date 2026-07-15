import { db } from "../db";
import { expose, sql } from "typegres/core";
import { Integer, Text } from "typegres/sqlite";
import { Users } from "./users";
import { Rooms } from "./rooms";

export class Messages extends db.Table("messages") {
  // @generated-start
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() room_id = Integer.column({ nonNull: true });
  @expose() user_id = Integer.column({ nonNull: true });
  @expose() body = Text.column({ nonNull: true });
  @expose() created_at = Text.column({ nonNull: true, default: sql`datetime('now')` });
  // relations
  @expose() author() { return Users.scope(Messages.contextOf(this)).where(({ users }) => users.id.eq(this.user_id)).cardinality("one"); }
  @expose() room() { return Rooms.scope(Messages.contextOf(this)).where(({ rooms }) => rooms.id.eq(this.room_id)).cardinality("one"); }
  // @generated-end
}
