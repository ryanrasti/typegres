import { db } from "../runtime";
import { Int8, Text } from "typegres/types";

export class Organizations extends db.Table("organizations") {
  id   = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  slug = (Text<1>).column({ nonNull: true });
}
