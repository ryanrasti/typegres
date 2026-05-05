// DDL + seed inserts. Runs once on first PGlite boot.
// `db.execute(sql\`...\`)` uses prepared statements per-call, so each
// CREATE / INSERT has to be its own statement.

import { sql } from "typegres";
import type { Database } from "typegres";
import type { OperatorRoot } from "./server/api";

export const runMigrations = async (db: Database<OperatorRoot>) => {
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
};

export const runSeed = async (db: Database<OperatorRoot>) => {
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

  // Orders + shipments — generated, varied by status / ship_by.
  const now = Date.now();
  const days = (n: number) => new Date(now + n * 86400_000).toISOString();
  const STATUSES = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"];
  type O = { org: number; customer: number; status: string; priority: number; ship_by: string };
  const orderRows: O[] = [];
  for (let i = 0; i < 18; i++) {
    orderRows.push({
      org: 1, customer: 1 + (i % 3), status: STATUSES[i % STATUSES.length]!,
      priority: i % 5, ship_by: days(-7 + ((i * 11) % 21)),
    });
  }
  for (let i = 0; i < 8; i++) {
    orderRows.push({
      org: 2, customer: 4 + (i % 2), status: STATUSES[i % STATUSES.length]!,
      priority: i % 3, ship_by: days(-3 + ((i * 7) % 14)),
    });
  }
  for (const r of orderRows) {
    await db.execute(sql`
      INSERT INTO orders (organization_id, customer_id, status, priority, ship_by)
      VALUES (${r.org.toString()}, ${r.customer.toString()}, ${r.status}, ${r.priority.toString()}, ${r.ship_by}::timestamptz)
    `);
  }

  const carriers = ["UPS", "FedEx", "DHL", "USPS"];
  for (let i = 0; i < orderRows.length; i++) {
    const o = orderRows[i]!;
    if (!["packed", "shipped", "delivered"].includes(o.status)) continue;
    const cutoff = days(-1 + (i % 3));
    const shippedAt = o.status === "packed" ? null : days(-2 + (i % 3));
    await db.execute(sql`
      INSERT INTO shipments (organization_id, order_id, carrier, cutoff_at, shipped_at, status)
      VALUES (${o.org.toString()}, ${(i + 1).toString()}, ${carriers[i % 4]!},
              ${cutoff}::timestamptz, ${shippedAt}::timestamptz,
              ${o.status === "packed" ? "pending" : "shipped"})
    `);
  }
};
