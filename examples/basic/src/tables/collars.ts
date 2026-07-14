import { db } from "../db";
import { expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { Dogs } from "./dogs";

export class Collars extends db.Table("collars") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() color = Text.column({ nonNull: true });
  @expose() dog_id = Int8.column({ nonNull: true });
  // relations
  @expose() dog() { return Dogs.scope(Collars.contextOf(this)).where(({ dogs }) => dogs.id.eq(this.dog_id)).cardinality("one"); }
  // @generated-end
}
