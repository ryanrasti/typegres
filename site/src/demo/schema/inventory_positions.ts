import { Connection, sql, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { z } from "zod";
import { db } from "../runtime";
import { Locations } from "./locations";
import { Organizations } from "./organizations";
import { OrderLines } from "./order_lines";
export class InventoryPositions extends db.Table("inventory_positions", { live: true }) {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() organization_id = (Int8<1>).column({ nonNull: true });
  @expose() location_id = (Int8<1>).column({ nonNull: true });
  @expose() sku = (Text<1>).column({ nonNull: true });
  @expose() on_hand = (Int8<1>).column({ nonNull: true, default: sql`0` });
  @expose() reserved = (Int8<1>).column({ nonNull: true, default: sql`0` });
  // relations
  @expose() location() { return Locations.scope(InventoryPositions.contextOf(this)).where(({ locations }) => locations.id["="](this.location_id)).cardinality("one"); }
  @expose() organization() { return Organizations.scope(InventoryPositions.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @expose() order_lines() { return OrderLines.scope(InventoryPositions.contextOf(this)).where(({ order_lines }) => order_lines.inventory_position_id["="](this.id)).cardinality("many"); }
  // @generated-end

  // inventory_control-only: adjust on_hand by a signed delta.
  // Authorization comes from hydration: `InventoryPositions.contextOf(this)`
  // returns the principal that scoped the read, and `this.id` is
  // therefore already in that principal's tenant. Only the role gate
  // is checked here.
  @expose(z.lazy(() => z.instanceof(Connection)), z.number())
  async adjust(conn: Connection<any>, delta: number): Promise<{ id: string; on_hand: string }> {
    const user = InventoryPositions.contextOf(this);
    if (!user) {
      throw new Error("InventoryPositions.adjust() requires a scoped query (user.inventory())");
    }
    if (user.role !== "inventory_control") {
      throw new Error(`role '${user.role}' cannot adjust inventory (inventory_control required)`);
    }
    const [updated] = await InventoryPositions.update()
      .where(({ inventory_positions: p }) => p.id["="](this.id))
      .set(({ inventory_positions: p }) => ({ on_hand: p.on_hand["+"](String(delta)) }))
      .returning(({ inventory_positions: p }) => ({ id: p.id, on_hand: p.on_hand }))
      .execute(conn);
    if (!updated) {
      throw new Error("Inventory position no longer exists");
    }
    return updated;
  }
}
