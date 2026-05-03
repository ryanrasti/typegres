import { db } from "../db";
import { Int8, Text } from "typegres/types";
import { tool } from "typegres/exoeval";
import { Locations } from "./locations";
import { OrderLines } from "./order_lines";
import { sql } from "typegres/sql-builder";

export class InventoryPositions extends db.Table("inventory_positions") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() sku = (Text<1>).column({ nonNull: true });
  @tool() location_id = (Int8<1>).column({ nonNull: true });
  @tool() on_hand = (Int8<1>).column({ nonNull: true, default: sql`0` });
  @tool() reserved = (Int8<1>).column({ nonNull: true, default: sql`0` });
  // relations
  @tool() location() { return Locations.from().where(({ locations }) => locations.id["="](this.location_id)).cardinality("one"); }
  @tool() order_lines() { return OrderLines.from().where(({ order_lines }) => order_lines.inventory_position_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
