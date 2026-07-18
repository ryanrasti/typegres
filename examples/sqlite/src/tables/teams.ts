import { db } from "../db";
import { Relation, expose } from "typegres";
import { Integer, Text } from "typegres/sqlite";
import { Dogs } from "./dogs";

export class Teams extends db.Table("teams") {
  // @generated-start
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  // relations
  @expose() dogs() { return Relation.has(this, Dogs, { team_id: this.id }); }
  // @generated-end
}
