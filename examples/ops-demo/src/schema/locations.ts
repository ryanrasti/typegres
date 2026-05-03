import { db } from "../db";
import { Int8, Text } from "typegres/types";
import { tool } from "typegres/exoeval";
import { InventoryPositions } from "./inventory_positions";

export class Locations extends db.Table("locations") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() code = (Text<1>).column({ nonNull: true });
  @tool() name = (Text<1>).column({ nonNull: true });
  // relations
  @tool() inventory_positions() { return InventoryPositions.from().where(({ inventory_positions }) => inventory_positions.location_id["="](this.id)).cardinality("one"); }
  // @generated-end
}
