// Idempotent seed for the ops-demo.
//
// Two tenants — "BrightShip Logistics" (3PL) and "Atlas Goods" (DTC
// merchant). Each owns its own slice of customers, locations,
// inventory, orders, shipments. Five operators spanning all three
// roles. The same widget queried under different operator tokens
// returns disjoint data — that's the auth story.
//
// IDs are predictable thanks to TRUNCATE ... RESTART IDENTITY:
//   organizations: 1=BrightShip, 2=Atlas
//   operators: 1..3 BrightShip, 4..5 Atlas
//   customers: 1..6 BrightShip, 7..10 Atlas
//   locations: 1..3 BrightShip, 4..5 Atlas
//   inventory_positions, orders, etc. follow.

import { sql } from "typegres/sql-builder";
import { db } from "./db";
import { Organizations } from "./schema/organizations";
import { Operators } from "./schema/operators";
import { Locations } from "./schema/locations";
import { Customers } from "./schema/customers";
import { InventoryPositions } from "./schema/inventory_positions";
import { Orders } from "./schema/orders";
import { OrderLines } from "./schema/order_lines";
import { Shipments } from "./schema/shipments";

const now = new Date();
const HOUR = 3600_000;
const DAY = 24 * HOUR;
const iso = (offsetMs: number): string => new Date(now.getTime() + offsetMs).toISOString();

await db.execute(sql`
  TRUNCATE shipments, order_lines, orders, inventory_positions,
           customers, locations, operators, organizations
  RESTART IDENTITY CASCADE
`);

// --- Organizations: 1=BrightShip, 2=Atlas ---
await Organizations.insert(
  { name: "BrightShip Logistics", slug: "brightship" },
  { name: "Atlas Goods",          slug: "atlas" },
).execute(db);

// --- Operators: 5 total, tokens are visible to anyone using the demo ---
await Operators.insert(
  { organization_id: "1", name: "Alice",  email: "alice@brightship.test",  role: "ops_lead",          token: "op_brightship_alice" },
  { organization_id: "1", name: "Bob",    email: "bob@brightship.test",    role: "inventory_control", token: "op_brightship_bob" },
  { organization_id: "1", name: "Carol",  email: "carol@brightship.test",  role: "account_manager",   token: "op_brightship_carol" },
  { organization_id: "2", name: "Dave",   email: "dave@atlas.test",        role: "ops_lead",          token: "op_atlas_dave" },
  { organization_id: "2", name: "Eve",    email: "eve@atlas.test",         role: "inventory_control", token: "op_atlas_eve" },
).execute(db);

// --- Locations: 3 for BrightShip, 2 for Atlas → 1..5 ---
await Locations.insert(
  { code: "BS-NYC", name: "Brightship New York",   organization_id: "1" },
  { code: "BS-LAX", name: "Brightship Los Angeles", organization_id: "1" },
  { code: "BS-CHI", name: "Brightship Chicago",    organization_id: "1" },
  { code: "AT-ATL", name: "Atlas Atlanta",         organization_id: "2" },
  { code: "AT-SEA", name: "Atlas Seattle",         organization_id: "2" },
).execute(db);

// --- Customers: 6 BrightShip (1..6), 4 Atlas (7..10) ---
type CustomerRow = { name: string; email: string; organization_id: string };
const customerRows: CustomerRow[] = [
  // BrightShip's customers (it's a 3PL serving these merchants)
  { name: "Acme Corp",       email: "ops@acme.test",          organization_id: "1" },
  { name: "Globex",          email: "purchasing@globex.test", organization_id: "1" },
  { name: "Initech",         email: "orders@initech.test",    organization_id: "1" },
  { name: "Soylent",         email: "fulfillment@soylent.test", organization_id: "1" },
  { name: "Umbrella",        email: "logistics@umbrella.test", organization_id: "1" },
  { name: "Hooli",           email: "supply@hooli.test",      organization_id: "1" },
  // Atlas's customers (Atlas does DTC + a few wholesale relationships)
  { name: "Pied Piper",      email: "ops@piedpiper.test",     organization_id: "2" },
  { name: "Massive Dynamic", email: "buying@massive.test",    organization_id: "2" },
  { name: "Cyberdyne",       email: "orders@cyberdyne.test",  organization_id: "2" },
  { name: "Tyrell",          email: "fulfillment@tyrell.test", organization_id: "2" },
];
await Customers.insert(customerRows[0]!, ...customerRows.slice(1)).execute(db);

// --- Inventory positions: per-org SKU lines, each at the org's locations ---
// 14 SKUs at 3 BrightShip locations + 6 SKUs at 2 Atlas locations.
const bsSkus = Array.from({ length: 14 }, (_, i) => `BS-SKU-${String(i + 1).padStart(3, "0")}`);
const atSkus = Array.from({ length: 6 },  (_, i) => `AT-SKU-${String(i + 1).padStart(3, "0")}`);
type InvRow = { sku: string; location_id: string; on_hand: string; reserved: string; organization_id: string };
const invRows: InvRow[] = [];
for (let i = 0; i < bsSkus.length; i++) {
  for (let locOffset = 0; locOffset < 3; locOffset++) {
    const constrained = (i * 3 + locOffset) % 7 === 0;
    invRows.push({
      sku: bsSkus[i]!,
      location_id: String(1 + locOffset),                                  // BrightShip locations 1..3
      on_hand: String(constrained ? (i % 3) : 50 + ((i * 7 + locOffset * 11) % 200)),
      reserved: String(constrained ? 10 + (locOffset * 5) : (i * 3 + locOffset * 2) % 30),
      organization_id: "1",
    });
  }
}
for (let i = 0; i < atSkus.length; i++) {
  for (let locOffset = 0; locOffset < 2; locOffset++) {
    const constrained = (i * 2 + locOffset) % 5 === 0;
    invRows.push({
      sku: atSkus[i]!,
      location_id: String(4 + locOffset),                                  // Atlas locations 4..5
      on_hand: String(constrained ? (i % 2) : 30 + ((i * 5 + locOffset * 7) % 100)),
      reserved: String(constrained ? 8 + (locOffset * 4) : (i * 2 + locOffset) % 20),
      organization_id: "2",
    });
  }
}
await InventoryPositions.insert(invRows[0]!, ...invRows.slice(1)).execute(db);

// --- Orders: 35 BrightShip + 15 Atlas, varied status / priority / ship_by ---
const STATUSES = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;
type OrderRow = { customer_id: string; status: string; priority: string; ship_by: string; organization_id: string };
const orderRows: OrderRow[] = [];
const buildOrders = (count: number, orgId: "1" | "2", customerIds: number[]) => {
  for (let i = 0; i < count; i++) {
    const status = STATUSES[i % STATUSES.length]!;
    const shipOffsetDays = -7 + ((i * 17) % 22);
    const priority = i % 11 === 0 ? 5 : i % 7 === 0 ? 4 : i % 3;
    orderRows.push({
      customer_id: String(customerIds[i % customerIds.length]),
      status,
      priority: String(priority),
      ship_by: iso(shipOffsetDays * DAY),
      organization_id: orgId,
    });
  }
};
buildOrders(35, "1", [1, 2, 3, 4, 5, 6]);
buildOrders(15, "2", [7, 8, 9, 10]);
await Orders.insert(orderRows[0]!, ...orderRows.slice(1)).execute(db);

// --- Order lines: 1-3 per order, drawn from the order's org's inventory ---
type LineRow = { order_id: string; sku: string; quantity: string; inventory_position_id: string };
const lineRows: LineRow[] = [];
// BrightShip's positions are inv ids 1..42 (14*3); Atlas's are 43..54 (6*2).
const bsInvIdRange = { start: 1,  end: 42 };
const atInvIdRange = { start: 43, end: 54 };
for (let oi = 0; oi < orderRows.length; oi++) {
  const order = orderRows[oi]!;
  const range = order.organization_id === "1" ? bsInvIdRange : atInvIdRange;
  const lineCount = (oi % 3) + 1;
  for (let li = 0; li < lineCount; li++) {
    const invId = range.start + ((oi * 3 + li * 11) % (range.end - range.start + 1));
    const pos = invRows[invId - 1]!;
    lineRows.push({
      order_id: String(oi + 1),
      sku: pos.sku,
      quantity: String(1 + ((oi + li) % 5)),
      inventory_position_id: String(invId),
    });
  }
}
await OrderLines.insert(lineRows[0]!, ...lineRows.slice(1)).execute(db);

// --- Shipments: only for orders at packed/shipped/delivered ---
const CARRIERS = ["UPS", "FedEx", "USPS", "DHL"];
type ShipRow = { order_id: string; carrier: string; cutoff_at: string; shipped_at: string | undefined; status: string; organization_id: string };
const shipRows: ShipRow[] = [];
for (let i = 0; i < orderRows.length; i++) {
  const order = orderRows[i]!;
  if (order.status !== "packed" && order.status !== "shipped" && order.status !== "delivered") {
    continue;
  }
  const carrier = CARRIERS[i % CARRIERS.length]!;
  const cutoffOffsetH = order.status === "packed" ? -6 + ((i * 5) % 12) : -24 - (i * 3);
  const shipped_at = order.status === "packed" ? undefined : iso(cutoffOffsetH * HOUR + HOUR);
  shipRows.push({
    order_id: String(i + 1),
    carrier,
    cutoff_at: iso(cutoffOffsetH * HOUR),
    shipped_at,
    status: order.status === "packed" ? "pending" : "shipped",
    organization_id: order.organization_id,
  });
}
await Shipments.insert(shipRows[0]!, ...shipRows.slice(1)).execute(db);

const bsOrders = orderRows.filter((o) => o.organization_id === "1").length;
const atOrders = orderRows.filter((o) => o.organization_id === "2").length;
console.log(`Seeded:
  2 organizations (BrightShip, Atlas)
  5 operators (3 BrightShip, 2 Atlas)
  ${customerRows.length} customers (6 BrightShip, 4 Atlas)
  ${invRows.length} inventory positions
  ${orderRows.length} orders (${bsOrders} BrightShip, ${atOrders} Atlas)
  ${lineRows.length} order lines
  ${shipRows.length} shipments`);

process.exit(0);
