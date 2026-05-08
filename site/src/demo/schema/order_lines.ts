import { Int8, Text, TypegresLiveEvents, expose } from "typegres";
import { db } from "../runtime";
import { InventoryPositions } from "./inventory_positions";
import { Orders } from "./orders";

export class OrderLines extends db.Table("order_lines", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() order_id = (Int8<1>).column({ nonNull: true });
  @expose() sku = (Text<1>).column({ nonNull: true });
  @expose() quantity = (Int8<1>).column({ nonNull: true });
  @expose() inventory_position_id = (Int8<0 | 1>).column();
  // relations
  @expose() inventory_position() { return InventoryPositions.scope(OrderLines.contextOf(this)).where(({ inventory_positions }) => inventory_positions.id["="](this.inventory_position_id)).cardinality("maybe"); }
  @expose() order() { return Orders.scope(OrderLines.contextOf(this)).where(({ orders }) => orders.id["="](this.order_id)).cardinality("one"); }
  // @generated-end
}
