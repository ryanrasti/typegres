// Standalone DDL for the `_typegres_live_events` shadow table.
// Extracted out of `events.ts` so `database.ts` can call into it
// without dragging the full Table-class chain (events → table →
// insert → database) — that cycle bit us at the chunk boundary
// when vite bundled the site (TDZ during dynamic import).

import { sql, type Sql } from "../builder/sql";

export const EVENTS_TABLE_NAME = "_typegres_live_events";

export function eventsTableSqlStatements(): Sql[] {
  return [
    sql`
      CREATE TABLE IF NOT EXISTS ${sql.ident(EVENTS_TABLE_NAME)} (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        xid xid8 NOT NULL,
        -- before/after are jsonb objects keyed by column name with
        -- values rendered as text — same canonicalization the
        -- extractor uses, so the bus matcher doesn't need per-type
        -- coercion.
        "table" text NOT NULL,
        before jsonb,
        after jsonb,
        -- Wall-clock stamp; not load-bearing for correctness
        -- (matching is xid-based) — used for retention policies and
        -- human-readable ordering when debugging.
        inserted_at timestamptz NOT NULL DEFAULT clock_timestamp()
      )
    `,
    sql`CREATE INDEX IF NOT EXISTS ${sql.ident(`${EVENTS_TABLE_NAME}_xid_idx`)} ON ${sql.ident(EVENTS_TABLE_NAME)} (xid)`,
  ];
}
