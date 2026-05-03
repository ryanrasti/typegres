// Idempotent seed for the ops-demo.
//
// Goal: enough variety that the dashboard widgets are interesting on first
// load — late orders, at-risk shipments, low/constrained stock, mixed
// statuses, mixed priorities, multi-location inventory.
//
// Strategy: TRUNCATE ... RESTART IDENTITY makes IDs predictable
// (locations 1..5, customers 1..10, etc.) so FK refs are hard-coded
// strings — no .returning() bookkeeping needed.

import { sql } from "typegres/sql-builder";
import { db } from "./db";
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
  TRUNCATE shipments, order_lines, orders, inventory_positions, customers, locations
  RESTART IDENTITY CASCADE
`);

// --- Locations: 1..5 ---
await Locations.insert(
  { code: "WH-NYC", name: "New York" },
  { code: "WH-LAX", name: "Los Angeles" },
  { code: "WH-CHI", name: "Chicago" },
  { code: "WH-ATL", name: "Atlanta" },
  { code: "WH-SEA", name: "Seattle" },
).execute(db);

// --- Customers: 1..10 ---
const customerRows: { name: string; email: string }[] = [
  { name: "Acme Corp",       email: "ops@acme.test" },
  { name: "Globex",          email: "purchasing@globex.test" },
  { name: "Initech",         email: "orders@initech.test" },
  { name: "Soylent",         email: "fulfillment@soylent.test" },
  { name: "Umbrella",        email: "logistics@umbrella.test" },
  { name: "Hooli",           email: "supply@hooli.test" },
  { name: "Pied Piper",      email: "ops@piedpiper.test" },
  { name: "Massive Dynamic", email: "buying@massive.test" },
  { name: "Cyberdyne",       email: "orders@cyberdyne.test" },
  { name: "Tyrell",          email: "fulfillment@tyrell.test" },
];
await Customers.insert(customerRows[0]!, ...customerRows.slice(1)).execute(db);

// --- Inventory positions: 20 SKUs × 3 of 5 locations each = 60 positions ---
// On-hand and reserved skewed so a handful of (sku, location) pairs are
// constrained (reserved > on_hand) — those will surface as low-stock /
// at-risk when joined to open orders.
const skus = Array.from({ length: 20 }, (_, i) => `SKU-${String(i + 1).padStart(3, "0")}`);
type InvRow = { sku: string; location_id: string; on_hand: string; reserved: string };
const invRows: InvRow[] = [];
for (let i = 0; i < skus.length; i++) {
  // Each SKU stocked at 3 consecutive locations (wrap around 1..5).
  for (let j = 0; j < 3; j++) {
    const locId = ((i + j) % 5) + 1;
    // Constrained for ~20% of positions, healthy for the rest.
    const constrained = (i * 3 + j) % 7 === 0;
    const onHand = constrained ? (i % 3) : 50 + ((i * 7 + j * 11) % 200);
    const reserved = constrained ? 10 + (j * 5) : (i * 3 + j * 2) % 30;
    invRows.push({
      sku: skus[i]!,
      location_id: String(locId),
      on_hand: String(onHand),
      reserved: String(reserved),
    });
  }
}
await InventoryPositions.insert(invRows[0]!, ...invRows.slice(1)).execute(db);

// --- Orders: 50, with varied status / priority / ship_by ---
type OrderRow = { customer_id: string; status: string; priority: string; ship_by: string };
const STATUSES = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;
// Distribution: 5 draft, 10 confirmed, 10 picking, 10 packed, 10 shipped, 5 delivered.
const statusDist: (typeof STATUSES)[number][] = [
  ...Array(5).fill("draft"),
  ...Array(10).fill("confirmed"),
  ...Array(10).fill("picking"),
  ...Array(10).fill("packed"),
  ...Array(10).fill("shipped"),
  ...Array(5).fill("delivered"),
];
const orderRows: OrderRow[] = statusDist.map((status, i) => {
  // Spread ship_by from -7d to +14d. ~10 land before now (late), ~5 land
  // within ±12h (at risk), the rest are upcoming.
  const shipOffsetDays = -7 + ((i * 17) % 22);
  // Priority: most are 0-2, a handful are 4-5 (rush).
  const priority = i % 11 === 0 ? 5 : i % 7 === 0 ? 4 : i % 3;
  return {
    customer_id: String((i % 10) + 1),
    status,
    priority: String(priority),
    ship_by: iso(shipOffsetDays * DAY),
  };
});
await Orders.insert(orderRows[0]!, ...orderRows.slice(1)).execute(db);

// --- Order lines: 1-3 per order, drawing from existing inventory positions ---
type LineRow = { order_id: string; sku: string; quantity: string; inventory_position_id: string };
const lineRows: LineRow[] = [];
for (let oi = 0; oi < orderRows.length; oi++) {
  const lineCount = (oi % 3) + 1; // 1, 2, or 3 lines
  for (let li = 0; li < lineCount; li++) {
    // Cycle through inventory positions deterministically. Some lines will
    // hit the constrained positions seeded above → low-stock signal.
    const invIdx = (oi * 3 + li * 11) % invRows.length;
    const pos = invRows[invIdx]!;
    lineRows.push({
      order_id: String(oi + 1),
      sku: pos.sku,
      quantity: String(1 + ((oi + li) % 5)),
      inventory_position_id: String(invIdx + 1),
    });
  }
}
await OrderLines.insert(lineRows[0]!, ...lineRows.slice(1)).execute(db);

// --- Shipments: only for orders at packed/shipped/delivered ---
// Cutoff is intentionally close to now for the packed bucket so the
// shipments page has a meaningful "approaching cutoff" queue.
const CARRIERS = ["UPS", "FedEx", "USPS", "DHL"];
type ShipRow = { order_id: string; carrier: string; cutoff_at: string; shipped_at: string | undefined; status: string };
const shipRows: ShipRow[] = [];
for (let i = 0; i < orderRows.length; i++) {
  const status = orderRows[i]!.status;
  if (status !== "packed" && status !== "shipped" && status !== "delivered") {
    continue;
  }
  const carrier = CARRIERS[i % CARRIERS.length]!;
  // Packed: cutoff within ±6h of now (some about to miss). Shipped/
  // delivered: cutoff in the past.
  const cutoffOffsetH = status === "packed" ? -6 + ((i * 5) % 12) : -24 - (i * 3);
  const shipped_at = status === "packed" ? undefined : iso(cutoffOffsetH * HOUR + HOUR);
  shipRows.push({
    order_id: String(i + 1),
    carrier,
    cutoff_at: iso(cutoffOffsetH * HOUR),
    shipped_at,
    status: status === "packed" ? "pending" : "shipped",
  });
}
await Shipments.insert(shipRows[0]!, ...shipRows.slice(1)).execute(db);

console.log(`Seeded:
  ${5} locations
  ${customerRows.length} customers
  ${invRows.length} inventory positions
  ${orderRows.length} orders
  ${lineRows.length} order lines
  ${shipRows.length} shipments`);

process.exit(0);
