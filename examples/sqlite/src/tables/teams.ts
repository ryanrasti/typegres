import { db } from "../db";
import { expose } from "typegres/core";
import { Integer, Text } from "typegres/sqlite";
import { Dogs } from "./dogs";

export class Teams extends db.Table("teams") {
  // @generated-start
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  // relations
  @expose() dogs() { return Dogs.scope(Teams.contextOf(this)).where(({ dogs }) => dogs.team_id.eq(this.id)).cardinality("many"); }
  // @generated-end
}
