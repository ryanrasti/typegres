CREATE TABLE locations (
  id   int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code text NOT NULL UNIQUE,
  name text NOT NULL
);

CREATE TABLE customers (
  id         int8        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text        NOT NULL,
  email      text        NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE inventory_positions (
  id          int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku         text NOT NULL,
  location_id int8 NOT NULL REFERENCES locations(id),
  on_hand     int8 NOT NULL DEFAULT 0,
  reserved    int8 NOT NULL DEFAULT 0,
  UNIQUE (sku, location_id)
);

CREATE TABLE orders (
  id          int8        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id int8        NOT NULL REFERENCES customers(id),
  status      text        NOT NULL DEFAULT 'draft',
  priority    int8        NOT NULL DEFAULT 0,
  ship_by     timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE order_lines (
  id                    int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id              int8 NOT NULL REFERENCES orders(id),
  sku                   text NOT NULL,
  quantity              int8 NOT NULL,
  inventory_position_id int8 REFERENCES inventory_positions(id)
);

CREATE TABLE shipments (
  id         int8        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id   int8        NOT NULL REFERENCES orders(id),
  carrier    text        NOT NULL,
  cutoff_at  timestamptz NOT NULL,
  shipped_at timestamptz,
  status     text        NOT NULL DEFAULT 'pending'
);
