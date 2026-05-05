import { db } from "../runtime";
import { Int8, Text, Timestamptz } from "typegres/types";
import { sql } from "typegres";

export class Orders extends db.Table("orders") {
  id              = (Int8<1>).column({ nonNull: true, generated: true });
  organization_id = (Int8<1>).column({ nonNull: true });
  customer_id     = (Int8<1>).column({ nonNull: true });
  status          = (Text<1>).column({ nonNull: true, default: sql`'draft'::text` });
  priority        = (Int8<1>).column({ nonNull: true, default: sql`0` });
  ship_by         = (Timestamptz<0 | 1>).column();
  created_at      = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
}
