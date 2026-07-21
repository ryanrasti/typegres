// Standalone DDL for the `_typegres_live_events` shadow table.
// Extracted out of `events.ts` so `database.ts` can call into it
// without dragging the full Table-class chain (events → table →
// insert → database) — that cycle bit us at the chunk boundary
// when vite bundled the site (TDZ during dynamic import).

import { sql, type Sql } from "../../builder/sql";
import type { Connection, Database } from "../../database";

export const EVENTS_TABLE_NAME = "_typegres_live_events";

export const eventsTableSqlStatements = (database: Database): Sql[] => {
  return [
    sql`
      CREATE TABLE IF NOT EXISTS ${database.scopedIdent(EVENTS_TABLE_NAME)} (
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
    sql`CREATE INDEX IF NOT EXISTS ${database.scopedIdent(`${EVENTS_TABLE_NAME}_xid_idx`)} ON ${database.scopedIdent(EVENTS_TABLE_NAME)} (xid)`,
  ];
};

// One-time pg schema setup for live queries (idempotent). Sqlite needs no
// setup — capture rides on RETURNING and events stay in memory.
export const ensurePgLiveEventsTable = async (conn: Connection<any>): Promise<void> => {
  if (conn.database.dialect !== "postgres") {
    throw new Error("ensurePgLiveEventsTable is pg-only — the sqlite live backend has no schema to install");
  }
  for (const stmt of eventsTableSqlStatements(conn.database)) {
    await conn.execute(stmt);
  }
};
