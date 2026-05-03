-- Tenancy + operator personas.
-- Each org owns its own customers / locations / inventory / orders /
-- shipments. Operators belong to one org and have one role; the role
-- gates which capabilities they can invoke against that org's data.
--
-- organization_id is denormalized onto every queryable root (orders,
-- shipments, inventory_positions, customers, locations) so the
-- scoping `where` is a trivial column comparison. Order_lines stay
-- inherited via order_id — they're always queried in the context of
-- their parent order anyway.

CREATE TABLE organizations (
  id         int8        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text        NOT NULL,
  slug       text        NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE operators (
  id              int8        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id int8        NOT NULL REFERENCES organizations(id),
  name            text        NOT NULL,
  email           text        NOT NULL UNIQUE,
  -- role gate. Hardcoded set; pg enums avoided per AGENTS.md (codegen
  -- doesn't support them yet). CHECK constraint gives DB-level safety.
  role            text        NOT NULL CHECK (role IN ('ops_lead', 'inventory_control', 'account_manager')),
  -- Opaque login token. Real apps would do real auth; for the demo
  -- this is just a string the client sends so the server knows who's
  -- calling.
  token           text        NOT NULL UNIQUE,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE customers           ADD COLUMN organization_id int8 NOT NULL REFERENCES organizations(id);
ALTER TABLE locations           ADD COLUMN organization_id int8 NOT NULL REFERENCES organizations(id);
ALTER TABLE orders              ADD COLUMN organization_id int8 NOT NULL REFERENCES organizations(id);
ALTER TABLE inventory_positions ADD COLUMN organization_id int8 NOT NULL REFERENCES organizations(id);
ALTER TABLE shipments           ADD COLUMN organization_id int8 NOT NULL REFERENCES organizations(id);
