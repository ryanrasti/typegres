import { db } from "../db";
import { Relation, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { Dogs } from "./dogs";

export class Toys extends db.Table("toys") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() dog_id = Int8.column({ nonNull: true });
  // relations
  @expose() dog() { return Relation.belongsTo(this, Dogs, { id: this.dog_id }); }
  // @generated-end
}
