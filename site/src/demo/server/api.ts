// Capability-rooted API.
//
// Wire root: `Api`. Callers `await api.currentUser()` to get the
// principal (resolved from the ambient token set via
// `setCurrentUserToken`), then compose scoped reads
// (`user.orders().where(...)`) and chain row-level actions
// (`order.advance()`). Every row hydrated from `user.orders()`
// carries `user` as its context (via `Orders.scope(user)` at query
// time), so
// downstream methods on the row can reach the principal via
// `Orders.contextOf(this)` without re-threading.

import { Connection, RpcClient, inMemoryChannel, expose } from "typegres";
import type { RawChannel } from "typegres";
import { z } from "zod";
import { conn } from "../runtime";
import { wireLog } from "../wire-log";
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
  @expose() userId: string;
  @expose() organizationId: string;
  @expose() role: Role;
  @expose() name: string;

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
  @expose() customers() {
    return Customers.scope(this).where(({ customers }) => customers.organization_id["="](this.organizationId));
  }
  @expose() orders() {
    return Orders.scope(this).where(({ orders }) => orders.organization_id["="](this.organizationId));
  }
  @expose() inventory() {
    return InventoryPositions.scope(this).where(({ inventory_positions: p }) => p.organization_id["="](this.organizationId));
  }
  @expose() shipments() {
    return Shipments.scope(this).where(({ shipments }) => shipments.organization_id["="](this.organizationId));
  }
  @expose() locations() {
    return Locations.scope(this).where(({ locations }) => locations.organization_id["="](this.organizationId));
  }
  // Order lines have no direct organization_id; scope through the parent order via a join.
  @expose() orderLines() {
    return OrderLines.scope(this)
      .join(Orders, ({ order_lines: l, orders: o }) =>
        l.order_id["="](o.id).and(o.organization_id["="](this.organizationId)),
      );
  }

  // Demo mutation. Picks a non-terminal order in this user's tenant
  // and runs its `.advance()` lifecycle step. Returns null if there's
  // nothing advanceable. Role gate happens inside Orders.advance().
  @expose(z.lazy(() => z.instanceof(Connection)))
  async advanceRandom(conn: Connection<any>): Promise<{ id: string; status: string } | null> {
    const [row] = await this.orders()
      .where(({ orders }) => orders.status["<>"]("delivered"))
      .limit(1)
      .hydrate(conn);
    if (!row) return null;
    return row.advance(conn);
  }

  // Demo mutation. Picks a random inventory position in this user's
  // tenant and bumps its on_hand by a small random amount. Role-
  // gated to inventory_control — Bob can do this; Alice can't.
  @expose(z.lazy(() => z.instanceof(Connection)))
  async restockRandom(conn: Connection<any>): Promise<{ id: string; on_hand: string } | null> {
    if (this.role !== "inventory_control") {
      throw new Error(`role '${this.role}' cannot restock (inventory_control required)`);
    }
    const [pos] = await this.inventory()
      .limit(1)
      .hydrate(conn);
    if (!pos) return null;
    const delta = 1 + Math.floor(Math.random() * 5);
    return pos.adjust(conn, delta);
  }

  // Demo mutation. Inserts a fresh `draft` order for one of this
  // user's customers. Role-gated like the other writes; tenant comes
  // from the principal — no free-form `organization_id` from the wire.
  @expose(z.lazy(() => z.instanceof(Connection)))
  async insertDraftOrder(conn: Connection<any>): Promise<{ id: string }> {
    if (this.role !== "ops_lead") {
      throw new Error(`role '${this.role}' cannot insert orders (ops_lead required)`);
    }
    // Pick any customer in the user's tenant — we don't expose
    // `customer_id` selection to the wire to keep this a one-click
    // demo action.
    const [cust] = await this.customers()
      .select(({ customers }) => ({ id: customers.id }))
      .execute(conn);
    if (!cust) throw new Error("no customers in this tenant");
    const [row] = await Orders.insert({
      organization_id: this.organizationId,
      customer_id: cust.id,
      status: "draft",
      priority: "0",
    })
      .returning(({ orders }) => ({ id: orders.id }))
      .execute(conn);
    return row!;
  }
}

export class Api {
  @expose() conn: Connection<UserRoot>;

  // Server-side ambient: who's "logged in" for this RPC. In the
  // playground the right-pane user dropdown writes here; in a
  // real deployment this would be set per-request from the auth
  // cookie / bearer token. Widgets read it via `api.currentUser()`.
  #currentUserToken: string | null = null;

  constructor(conn: Connection<UserRoot>) {
    this.conn = conn;
  }

  setCurrentUserToken(token: string | null): void {
    this.#currentUserToken = token;
  }

  // Demo stop-button hook: cancels every active subscription (parked
  // consumers wake with AbortError and exit cleanly); the live engine
  // stays up and the next watch subscribes immediately. In a real
  // deployment the wire would have a per-iter abort channel; here we
  // cancel all subs because the demo only ever has one iter at a time.
  @expose()
  async resetLive(): Promise<void> {
    this.conn.cancelLiveSubscriptions();
  }

  // The principal for this RPC, resolved from the ambient
  // current-user token (set by the page UI via setCurrentUserToken).
  // Real deployments would set this from the request's auth cookie /
  // bearer token before dispatching the rpc closure.
  @expose()
  async currentUser(): Promise<UserRoot> {
    const token = this.#currentUserToken;
    if (!token) throw new Error("no current user — page UI hasn't set one");
    const [u] = await Users.from()
      .where(({ users }) => users.token["="](token))
      .select(({ users }) => ({
        id: users.id,
        organization_id: users.organization_id,
        name: users.name,
        role: users.role,
      }))
      .execute(this.conn);
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
// on the server end with `api` bound to a fresh `Api(conn)`, and the
// JSON-serialized result(s) come back as AsyncIterable<string>.
// Real deployments swap inMemoryChannel for a wire transport.
const apiInstance = new Api(conn);

// Logging channel wrapper: mirrors `inMemoryChannel` but pushes a
// wire-log entry on every closure shipped + every chunk received.
// Live vs query is detected by `.live(` substring in the closure
// source — typegres closures are explicit about which terminator
// they use, so the heuristic is reliable.
const baseChannel: RawChannel = inMemoryChannel(apiInstance);

// Cheap row counter for the wire log. Arrays → length; single
// objects (e.g. `.one()` results, `insertDraftOrder` returning a row)
// → 1; void / null / primitives → null, falls through to bytes in
// the renderer.
const countRows = (chunk: string): number | null => {
  try {
    const v = JSON.parse(chunk);
    if (Array.isArray(v)) {return v.length;}
    if (v !== null && typeof v === "object") {return 1;}
  } catch { /* fall through */ }
  return null;
};

const loggingChannel: RawChannel = async function* (code: string) {
  const isLive = code.includes(".live(");
  wireLog.push({ kind: isLive ? "live-request" : "query-request", t: Date.now(), code });
  try {
    for await (const chunk of baseChannel(code)) {
      wireLog.push({
        kind: isLive ? "live-update" : "query-response",
        t: Date.now(),
        bytes: chunk.length,
        rows: countRows(chunk),
      });
      yield chunk;
    }
  } catch (e) {
    wireLog.push({ kind: "error", t: Date.now(), message: e instanceof Error ? e.message : String(e) });
    throw e;
  }
};
export const client: RpcClient<Api> = new RpcClient<Api>(loggingChannel);

// Page-side hook: dropdown change → ambient current-user token. The
// widget's `api.currentUser()` calls then resolve to whichever user
// is selected on the right pane.
export const setCurrentUserToken = (token: string | null): void =>
  apiInstance.setCurrentUserToken(token);
