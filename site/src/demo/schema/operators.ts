import { db } from "../runtime";
import { Int8, Text } from "typegres/types";

export class Operators extends db.Table("operators") {
  id              = (Int8<1>).column({ nonNull: true, generated: true });
  organization_id = (Int8<1>).column({ nonNull: true });
  name            = (Text<1>).column({ nonNull: true });
  email           = (Text<1>).column({ nonNull: true });
  role            = (Text<1>).column({ nonNull: true });
  token           = (Text<1>).column({ nonNull: true });
}
