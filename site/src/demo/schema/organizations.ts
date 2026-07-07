import { TypegresLiveEvents, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { Customers } from "./customers";
import { InventoryPositions } from "./inventory_positions";
import { Locations } from "./locations";
import { Users } from "./users";
import { Orders } from "./orders";
import { Shipments } from "./shipments";
export class Organizations extends db.Table("organizations", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() name = (Text<1>).column({ nonNull: true });
  @expose() slug = (Text<1>).column({ nonNull: true });
  // relations
  @expose() customers() { return Customers.scope(Organizations.contextOf(this)).where(({ customers }) => customers.organization_id["="](this.id)).cardinality("many"); }
  @expose() inventory_positions() { return InventoryPositions.scope(Organizations.contextOf(this)).where(({ inventory_positions }) => inventory_positions.organization_id["="](this.id)).cardinality("many"); }
  @expose() locations() { return Locations.scope(Organizations.contextOf(this)).where(({ locations }) => locations.organization_id["="](this.id)).cardinality("many"); }
  @expose() orders() { return Orders.scope(Organizations.contextOf(this)).where(({ orders }) => orders.organization_id["="](this.id)).cardinality("many"); }
  @expose() shipments() { return Shipments.scope(Organizations.contextOf(this)).where(({ shipments }) => shipments.organization_id["="](this.id)).cardinality("many"); }
  @expose() users() { return Users.scope(Organizations.contextOf(this)).where(({ users }) => users.organization_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
