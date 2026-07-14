import { db } from "../db";
import { expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { Dogs } from "./dogs";

export class Teams extends db.Table("teams") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  // relations
  @expose() dogs() { return Dogs.scope(Teams.contextOf(this)).where(({ dogs }) => dogs.team_id.eq(this.id)).cardinality("many"); }
  // @generated-end
}
