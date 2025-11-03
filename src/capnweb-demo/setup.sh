#!/usr/bin/env bash
set -euo pipefail

# Database connection string
DB_URL="postgres://postgres:postgres@localhost:1234/capnweb-demo"
SCHEMA="public"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Run migrations using psql
echo "Running migrations..."
# psql accepts postgres:// URLs directly, but we can also use PGPASSWORD
export PGPASSWORD="postgres"
psql "$DB_URL" <<EOF
create table if not exists "user" (
  id serial primary key,
  username text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists todos (
  id serial primary key,
  user_id int not null references "user"(id) on delete cascade,
  title text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_todos_title on todos using gin (to_tsvector('simple', title));

create index if not exists idx_todos_user_id on todos(user_id);
EOF

# Generate models using tg introspect
echo "Generating models..."
cd "$SCRIPT_DIR/../../.."
./bin/tg introspect -d "$DB_URL" -s "$SCHEMA" > "$SCRIPT_DIR/src/models.ts"

echo "✓ Setup complete! Models written to: $SCRIPT_DIR/src/models.ts"

