import { db } from "../db";
import { expose } from "typegres/core";
import { Integer, Text } from "typegres/sqlite";
import { Messages } from "./messages";
import { RoomMembers } from "./room_members";
import { Rooms } from "./rooms";

export class Users extends db.Table("users") {
  // @generated-start
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  // relations
  @expose() messages() { return Messages.scope(Users.contextOf(this)).where(({ messages }) => messages.user_id.eq(this.id)).cardinality("many"); }
  @expose() room_members() { return RoomMembers.scope(Users.contextOf(this)).where(({ room_members }) => room_members.user_id.eq(this.id)).cardinality("many"); }
  @expose() rooms() { return Rooms.scope(Users.contextOf(this)).where(({ rooms }) => rooms.created_by.eq(this.id)).cardinality("many"); }
  // @generated-end
}
