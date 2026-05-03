// Capability-rooted API.
//
// The wire-exposed root is `Api` — its only method is `login(token)`,
// which authenticates an operator and returns an `OperatorRoot`
// scoped to that operator's organization and role. Every read on
// OperatorRoot is pre-`where`'d to the operator's org_id; every
// mutation method first checks the role.
//
// A client with an `OperatorRoot` *cannot* construct an unscoped
// `Orders.from()` — there's no method that hands one out. Tenancy is
// enforced by construction, not by hope.

import type { Database } from "typegres";
import { tool } from "typegres/exoeval";
import { Operators } from "../schema/operators";
import { Customers } from "../schema/customers";
import { Orders } from "../schema/orders";
import { OrderLines } from "../schema/order_lines";
import { InventoryPositions } from "../schema/inventory_positions";
import { Shipments } from "../schema/shipments";
import { Locations } from "../schema/locations";

// Order lifecycle. Single source of truth for `nextStatus`.
const STATUS_FLOW = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;
type Status = (typeof STATUS_FLOW)[number];
const nextStatus = (cur: string): Status | null => {
  const i = (STATUS_FLOW as readonly string[]).indexOf(cur);
  return i >= 0 && i < STATUS_FLOW.length - 1 ? STATUS_FLOW[i + 1]! : null;
};

type Role = "ops_lead" | "inventory_control" | "account_manager";

export class Api {
  @tool() db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  // The single auth gate. Looks up the operator by token, hands the
  // resolved OperatorRoot to the caller's closure. Returning the root
  // directly from the wire would force the client to chain `.then(op
  // => ...)`, which exoeval forbids (`then` is on the disallowed
  // properties list). Higher-order shape avoids that AND ensures
  // callers can never observe an unscoped reference.
  @tool.unchecked()
  async withOperator<R>(token: string, fn: (op: OperatorRoot) => R | Promise<R>): Promise<R> {
    const [op] = await Operators.from()
      .where(({ operators }) => operators.token["="](token))
      .select(({ operators }) => ({
        id: operators.id,
        organization_id: operators.organization_id,
        name: operators.name,
        role: operators.role,
      }))
      .execute(this.db);
    if (!op) {
      throw new Error("invalid token");
    }
    const root = new OperatorRoot({
      db: this.db,
      operatorId: op.id,
      organizationId: op.organization_id,
      role: op.role as Role,
      name: op.name,
    });
    return fn(root);
  }
}

export class OperatorRoot {
  @tool() db: Database;
  @tool() operatorId: string;
  @tool() organizationId: string;
  @tool() role: Role;
  @tool() name: string;

  constructor(opts: { db: Database; operatorId: string; organizationId: string; role: Role; name: string }) {
    this.db = opts.db;
    this.operatorId = opts.operatorId;
    this.organizationId = opts.organizationId;
    this.role = opts.role;
    this.name = opts.name;
  }

  // --- Reads. Each returns a QueryBuilder pre-scoped to this org. ---
  @tool() customers() {
    return Customers.from()
      .where(({ customers }) => customers.organization_id["="](this.organizationId));
  }
  @tool() orders() {
    return Orders.from()
      .where(({ orders }) => orders.organization_id["="](this.organizationId));
  }
  @tool() inventory() {
    return InventoryPositions.from()
      .where(({ inventory_positions: p }) => p.organization_id["="](this.organizationId));
  }
  @tool() shipments() {
    return Shipments.from()
      .where(({ shipments }) => shipments.organization_id["="](this.organizationId));
  }
  @tool() locations() {
    return Locations.from()
      .where(({ locations }) => locations.organization_id["="](this.organizationId));
  }
  // Order lines have no direct organization_id; scope through the parent
  // order's org_id via a join.
  @tool() orderLines() {
    return OrderLines.from()
      .join(Orders, ({ order_lines: l, orders: o }) =>
        l.order_id["="](o.id).and(o.organization_id["="](this.organizationId)),
      );
  }

  // --- Capability methods: role gates first, then scoped action. ---

  // ops_lead-only: advance an order one step along the lifecycle.
  // Verifies the order belongs to this org before touching it.
  @tool.unchecked()
  async advanceOrder(id: string): Promise<{ id: string; status: string }> {
    if (this.role !== "ops_lead") {
      throw new Error(`role '${this.role}' cannot advance orders (ops_lead required)`);
    }
    return this.db.transaction(async (tx) => {
      const [cur] = await Orders.from()
        .where(({ orders }) => orders.id["="](id))
        .where(({ orders }) => orders.organization_id["="](this.organizationId))
        .select(({ orders }) => ({ status: orders.status }))
        .execute(tx);
      if (!cur) {
        throw new Error(`Order ${id} not found in your organization`);
      }
      const next = nextStatus(cur.status);
      if (!next) {
        throw new Error(`Order ${id} is already at terminal status '${cur.status}'`);
      }
      const [updated] = await Orders.update()
        .where(({ orders }) => orders.id["="](id))
        .where(({ orders }) => orders.organization_id["="](this.organizationId))
        .set(() => ({ status: next }))
        .returning(({ orders }) => ({ id: orders.id, status: orders.status }))
        .execute(tx);
      return updated!;
    });
  }

  // inventory_control-only: adjust on-hand quantity by a signed delta.
  // Scoped to this org's positions only (the where filter ensures a
  // wrong position_id from another tenant simply doesn't match).
  // Implementation reads then writes inside one txn — `set()`'s zod
  // validator rejects typegres expressions as values (would-be SQL
  // `SET on_hand = on_hand + $1`), see AGENTS.md.
  @tool.unchecked()
  async adjustInventory(positionId: string, delta: number): Promise<{ id: string; on_hand: string }> {
    if (this.role !== "inventory_control") {
      throw new Error(`role '${this.role}' cannot adjust inventory (inventory_control required)`);
    }
    return this.db.transaction(async (tx) => {
      const [cur] = await InventoryPositions.from()
        .where(({ inventory_positions: p }) => p.id["="](positionId))
        .where(({ inventory_positions: p }) => p.organization_id["="](this.organizationId))
        .select(({ inventory_positions: p }) => ({ on_hand: p.on_hand }))
        .execute(tx);
      if (!cur) {
        throw new Error(`Inventory position ${positionId} not found in your organization`);
      }
      const next = String(BigInt(cur.on_hand) + BigInt(delta));
      const [updated] = await InventoryPositions.update()
        .where(({ inventory_positions: p }) => p.id["="](positionId))
        .where(({ inventory_positions: p }) => p.organization_id["="](this.organizationId))
        .set(() => ({ on_hand: next }))
        .returning(({ inventory_positions: p }) => ({ id: p.id, on_hand: p.on_hand }))
        .execute(tx);
      return updated!;
    });
  }
}
