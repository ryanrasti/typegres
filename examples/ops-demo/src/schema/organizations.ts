import { Int8, Text, Timestamptz, sql, tool } from "typegres";
import { db } from "../db";
import { Customers } from "./customers";
import { InventoryPositions } from "./inventory_positions";
import { Locations } from "./locations";
import { Operators } from "./operators";
import { Orders } from "./orders";
import { Shipments } from "./shipments";
export class Organizations extends db.Table("organizations") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() name = (Text<1>).column({ nonNull: true });
  @tool() slug = (Text<1>).column({ nonNull: true });
  @tool() created_at = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  // relations
  @tool() customers() { return Customers.scope(Organizations.contextOf(this)).where(({ customers }) => customers.organization_id["="](this.id)).cardinality("many"); }
  @tool() inventory_positions() { return InventoryPositions.scope(Organizations.contextOf(this)).where(({ inventory_positions }) => inventory_positions.organization_id["="](this.id)).cardinality("many"); }
  @tool() locations() { return Locations.scope(Organizations.contextOf(this)).where(({ locations }) => locations.organization_id["="](this.id)).cardinality("many"); }
  @tool() operators() { return Operators.scope(Organizations.contextOf(this)).where(({ operators }) => operators.organization_id["="](this.id)).cardinality("many"); }
  @tool() orders() { return Orders.scope(Organizations.contextOf(this)).where(({ orders }) => orders.organization_id["="](this.id)).cardinality("many"); }
  @tool() shipments() { return Shipments.scope(Organizations.contextOf(this)).where(({ shipments }) => shipments.organization_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
