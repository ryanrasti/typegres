import { db } from "../db";
import { expose } from "typegres/core";
import { Int8, Text } from "typegres/postgres";
import { Dogs } from "./dogs";

export class Microchips extends db.Table("microchips") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() serial = Text.column({ nonNull: true });
  @expose() dog_id = Int8.column();
  // relations
  @expose() dog() { return Dogs.scope(Microchips.contextOf(this)).where(({ dogs }) => dogs.id.eq(this.dog_id)).cardinality("maybe"); }
  // @generated-end
}
