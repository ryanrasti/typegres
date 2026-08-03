import { Relation, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { Customers } from "./customers";
import { InventoryPositions } from "./inventory_positions";
import { Locations } from "./locations";
import { Users } from "./users";
import { Orders } from "./orders";
import { Shipments } from "./shipments";
export class Organizations extends db.Table("organizations", { live: true }) {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() slug = Text.column({ nonNull: true });
  // relations
  @expose() customers() { return Relation.has(this, Customers, { organization_id: this.id }); }
  @expose() inventory_positions() { return Relation.has(this, InventoryPositions, { organization_id: this.id }); }
  @expose() locations() { return Relation.has(this, Locations, { organization_id: this.id }); }
  @expose() orders() { return Relation.has(this, Orders, { organization_id: this.id }); }
  @expose() shipments() { return Relation.has(this, Shipments, { organization_id: this.id }); }
  @expose() users() { return Relation.has(this, Users, { organization_id: this.id }); }
  // @generated-end
}
