import { db } from "../db";
import { expose } from "typegres/core";
import { Int8, Text } from "typegres/postgres";
import { Dogs } from "./dogs";

export class Toys extends db.Table("toys") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() dog_id = Int8.column({ nonNull: true });
  // relations
  @expose() dog() { return Dogs.scope(Toys.contextOf(this)).where(({ dogs }) => dogs.id.eq(this.dog_id)).cardinality("one"); }
  // @generated-end
}
