import { db } from "../db";
import { Int8, Text } from "typegres/types";
import { tool } from "typegres/exoeval";
import { InventoryPositions } from "./inventory_positions";
import { Orders } from "./orders";

export class OrderLines extends db.Table("order_lines") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() order_id = (Int8<1>).column({ nonNull: true });
  @tool() sku = (Text<1>).column({ nonNull: true });
  @tool() quantity = (Int8<1>).column({ nonNull: true });
  @tool() inventory_position_id = (Int8<0 | 1>).column();
  // relations
  @tool() inventory_position() { return InventoryPositions.from().where(({ inventory_positions }) => inventory_positions.id["="](this.inventory_position_id)).cardinality("maybe"); }
  @tool() order() { return Orders.from().where(({ orders }) => orders.id["="](this.order_id)).cardinality("one"); }
  // @generated-end
}
