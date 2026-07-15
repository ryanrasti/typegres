import { db } from "../db";
import { expose } from "typegres/core";
import { Integer, Text } from "typegres/sqlite";
import { Users } from "./users";
import { Messages } from "./messages";
import { RoomMembers } from "./room_members";

export class Rooms extends db.Table("rooms") {
  // @generated-start
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() created_by_user_id = Integer.column({ nonNull: true });
  // relations
  @expose() created_by_user() { return Users.scope(Rooms.contextOf(this)).where(({ users }) => users.id.eq(this.created_by_user_id)).cardinality("one"); }
  @expose() messages() { return Messages.scope(Rooms.contextOf(this)).where(({ messages }) => messages.room_id.eq(this.id)).cardinality("many"); }
  @expose() room_members() { return RoomMembers.scope(Rooms.contextOf(this)).where(({ room_members }) => room_members.room_id.eq(this.id)).cardinality("many"); }
  // @generated-end
}
