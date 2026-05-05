import { db } from "../runtime";
import { Int8, Text, Timestamptz } from "typegres/types";
import { sql } from "typegres";

export class Shipments extends db.Table("shipments") {
  id              = (Int8<1>).column({ nonNull: true, generated: true });
  organization_id = (Int8<1>).column({ nonNull: true });
  order_id        = (Int8<1>).column({ nonNull: true });
  carrier         = (Text<1>).column({ nonNull: true });
  cutoff_at       = (Timestamptz<1>).column({ nonNull: true });
  shipped_at      = (Timestamptz<0 | 1>).column();
  status          = (Text<1>).column({ nonNull: true, default: sql`'pending'::text` });
}
