// Capability-rooted API.
//
// Wire root: `Api`. Its only method is `operator(token)` — caller
// awaits to get an `OperatorRoot`, then composes scoped reads
// (`op.orders().where(...)`) and chains row-level actions
// (`order.advance()`). Every row hydrated from `op.orders()` carries
// `op` as its context (via `Orders.scope(op)` at query time), so
// downstream methods on the row can reach the principal via
// `Orders.contextOf(this)` without re-threading.

import { tool, type Database, type Int8 } from "typegres";
import { RpcClient, inMemoryChannel } from "typegres/exoeval";
import { db } from "../runtime";
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

  // Demo mutation. Picks a non-terminal order in op's tenant and runs
  // its `.advance()` lifecycle step. Returns null if there's nothing
  // advanceable. Role gate happens inside Orders.advance().
  @tool.unchecked()
  async advanceRandom(db: Database<OperatorRoot>): Promise<{ id: string; status: string } | null> {
    const [row] = await this.orders()
      .where(({ orders }) => orders.status["<>"]("delivered"))
      .limit(1)
      .hydrate(db);
    if (!row) return null;
    return row.advance(db);
  }

  // Demo mutation. Inserts a fresh `draft` order for one of op's
  // customers. Role-gated like the other writes; tenant comes from
  // the principal — no free-form `organization_id` from the wire.
  @tool.unchecked()
  async insertDraftOrder(db: Database<OperatorRoot>): Promise<{ id: string }> {
    if (this.role !== "ops_lead") {
      throw new Error(`role '${this.role}' cannot insert orders (ops_lead required)`);
    }
    // Pick any customer in op's tenant — we don't expose `customer_id`
    // selection to the wire to keep this a one-click demo action.
    const [cust] = await this.customers()
      .select(({ customers }) => ({ id: customers.id }))
      .execute(db);
    if (!cust) throw new Error("no customers in this tenant");
    const [row] = await Orders.insert({
      organization_id: this.organizationId as unknown as Int8<1>,
      customer_id: cust.id as unknown as Int8<1>,
      status: "draft",
      priority: "0" as unknown as Int8<1>,
    })
      .returning(({ orders }) => ({ id: orders.id }))
      .execute(db);
    return row!;
  }
}

export class Api {
  @tool() db: Database<OperatorRoot>;

  constructor(db: Database<OperatorRoot>) {
    this.db = db;
  }

  // Demo stop-button hook. `db.stopLive()` cancels every active
  // subscription (parked consumers wake with AbortError and exit
  // cleanly), then we re-start the bus so the next watch can
  // subscribe immediately. In a real deployment the wire would have
  // a per-iter abort channel; here we tear down the whole bus
  // because the demo only ever has one iter at a time.
  @tool.unchecked()
  async resetLive(): Promise<void> {
    await this.db.stopLive();
    await this.db.startLive();
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

// The exoeval RPC client widgets dispatch through. Lives here (rather
// than in runtime.ts) because runtime.ts feeds db to the schemas and
// the schemas feed back here — putting client construction here puts
// it strictly downstream of that cycle.
//
// Widgets call `client.run(async (api) => ...)`; the closure is
// stringified, shipped through `inMemoryChannel`, parsed by exoEval
// on the server end with `api` bound to a fresh `Api(db)`, and the
// JSON-serialized result(s) come back as AsyncIterable<string>.
// Real deployments swap inMemoryChannel for a wire transport.
export const client: RpcClient<Api> = new RpcClient<Api>(inMemoryChannel(new Api(db)));
