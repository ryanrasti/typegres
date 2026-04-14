import { db } from "../db";
import { Int8, Text } from "typegres/types";
import { Dogs } from "./dogs";

export class Toys extends db.Table("toys") {
  // @generated-start
  id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  dog_id = (Int8<1>).column({ nonNull: true });
  // relations
  dog() { return Dogs.from().where(({ dogs }) => dogs.id["="](this.dog_id)).cardinality("one"); }
  // @generated-end
}
