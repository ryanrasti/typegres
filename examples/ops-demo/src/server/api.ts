// Capability-rooted API.
//
// Wire root: `Api`. Its only method is `operator(token)` — caller
// awaits to get an `OperatorRoot`, then composes scoped reads
// (`op.orders().where(...)`) and chains row-level actions
// (`order.advance()`). Every row hydrated from `op.orders()` carries
// `op` as its context (via `Orders.scope(op)` at query time), so
// downstream methods on the row can reach the principal via
// `Orders.contextOf(this)` without re-threading.

import { tool, type Database } from "typegres";
import { Operators } from "../schema/operators";
import { Customers } from "../schema/customers";
import { Orders } from "../schema/orders";
import { OrderLines } from "../schema/order_lines";
import { InventoryPositions } from "../schema/inventory_positions";
import { Shipments } from "../schema/shipments";
import { Locations } from "../schema/locations";

export type Role = "ops_lead" | "inventory_control" | "account_manager";

// The principal type. Pure identity — no infrastructure handles. Every
// scoped query carries an OperatorRoot as its context tag; every row
// hydrated from such a query exposes it via `<Table>.contextOf(row)`.
// Row action methods (`Orders.advance(db)` etc.) take a `db` argument
// explicitly — the executor is the caller's responsibility, not the
// principal's.
export class OperatorRoot {
  @tool() operatorId: string;
  @tool() organizationId: string;
  @tool() role: Role;
  @tool() name: string;

  constructor(opts: {
    operatorId: string;
    organizationId: string;
    role: Role;
    name: string;
  }) {
    this.operatorId = opts.operatorId;
    this.organizationId = opts.organizationId;
    this.role = opts.role;
    this.name = opts.name;
  }

  // Scoped reads. Each returns a QueryBuilder pre-`where`'d to this
  // org and tagged with `this` as its context. Hydrated rows carry
  // the operator forward through every relation traversal.
  @tool() customers() {
    return Customers.scope(this).where(({ customers }) => customers.organization_id["="](this.organizationId));
  }
  @tool() orders() {
    return Orders.scope(this).where(({ orders }) => orders.organization_id["="](this.organizationId));
  }
  @tool() inventory() {
    return InventoryPositions.scope(this).where(({ inventory_positions: p }) => p.organization_id["="](this.organizationId));
  }
  @tool() shipments() {
    return Shipments.scope(this).where(({ shipments }) => shipments.organization_id["="](this.organizationId));
  }
  @tool() locations() {
    return Locations.scope(this).where(({ locations }) => locations.organization_id["="](this.organizationId));
  }
  // Order lines have no direct organization_id; scope through the parent order via a join.
  @tool() orderLines() {
    return OrderLines.scope(this)
      .join(Orders, ({ order_lines: l, orders: o }) =>
        l.order_id["="](o.id).and(o.organization_id["="](this.organizationId)),
      );
  }
}

export class Api {
  @tool() db: Database<OperatorRoot>;

  constructor(db: Database<OperatorRoot>) {
    this.db = db;
  }

  // Single auth gate. Caller awaits to materialize an OperatorRoot,
  // then chains scoped reads / row actions inside the same async wire
  // closure. Throws on unknown token.
  @tool.unchecked()
  async operator(token: string): Promise<OperatorRoot> {
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
    return new OperatorRoot({
      operatorId: op.id,
      organizationId: op.organization_id,
      role: op.role as Role,
      name: op.name,
    });
  }
}
