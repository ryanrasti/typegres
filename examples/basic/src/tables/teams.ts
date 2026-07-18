import { db } from "../db";
import { Relation, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { Dogs } from "./dogs";

export class Teams extends db.Table("teams") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  // relations
  @expose() dogs() { return Relation.has(this, Dogs, { team_id: this.id }); }
  // @generated-end
}
