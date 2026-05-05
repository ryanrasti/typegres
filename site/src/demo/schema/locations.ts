import { db } from "../runtime";
import { Int8, Text } from "typegres/types";

export class Locations extends db.Table("locations") {
  id              = (Int8<1>).column({ nonNull: true, generated: true });
  organization_id = (Int8<1>).column({ nonNull: true });
  code            = (Text<1>).column({ nonNull: true });
  name            = (Text<1>).column({ nonNull: true });
}
