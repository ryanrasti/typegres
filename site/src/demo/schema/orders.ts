import { Database, Int8, Text, Timestamptz, TypegresLiveEvents, sql, expose } from "typegres";
import { z } from "zod";
import { db } from "../runtime";
import { Customers } from "./customers";
import { OrderLines } from "./order_lines";
import { Organizations } from "./organizations";
import { Shipments } from "./shipments";

export class Orders extends db.Table("orders", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() organization_id = (Int8<1>).column({ nonNull: true });
  @expose() customer_id = (Int8<1>).column({ nonNull: true });
  @expose() status = (Text<1>).column({ nonNull: true, default: sql`'draft'::text` });
  @expose() priority = (Int8<1>).column({ nonNull: true, default: sql`0` });
  @expose() ship_by = (Timestamptz<0 | 1>).column();
  @expose() created_at = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  // relations
  @expose() customer() { return Customers.scope(Orders.contextOf(this)).where(({ customers }) => customers.id["="](this.customer_id)).cardinality("one"); }
  @expose() organization() { return Organizations.scope(Orders.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @expose() order_lines() { return OrderLines.scope(Orders.contextOf(this)).where(({ order_lines }) => order_lines.order_id["="](this.id)).cardinality("many"); }
  @expose() shipments() { return Shipments.scope(Orders.contextOf(this)).where(({ shipments }) => shipments.order_id["="](this.id)).cardinality("many"); }
  // @generated-end

  // ops_lead-only: advance this order one step along the lifecycle
  // (draft → confirmed → … → delivered). Authorization comes from the
  // act of hydration: `Orders.contextOf(this)` returns the principal
  // that scoped the read, and the row's id is therefore already
  // guaranteed to belong to that principal's tenant. The only check
  // here is the role gate (orthogonal to tenancy).
  //
  // The CASE expression encodes the lifecycle in SQL — single
  // round-trip, atomic, no read-then-write. The terminal-status
  // check is "did anything come back from RETURNING?" — `delivered`
  // rows have no next state, so the CASE returns NULL and the WHERE
  // (which excludes NULL) keeps them unchanged.
  @expose(z.lazy(() => z.instanceof(Database)))
  async advance(db: Database<any>): Promise<{ id: string; status: string }> {
    const user = Orders.contextOf(this);
    if (!user) {
      throw new Error("Orders.advance() requires a scoped query (user.orders())");
    }
    if (user.role !== "ops_lead") {
      throw new Error(`role '${user.role}' cannot advance orders (ops_lead required)`);
    }
    const [updated] = await Orders.update()
      .where(({ orders }) => orders.id["="](this.id))
      .where(({ orders }) => orders.status["<>"]("delivered"))
      // CASE encodes the lifecycle in SQL — single round-trip, atomic.
      // The WHERE excludes 'delivered' so CASE always matches; the
      // `as Text<1>` asserts the non-null we structurally guarantee.
      // Interpolating `orders.status` into the template emits the
      // properly-qualified column reference (the live transformer
      // wraps the UPDATE in a CTE that also has a `status` column;
      // unqualified would be ambiguous).
      .set(({ orders }) => ({
        status: Text.from(sql`
          CASE ${orders.status}
            WHEN 'draft'     THEN 'confirmed'
            WHEN 'confirmed' THEN 'picking'
            WHEN 'picking'   THEN 'packed'
            WHEN 'packed'    THEN 'shipped'
            WHEN 'shipped'   THEN 'delivered'
          END
        `) as Text<1>,
      }))
      .returning(({ orders }) => ({ id: orders.id, status: orders.status }))
      .execute(db);
    if (!updated) {
      throw new Error("Order is already at terminal status, or no longer exists");
    }
    return updated;
  }
}