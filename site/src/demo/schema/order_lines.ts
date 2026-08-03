import { Relation, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { InventoryPositions } from "./inventory_positions";
import { Orders } from "./orders";

export class OrderLines extends db.Table("order_lines", { live: true }) {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() order_id = Int8.column({ nonNull: true });
  @expose() sku = Text.column({ nonNull: true });
  @expose() quantity = Int8.column({ nonNull: true });
  @expose() inventory_position_id = Int8.column();
  // relations
  @expose() inventory_position() { return Relation.belongsTo(this, InventoryPositions, { id: this.inventory_position_id }, { card: "maybe" }); }
  @expose() order() { return Relation.belongsTo(this, Orders, { id: this.order_id }); }
  // @generated-end
}
