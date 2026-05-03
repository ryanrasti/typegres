// Cap-bounded API surface exposed to clients via exoeval RPC.
//
// Reads (`customers`, `orders`, etc.) return QueryBuilders so the client
// composes filters / projections / aggregates / live freely. Mutations
// (`advanceOrder`, the insert/update/delete pass-throughs) are concrete
// capabilities — server defines the rules, client calls them by name.

import type { Database } from "typegres";
import { tool } from "typegres/exoeval";
import { Customers } from "../schema/customers";
import { Orders } from "../schema/orders";
import { OrderLines } from "../schema/order_lines";
import { InventoryPositions } from "../schema/inventory_positions";
import { Shipments } from "../schema/shipments";
import { Locations } from "../schema/locations";

// Status lifecycle. Ordered list = both the valid sequence and the source
// of truth for `nextStatus`.
const STATUS_FLOW = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;
type Status = (typeof STATUS_FLOW)[number];
const nextStatus = (cur: string): Status | null => {
  const i = (STATUS_FLOW as readonly string[]).indexOf(cur);
  return i >= 0 && i < STATUS_FLOW.length - 1 ? STATUS_FLOW[i + 1]! : null;
};

export class Api {
  @tool() db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  // --- Reads: all return QueryBuilders the client composes against. ---
  @tool() customers()  { return Customers.from(); }
  @tool() orders()     { return Orders.from(); }
  @tool() orderLines() { return OrderLines.from(); }
  @tool() inventory()  { return InventoryPositions.from(); }
  @tool() shipments()  { return Shipments.from(); }
  @tool() locations()  { return Locations.from(); }

  // --- Mutation entry points: builders the client can chain. ---
  @tool.unchecked() insertOrder(row: { customer_id: string; status?: string; priority?: string; ship_by?: string }) {
    return Orders.insert(row);
  }
  @tool() updateOrder() { return Orders.update(); }
  @tool() deleteOrder() { return Orders.delete(); }

  // --- Capability methods: server owns the rule, client calls by name. ---

  // Advance an order one step along the lifecycle. Throws if already at
  // 'delivered' or if the order doesn't exist.
  @tool.unchecked()
  async advanceOrder(id: string): Promise<{ id: string; status: string }> {
    return this.db.transaction(async (tx) => {
      const [cur] = await Orders.from()
        .where(({ orders }) => orders.id["="](id))
        .select(({ orders }) => ({ status: orders.status }))
        .execute(tx);
      if (!cur) {
        throw new Error(`Order ${id} not found`);
      }
      const next = nextStatus(cur.status);
      if (!next) {
        throw new Error(`Order ${id} is already at terminal status '${cur.status}'`);
      }
      const [updated] = await Orders.update()
        .where(({ orders }) => orders.id["="](id))
        .set(() => ({ status: next }))
        .returning(({ orders }) => ({ id: orders.id, status: orders.status }))
        .execute(tx);
      return updated!;
    });
  }
}
