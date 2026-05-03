import { db } from "../db";
import type { Database } from "typegres";
import { Int8, Text, Timestamptz } from "typegres/types";
import { tool } from "typegres/exoeval";
import type { OperatorRoot } from "../server/api";
import { Customers } from "./customers";
import { OrderLines } from "./order_lines";
import { Organizations } from "./organizations";
import { Shipments } from "./shipments";
import { sql } from "typegres/sql-builder";

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
  @tool.unchecked()
  async advance(db: Database<OperatorRoot>): Promise<{ id: string; status: string }> {
    const op = Orders.contextOf(this);
    if (!op) {
      throw new Error("Orders.advance() requires a scoped query (op.orders())");
    }
    if (op.role !== "ops_lead") {
      throw new Error(`role '${op.role}' cannot advance orders (ops_lead required)`);
    }
    return db.transaction(async (tx) => {
      const [cur] = await Orders.from()
        .where(({ orders }) => orders.id["="](this.id))
        .select(({ orders }) => ({ status: orders.status }))
        .execute(tx);
      if (!cur) {
        throw new Error("Order no longer exists");
      }
      const next = nextStatus(cur.status);
      if (!next) {
        throw new Error(`Order is already at terminal status '${cur.status}'`);
      }
      const [updated] = await Orders.update()
        .where(({ orders }) => orders.id["="](this.id))
        .set(() => ({ status: next }))
        .returning(({ orders }) => ({ id: orders.id, status: orders.status }))
        .execute(tx);
      return updated!;
    });
  }
}

// Order lifecycle. Single source of truth for `nextStatus`.
const STATUS_FLOW = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;
const nextStatus = (cur: string): (typeof STATUS_FLOW)[number] | null => {
  const i = (STATUS_FLOW as readonly string[]).indexOf(cur);
  return i >= 0 && i < STATUS_FLOW.length - 1 ? STATUS_FLOW[i + 1]! : null;
};