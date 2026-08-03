import { Relation, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { InventoryPositions } from "./inventory_positions";
import { Organizations } from "./organizations";

export class Locations extends db.Table("locations", { live: true }) {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() organization_id = Int8.column({ nonNull: true });
  @expose() code = Text.column({ nonNull: true });
  @expose() name = Text.column({ nonNull: true });
  // relations
  @expose() organization() { return Relation.belongsTo(this, Organizations, { id: this.organization_id }); }
  @expose() inventory_positions() { return Relation.has(this, InventoryPositions, { location_id: this.id }); }
  // @generated-end
}
