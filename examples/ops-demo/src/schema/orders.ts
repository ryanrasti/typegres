import { db } from "../db";
import type { Database } from "typegres";
import { Int8, Text, Timestamptz } from "typegres/types";
import { tool } from "typegres/exoeval";
import { sql } from "typegres/sql-builder";
import type { OperatorRoot } from "../server/api";
import { Customers } from "./customers";
import { OrderLines } from "./order_lines";
import { Organizations } from "./organizations";
import { Shipments } from "./shipments";

export class Orders extends db.Table("orders") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() customer_id = (Int8<1>).column({ nonNull: true });
  @tool() status = (Text<1>).column({ nonNull: true, default: sql`'draft'::text` });
  @tool() priority = (Int8<1>).column({ nonNull: true, default: sql`0` });
  @tool() ship_by = (Timestamptz<0 | 1>).column();
  @tool() created_at = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  @tool() organization_id = (Int8<1>).column({ nonNull: true });
  // relations
  @tool() customer() { return Customers.scope(Orders.contextOf(this)).where(({ customers }) => customers.id["="](this.customer_id)).cardinality("one"); }
  @tool() organization() { return Organizations.scope(Orders.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @tool() order_lines() { return OrderLines.scope(Orders.contextOf(this)).where(({ order_lines }) => order_lines.order_id["="](this.id)).cardinality("many"); }
  @tool() shipments() { return Shipments.scope(Orders.contextOf(this)).where(({ shipments }) => shipments.order_id["="](this.id)).cardinality("many"); }
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
  @tool.unchecked()
  async advance(db: Database<OperatorRoot>): Promise<{ id: string; status: string }> {
    const op = Orders.contextOf(this);
    if (!op) {
      throw new Error("Orders.advance() requires a scoped query (op.orders())");
    }
    if (op.role !== "ops_lead") {
      throw new Error(`role '${op.role}' cannot advance orders (ops_lead required)`);
    }
    const [updated] = await Orders.update()
      .where(({ orders }) => orders.id["="](this.id))
      .where(({ orders }) => orders.status["<>"]("delivered"))
      // The WHERE excludes 'delivered' so the CASE always matches; the
      // `as Text<1>` asserts the non-null we structurally guarantee
      // (Text.from(Sql) types as nullable by default).
      .set(() => ({ status: nextStatusExpr as Text<1> }))
      .returning(({ orders }) => ({ id: orders.id, status: orders.status }))
      .execute(db);
    if (!updated) {
      throw new Error("Order is already at terminal status, or no longer exists");
    }
    return updated;
  }
}

// Order lifecycle as a typegres-wrapped CASE expression — keeps the
// transition rules in one place and lets the UPDATE happen in a
// single round-trip. `Text.from(sql\`...\`)` wraps raw SQL as a
// Text-typed Any so set() accepts it.
const nextStatusExpr = Text.from(sql`
  CASE status
    WHEN 'draft'     THEN 'confirmed'
    WHEN 'confirmed' THEN 'picking'
    WHEN 'picking'   THEN 'packed'
    WHEN 'packed'    THEN 'shipped'
    WHEN 'shipped'   THEN 'delivered'
  END
`);