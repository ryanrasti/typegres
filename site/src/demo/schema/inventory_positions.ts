import { db } from "../runtime";
import { Int8, Text } from "typegres/types";
import { sql } from "typegres";

export class InventoryPositions extends db.Table("inventory_positions") {
  id              = (Int8<1>).column({ nonNull: true, generated: true });
  organization_id = (Int8<1>).column({ nonNull: true });
  location_id     = (Int8<1>).column({ nonNull: true });
  sku             = (Text<1>).column({ nonNull: true });
  on_hand         = (Int8<1>).column({ nonNull: true, default: sql`0` });
  reserved        = (Int8<1>).column({ nonNull: true, default: sql`0` });
}
