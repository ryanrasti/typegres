import { db } from "../db";
import { Relation, expose, sql } from "typegres";
import { Int8, Text, Timestamptz } from "typegres/postgres";
import { Teams } from "./teams";
import { Collars } from "./collars";
import { Microchips } from "./microchips";
import { Toys } from "./toys";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() breed = Text.column();
  @expose() created_at = Timestamptz.column({ nonNull: true, default: sql`now()` });
  @expose() team_id = Int8.column({ nonNull: true });
  @expose() rival_id = Int8.column();
  // relations
  @expose() rival() { return Relation.belongsTo(this, Dogs, { id: this.rival_id }, { card: "maybe" }); }
  @expose() team() { return Relation.belongsTo(this, Teams, { id: this.team_id }); }
  @expose() collars() { return Relation.has(this, Collars, { dog_id: this.id }, { card: "one" }); }
  @expose() dogs() { return Relation.has(this, Dogs, { rival_id: this.id }); }
  @expose() microchips() { return Relation.has(this, Microchips, { dog_id: this.id }, { card: "maybe" }); }
  @expose() toys() { return Relation.has(this, Toys, { dog_id: this.id }); }
  // @generated-end
}
