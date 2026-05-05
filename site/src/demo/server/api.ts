// Capability-rooted API.
//
// Wire root: `Api`. Its only method is `user(token)` — caller awaits
// to get a `UserRoot`, then composes scoped reads
// (`u.orders().where(...)`) and chains row-level actions
// (`order.advance()`). Every row hydrated from `u.orders()` carries
// `u` as its context (via `Orders.scope(u)` at query time), so
// downstream methods on the row can reach the principal via
// `Orders.contextOf(this)` without re-threading.

import { RpcClient, inMemoryChannel, tool, type Database, type Int8 } from "typegres";
import { db } from "../runtime";
import { Users } from "../schema/users";
import { Customers } from "../schema/customers";
import { Orders } from "../schema/orders";
import { OrderLines } from "../schema/order_lines";
import { InventoryPositions } from "../schema/inventory_positions";
import { Shipments } from "../schema/shipments";
import { Locations } from "../schema/locations";

export type Role = "ops_lead" | "inventory_control" | "account_manager";

// The principal type. Pure identity — no infrastructure handles. Every
// scoped query carries a UserRoot as its context tag; every row
// hydrated from such a query exposes it via `<Table>.contextOf(row)`.
// Row action methods (`Orders.advance(db)` etc.) take a `db` argument
// explicitly — the executor is the caller's responsibility, not the
// principal's.
export class UserRoot {
  @tool() userId: string;
  @tool() organizationId: string;
  @tool() role: Role;
  @tool() name: string;

  constructor(opts: {
    userId: string;
    organizationId: string;
    role: Role;
    name: string;
  }) {
    this.userId = opts.userId;
    this.organizationId = opts.organizationId;
    this.role = opts.role;
    this.name = opts.name;
  }

  // Scoped reads. Each returns a QueryBuilder pre-`where`'d to this
  // org and tagged with `this` as its context. Hydrated rows carry
  // the user forward through every relation traversal.
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

  // Demo mutation. Picks a non-terminal order in this user's tenant
  // and runs its `.advance()` lifecycle step. Returns null if there's
  // nothing advanceable. Role gate happens inside Orders.advance().
  @tool.unchecked()
  async advanceRandom(db: Database<UserRoot>): Promise<{ id: string; status: string } | null> {
    const [row] = await this.orders()
      .where(({ orders }) => orders.status["<>"]("delivered"))
      .limit(1)
      .hydrate(db);
    if (!row) return null;
    return row.advance(db);
  }

  // Demo mutation. Inserts a fresh `draft` order for one of this
  // user's customers. Role-gated like the other writes; tenant comes
  // from the principal — no free-form `organization_id` from the wire.
  @tool.unchecked()
  async insertDraftOrder(db: Database<UserRoot>): Promise<{ id: string }> {
    if (this.role !== "ops_lead") {
      throw new Error(`role '${this.role}' cannot insert orders (ops_lead required)`);
    }
    // Pick any customer in the user's tenant — we don't expose
    // `customer_id` selection to the wire to keep this a one-click
    // demo action.
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
  @tool() db: Database<UserRoot>;

  // Server-side ambient: who's "logged in" for this RPC. In the
  // playground the right-pane operator dropdown writes here; in a
  // real deployment this would be set per-request from the auth
  // cookie / bearer token. Widgets read it via `api.currentUser()`.
  #currentUserToken: string | null = null;

  constructor(db: Database<UserRoot>) {
    this.db = db;
  }

  setCurrentUserToken(token: string | null): void {
    this.#currentUserToken = token;
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

  // The principal for this RPC, resolved from the ambient
  // current-user token. Same shape as `user(token)`; the widget
  // doesn't need to know any tokens — they're chosen by the page UI.
  @tool.unchecked()
  async currentUser(): Promise<UserRoot> {
    const token = this.#currentUserToken;
    if (!token) throw new Error("no current user — page UI hasn't set one");
    return this.user(token);
  }

  // Explicit auth gate by token. Kept alongside `currentUser()` for
  // server-internal use (e.g. resolving a user from a wire-supplied
  // bearer token); the demo widget uses `currentUser()`.
  @tool.unchecked()
  async user(token: string): Promise<UserRoot> {
    const [u] = await Users.from()
      .where(({ users }) => users.token["="](token))
      .select(({ users }) => ({
        id: users.id,
        organization_id: users.organization_id,
        name: users.name,
        role: users.role,
      }))
      .execute(this.db);
    if (!u) {
      throw new Error("invalid token");
    }
    return new UserRoot({
      userId: u.id,
      organizationId: u.organization_id,
      role: u.role as Role,
      name: u.name,
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
const apiInstance = new Api(db);
export const client: RpcClient<Api> = new RpcClient<Api>(inMemoryChannel(apiInstance));

// Page-side hook: dropdown change → ambient current-user token. The
// widget's `api.currentUser()` calls then resolve to whichever user
// is selected on the right pane.
export const setCurrentUserToken = (token: string | null): void =>
  apiInstance.setCurrentUserToken(token);
