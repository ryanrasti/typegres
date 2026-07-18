import { db } from "../db";
import { Relation, expose } from "typegres";
import { Integer, Text } from "typegres/sqlite";
import { Teams } from "./teams";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() breed = Text.column();
  @expose() team_id = Integer.column({ nonNull: true });
  // relations
  @expose() team() { return Relation.belongsTo(this, Teams, { id: this.team_id }); }
  // @generated-end
}
