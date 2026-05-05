import { Int8, Text } from "typegres";
import { db } from "../db";
import { Dogs } from "./dogs";

export class Teams extends db.Table("teams") {
  // @generated-start
  id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  // relations
  dogs() { return Dogs.from().where(({ dogs }) => dogs.team_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
