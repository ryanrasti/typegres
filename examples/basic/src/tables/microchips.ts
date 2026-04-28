import { db } from "../db";
import { Int8, Text } from "typegres/types";
import { Dogs } from "./dogs";

export class Microchips extends db.Table("microchips") {
  // @generated-start
  id = (Int8<1>).column({ nonNull: true, generated: true });
  serial = (Text<1>).column({ nonNull: true });
  dog_id = (Int8<0 | 1>).column();
  // relations
  dog() { return Dogs.from().where(({ dogs }) => dogs.id["="](this.dog_id)).cardinality("maybe"); }
  // @generated-end
}
