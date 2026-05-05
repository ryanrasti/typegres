import { db } from "../runtime";
import { Int8, Text } from "typegres/types";

export class OrderLines extends db.Table("order_lines") {
  id                    = (Int8<1>).column({ nonNull: true, generated: true });
  order_id              = (Int8<1>).column({ nonNull: true });
  sku                   = (Text<1>).column({ nonNull: true });
  quantity              = (Int8<1>).column({ nonNull: true });
  inventory_position_id = (Int8<0 | 1>).column();
}
