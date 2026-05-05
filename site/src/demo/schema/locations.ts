import { db } from "../runtime";
import { Int8, Text } from "typegres/types";
import { TypegresLiveEvents } from "typegres";
import { tool } from "typegres/exoeval";
import { InventoryPositions } from "./inventory_positions";
import { Organizations } from "./organizations";

export class Locations extends db.Table("locations", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() code = (Text<1>).column({ nonNull: true });
  @tool() name = (Text<1>).column({ nonNull: true });
  @tool() organization_id = (Int8<1>).column({ nonNull: true });
  // relations
  @tool() organization() { return Organizations.scope(Locations.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @tool() inventory_positions() { return InventoryPositions.scope(Locations.contextOf(this)).where(({ inventory_positions }) => inventory_positions.location_id["="](this.id)).cardinality("one"); }
  // @generated-end
}
