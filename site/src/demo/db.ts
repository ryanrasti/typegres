// In-browser PGlite + typegres database for the demo.
// Each visitor's tab gets its own seeded DB; reload = reset.
//
// No `@tool` decorators here: the demo runs typegres in-process from
// React (no exoeval/RPC trust boundary to defend), so we don't need
// the decorators that the canonical `examples/ops-demo` uses for the
// wire path. Same data model otherwise.

import { typegres, sql } from "typegres";
import { Int8, Text, Timestamptz } from "typegres/types";
import type { Database } from "typegres";

export type Role = "ops_lead" | "inventory_control" | "account_manager";

export class OperatorRoot {
  operatorId: string;
  organizationId: string;
  role: Role;
  name: string;
  orgName: string;

  constructor(opts: {
    operatorId: string;
    organizationId: string;
    role: Role;
    name: string;
    orgName: string;
  }) {
    this.operatorId = opts.operatorId;
    this.organizationId = opts.organizationId;
    this.role = opts.role;
    this.name = opts.name;
    this.orgName = opts.orgName;
  }
}

// --- Module-level cache: spin up PGlite once per page load ---

type Booted = Awaited<ReturnType<typeof bootDb>>;
let dbPromise: Promise<Booted> | null = null;

const bootDb = async () => {
  const db = await typegres<OperatorRoot>({ type: "pglite" });

  // Schema — typegres's `db.execute` uses prepared statements
  // per-call, so multi-statement DDL has to be split.
  const ddl = [
    sql`CREATE TABLE organizations (
      id   int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      slug text NOT NULL UNIQUE
    )`,
    sql`CREATE TABLE operators (
      id              int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      organization_id int8 NOT NULL REFERENCES organizations(id),
      name            text NOT NULL,
      email           text NOT NULL UNIQUE,
      role            text NOT NULL,
      token           text NOT NULL UNIQUE
    )`,
    sql`CREATE TABLE locations (
      id              int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      organization_id int8 NOT NULL REFERENCES organizations(id),
      code            text NOT NULL,
      name            text NOT NULL
    )`,
    sql`CREATE TABLE customers (
      id              int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      organization_id int8 NOT NULL REFERENCES organizations(id),
      name            text NOT NULL,
      email           text NOT NULL UNIQUE
    )`,
    sql`CREATE TABLE inventory_positions (
      id              int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      organization_id int8 NOT NULL REFERENCES organizations(id),
      location_id     int8 NOT NULL REFERENCES locations(id),
      sku             text NOT NULL,
      on_hand         int8 NOT NULL DEFAULT 0,
      reserved        int8 NOT NULL DEFAULT 0
    )`,
    sql`CREATE TABLE orders (
      id              int8        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      organization_id int8        NOT NULL REFERENCES organizations(id),
      customer_id     int8        NOT NULL REFERENCES customers(id),
      status          text        NOT NULL DEFAULT 'draft',
      priority        int8        NOT NULL DEFAULT 0,
      ship_by         timestamptz,
      created_at      timestamptz NOT NULL DEFAULT now()
    )`,
    sql`CREATE TABLE order_lines (
      id                    int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      order_id              int8 NOT NULL REFERENCES orders(id),
      sku                   text NOT NULL,
      quantity              int8 NOT NULL,
      inventory_position_id int8 REFERENCES inventory_positions(id)
    )`,
    sql`CREATE TABLE shipments (
      id              int8        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      organization_id int8        NOT NULL REFERENCES organizations(id),
      order_id        int8        NOT NULL REFERENCES orders(id),
      carrier         text        NOT NULL,
      cutoff_at       timestamptz NOT NULL,
      shipped_at      timestamptz,
      status          text        NOT NULL DEFAULT 'pending'
    )`,
  ];
  for (const stmt of ddl) {
    await db.execute(stmt);
  }

  await seed(db);

  // Schema classes — bare typegres tables (no decorators since we
  // call methods directly from React, not over RPC).
  class Organizations extends db.Table("organizations") {
    id   = (Int8<1>).column({ nonNull: true, generated: true });
    name = (Text<1>).column({ nonNull: true });
    slug = (Text<1>).column({ nonNull: true });
  }
  class Operators extends db.Table("operators") {
    id              = (Int8<1>).column({ nonNull: true, generated: true });
    organization_id = (Int8<1>).column({ nonNull: true });
    name            = (Text<1>).column({ nonNull: true });
    email           = (Text<1>).column({ nonNull: true });
    role            = (Text<1>).column({ nonNull: true });
    token           = (Text<1>).column({ nonNull: true });
  }
  class Locations extends db.Table("locations") {
    id              = (Int8<1>).column({ nonNull: true, generated: true });
    organization_id = (Int8<1>).column({ nonNull: true });
    code            = (Text<1>).column({ nonNull: true });
    name            = (Text<1>).column({ nonNull: true });
  }
  class Customers extends db.Table("customers") {
    id              = (Int8<1>).column({ nonNull: true, generated: true });
    organization_id = (Int8<1>).column({ nonNull: true });
    name            = (Text<1>).column({ nonNull: true });
    email           = (Text<1>).column({ nonNull: true });
  }
  class InventoryPositions extends db.Table("inventory_positions") {
    id              = (Int8<1>).column({ nonNull: true, generated: true });
    organization_id = (Int8<1>).column({ nonNull: true });
    location_id     = (Int8<1>).column({ nonNull: true });
    sku             = (Text<1>).column({ nonNull: true });
    on_hand         = (Int8<1>).column({ nonNull: true, default: sql`0` });
    reserved        = (Int8<1>).column({ nonNull: true, default: sql`0` });
  }
  class Orders extends db.Table("orders") {
    id              = (Int8<1>).column({ nonNull: true, generated: true });
    organization_id = (Int8<1>).column({ nonNull: true });
    customer_id     = (Int8<1>).column({ nonNull: true });
    status          = (Text<1>).column({ nonNull: true, default: sql`'draft'::text` });
    priority        = (Int8<1>).column({ nonNull: true, default: sql`0` });
    ship_by         = (Timestamptz<0 | 1>).column();
    created_at      = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  }
  class OrderLines extends db.Table("order_lines") {
    id                    = (Int8<1>).column({ nonNull: true, generated: true });
    order_id              = (Int8<1>).column({ nonNull: true });
    sku                   = (Text<1>).column({ nonNull: true });
    quantity              = (Int8<1>).column({ nonNull: true });
    inventory_position_id = (Int8<0 | 1>).column();
  }
  class Shipments extends db.Table("shipments") {
    id              = (Int8<1>).column({ nonNull: true, generated: true });
    organization_id = (Int8<1>).column({ nonNull: true });
    order_id        = (Int8<1>).column({ nonNull: true });
    carrier         = (Text<1>).column({ nonNull: true });
    cutoff_at       = (Timestamptz<1>).column({ nonNull: true });
    shipped_at      = (Timestamptz<0 | 1>).column();
    status          = (Text<1>).column({ nonNull: true, default: sql`'pending'::text` });
  }

  return { db, Organizations, Operators, Locations, Customers, InventoryPositions, Orders, OrderLines, Shipments };
};

// --- Seed: small data set, runs in-browser fast ---
const seed = async (db: Database<OperatorRoot>) => {
  const seeds = [
    sql`INSERT INTO organizations (name, slug) VALUES
      ('BrightShip Logistics', 'brightship'),
      ('Atlas Goods', 'atlas')`,
    sql`INSERT INTO operators (organization_id, name, email, role, token) VALUES
      (1, 'Alice', 'alice@brightship.test', 'ops_lead',          'op_brightship_alice'),
      (1, 'Bob',   'bob@brightship.test',   'inventory_control', 'op_brightship_bob'),
      (2, 'Dave',  'dave@atlas.test',       'ops_lead',          'op_atlas_dave')`,
    sql`INSERT INTO locations (organization_id, code, name) VALUES
      (1, 'BS-NYC', 'Brightship New York'),
      (1, 'BS-LAX', 'Brightship Los Angeles'),
      (2, 'AT-ATL', 'Atlas Atlanta')`,
    sql`INSERT INTO customers (organization_id, name, email) VALUES
      (1, 'Acme Corp',       'ops@acme.test'),
      (1, 'Globex',          'purchasing@globex.test'),
      (1, 'Initech',         'orders@initech.test'),
      (2, 'Pied Piper',      'ops@piedpiper.test'),
      (2, 'Massive Dynamic', 'buying@massive.test')`,
    sql`INSERT INTO inventory_positions (organization_id, location_id, sku, on_hand, reserved) VALUES
      (1, 1, 'BS-SKU-001', 50, 10),
      (1, 1, 'BS-SKU-002', 5,  8),
      (1, 2, 'BS-SKU-001', 30, 5),
      (1, 2, 'BS-SKU-003', 0,  3),
      (2, 3, 'AT-SKU-001', 20, 2),
      (2, 3, 'AT-SKU-002', 1,  5)`,
  ];
  for (const stmt of seeds) {
    await db.execute(stmt);
  }

  // Orders with mixed statuses + ship_by spread across past/present/future.
  // Generated in two batches so org_id and customer_id stay tenant-correct.
  const now = Date.now();
  const days = (n: number) => new Date(now + n * 86400_000).toISOString();
  const STATUSES = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"];
  const orderRows: { org: number; customer: number; status: string; priority: number; ship_by: string }[] = [];
  // BrightShip: 18 orders, customers 1-3
  for (let i = 0; i < 18; i++) {
    orderRows.push({
      org: 1,
      customer: 1 + (i % 3),
      status: STATUSES[i % STATUSES.length]!,
      priority: i % 5,
      ship_by: days(-7 + ((i * 11) % 21)),
    });
  }
  // Atlas: 8 orders, customers 4-5
  for (let i = 0; i < 8; i++) {
    orderRows.push({
      org: 2,
      customer: 4 + (i % 2),
      status: STATUSES[i % STATUSES.length]!,
      priority: i % 3,
      ship_by: days(-3 + ((i * 7) % 14)),
    });
  }
  for (const r of orderRows) {
    await db.execute(sql`
      INSERT INTO orders (organization_id, customer_id, status, priority, ship_by)
      VALUES (${r.org.toString()}, ${r.customer.toString()}, ${r.status}, ${r.priority.toString()}, ${r.ship_by}::timestamptz)
    `);
  }

  // Shipments for orders past 'confirmed' (carrier rotation).
  const carriers = ["UPS", "FedEx", "DHL", "USPS"];
  for (let i = 0; i < orderRows.length; i++) {
    const o = orderRows[i]!;
    if (!["packed", "shipped", "delivered"].includes(o.status)) {
      continue;
    }
    const cutoff = days(-1 + (i % 3));
    const shippedAt = o.status === "packed" ? null : days(-2 + (i % 3));
    await db.execute(sql`
      INSERT INTO shipments (organization_id, order_id, carrier, cutoff_at, shipped_at, status)
      VALUES (${o.org.toString()}, ${(i + 1).toString()}, ${carriers[i % 4]!}, ${cutoff}::timestamptz,
              ${shippedAt}::timestamptz, ${o.status === "packed" ? "pending" : "shipped"})
    `);
  }
};

export const getDb = () => {
  if (!dbPromise) {
    dbPromise = bootDb();
  }
  return dbPromise;
};

// --- Auth: token → OperatorRoot lookup ---
//
// Mirrors the canonical `Api.operator(token)` from examples/ops-demo,
// but in-process. Resolves an operator's identity for use by the
// scoped read methods below.

export const operatorFromToken = async (token: string): Promise<OperatorRoot> => {
  const { db, Operators, Organizations } = await getDb();
  const [op] = await Operators.from()
    .where(({ operators }) => operators.token["="](token))
    .select(({ operators }) => ({
      id: operators.id,
      organization_id: operators.organization_id,
      name: operators.name,
      role: operators.role,
      org: Organizations.from()
        .where(({ organizations }) => organizations.id["="](operators.organization_id))
        .select(({ organizations }) => ({ name: organizations.name }))
        .cardinality("one")
        .scalar(),
    }))
    .execute(db);
  if (!op) {
    throw new Error(`No operator found for token "${token}"`);
  }
  return new OperatorRoot({
    operatorId: op.id,
    organizationId: op.organization_id,
    role: op.role as Role,
    name: op.name,
    orgName: (op.org as { name: string } | null)?.name ?? "?",
  });
};
