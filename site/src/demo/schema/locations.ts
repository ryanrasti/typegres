import { TypegresLiveEvents, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { InventoryPositions } from "./inventory_positions";
import { Organizations } from "./organizations";

export class Locations extends db.Table("locations", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() organization_id = (Int8<1>).column({ nonNull: true });
  @expose() code = (Text<1>).column({ nonNull: true });
  @expose() name = (Text<1>).column({ nonNull: true });
  // relations
  @expose() organization() { return Organizations.scope(Locations.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @expose() inventory_positions() { return InventoryPositions.scope(Locations.contextOf(this)).where(({ inventory_positions }) => inventory_positions.location_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
