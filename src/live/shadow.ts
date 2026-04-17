import type { Sql } from "../builder/sql";
import { sql } from "../builder/sql";

// SQL to create the live event shadow table. Mutations wrapped by the live
// event store append a row into this table inside the same transaction.
//
// Columns:
//   id         — monotonic per-insert order (not commit order).
//   xid        — pg_current_xact_id() of the mutation's tx; load-bearing for
//                visibility checks via pg_visible_in_snapshot.
//   table      — the mutated table's name, for routing on the match side.
//   before     — jsonb of the pre-mutation row (null on INSERT).
//   after      — jsonb of the post-mutation row (null on DELETE).
//   emitted_at — wall-clock stamp, useful for debugging / retention by time.
export const createShadowTableSql: Sql = sql`
CREATE TABLE IF NOT EXISTS _live_events (
  id         bigserial PRIMARY KEY,
  xid        xid8        NOT NULL DEFAULT pg_current_xact_id(),
  "table"    text        NOT NULL,
  before     jsonb,
  after      jsonb,
  emitted_at timestamptz NOT NULL DEFAULT clock_timestamp()
)
`;

export const dropShadowTableSql: Sql = sql`DROP TABLE IF EXISTS _live_events`;

export const SHADOW_TABLE_NAME = "_live_events";
