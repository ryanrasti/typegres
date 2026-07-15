import { db } from "../db";
import { expose } from "typegres/core";
import { Integer } from "typegres/sqlite";
import { Users } from "./users";
import { Rooms } from "./rooms";

export class RoomMembers extends db.Table("room_members") {
  // @generated-start
  @expose() room_id = Integer.column({ nonNull: true });
  @expose() user_id = Integer.column({ nonNull: true });
  // relations
  @expose() user() { return Users.scope(RoomMembers.contextOf(this)).where(({ users }) => users.id.eq(this.user_id)).cardinality("one"); }
  @expose() room() { return Rooms.scope(RoomMembers.contextOf(this)).where(({ rooms }) => rooms.id.eq(this.room_id)).cardinality("one"); }
  // @generated-end
}
