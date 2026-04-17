import { sql } from "../builder/sql";
import type { Database } from "../database";
import type { PredicateSet } from "./types";
import { LiveQueryError } from "./types";

// --- LiveEvent ---

export interface LiveEvent {
  id: bigint;                   // monotonic insert order on the shadow table
  xid: bigint;                  // pg xid8 of the emitting tx
  table: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
}

// --- Cursor (pg_current_snapshot text) ---

export type Cursor = string; // "xmin:xmax:xip1,xip2,..."

interface ParsedSnapshot {
  xmin: bigint;
  xmax: bigint;
  xip: Set<bigint>;
}

const parseSnapshot = (cursor: Cursor): ParsedSnapshot => {
  const parts = cursor.split(":");
  if (parts.length < 2) {
    throw new LiveQueryError(`invalid cursor: "${cursor}"`);
  }
  const xip = new Set<bigint>();
  if (parts[2]) {
    for (const s of parts[2].split(",")) {
      if (s.length > 0) { xip.add(BigInt(s)); }
    }
  }
  return { xmin: BigInt(parts[0]!), xmax: BigInt(parts[1]!), xip };
};

// pg_visible_in_snapshot semantics. Returns true if xid is considered
// "already committed and visible" at the cursor's snapshot. For events
// originating from committed transactions (which is all of them — rolled-back
// txs never make it to the shadow table):
//   - xid <  xmin → committed before snapshot, visible
//   - xid >= xmax → future to snapshot, not visible
//   - xmin <= xid < xmax → visible iff xid NOT in xip_list
const isVisibleInSnapshot = (xid: bigint, snap: ParsedSnapshot): boolean => {
  if (xid < snap.xmin) { return true; }
  if (xid >= snap.xmax) { return false; }
  return !snap.xip.has(xid);
};

// --- Errors ---

export class CursorTooOldError extends LiveQueryError {
  name = "CursorTooOldError";
  constructor(readonly cursor: Cursor, readonly retentionFloor: bigint) {
    super(`cursor ${cursor} is older than retention floor xmin=${retentionFloor}`);
  }
}

// --- Bus ---

export interface LiveBusOptions {
  // Max events retained before oldest are evicted. Default 1024.
  ringMax?: number;
  // Background poll interval in ms. Default 50.
  pollIntervalMs?: number;
}

export class LiveBus {
  #db: Database;
  #ringMax: number;
  #pollIntervalMs: number;
  #ring: LiveEvent[] = [];
  #floor: bigint = 0n;
  #lastSeenId: bigint = 0n;
  #waiters = new Set<() => void>();
  #pollTimer: ReturnType<typeof setInterval> | undefined;
  #initialized = false;

  constructor(db: Database, opts: LiveBusOptions = {}) {
    this.#db = db;
    this.#ringMax = opts.ringMax ?? 1024;
    this.#pollIntervalMs = opts.pollIntervalMs ?? 50;
  }

  // Start background polling. Idempotent.
  start(): void {
    if (this.#pollTimer) { return; }
    this.#pollTimer = setInterval(() => {
      void this.#poll().catch((e: unknown) => {
        console.error("LiveBus poll failed:", e);
      });
    }, this.#pollIntervalMs);
  }

  stop(): void {
    if (this.#pollTimer) {
      clearInterval(this.#pollTimer);
      this.#pollTimer = undefined;
    }
    this.#waiters.clear();
  }

  // Force a poll synchronously. Useful for deterministic tests.
  async syncNow(): Promise<void> { await this.#poll(); }

  get retentionFloor(): bigint { return this.#floor; }
  get ringSize(): number { return this.#ring.length; }

  // Internal: scan the ring for events not-visible-in-cursor that match preds.
  // Returns true if at least one matching event exists.
  _hasMatchingEvent(preds: PredicateSet, cursor: Cursor): boolean {
    const snap = parseSnapshot(cursor);
    for (const event of this.#ring) {
      if (isVisibleInSnapshot(event.xid, snap)) { continue; }
      if (eventMatchesPreds(event, preds)) { return true; }
    }
    return false;
  }

  _onNewEvents(fn: () => void): () => void {
    this.#waiters.add(fn);
    return () => this.#waiters.delete(fn);
  }

  async #poll(): Promise<void> {
    // On first poll, initialize #floor from the current min xid in the table
    // so admission works correctly before we've seen anything.
    if (!this.#initialized) {
      this.#initialized = true;
      const init = await this.#db.execute(
        sql`SELECT COALESCE(MIN(xid)::text, '0') AS min_xid, COALESCE(MAX(id)::text, '0') AS max_id FROM _live_events`,
      );
      const row = (init.rows as { min_xid: string; max_id: string }[])[0]!;
      this.#floor = BigInt(row.min_xid);
      this.#lastSeenId = BigInt(row.max_id);
      // Don't backfill past events — callers subscribing see only events going
      // forward, unless their cursor predates the min xid (→ CursorTooOldError).
      return;
    }

    const result = await this.#db.execute(
      sql`SELECT id::text AS id, xid::text AS xid, ${sql.ident("table")} AS tbl, before::text AS before, after::text AS after
          FROM _live_events
          WHERE id > ${sql.param(this.#lastSeenId.toString())}::int8
          ORDER BY id`,
    );
    const rows = result.rows as { id: string; xid: string; tbl: string; before: string | null; after: string | null }[];
    if (rows.length === 0) { return; }
    for (const row of rows) {
      const event: LiveEvent = {
        id: BigInt(row.id),
        xid: BigInt(row.xid),
        table: row.tbl,
        before: row.before ? JSON.parse(row.before) : null,
        after: row.after ? JSON.parse(row.after) : null,
      };
      this.#ring.push(event);
      this.#lastSeenId = event.id;
      while (this.#ring.length > this.#ringMax) {
        const dropped = this.#ring.shift()!;
        if (dropped.xid + 1n > this.#floor) {
          this.#floor = dropped.xid + 1n;
        }
      }
    }
    // Wake every current waiter — they re-scan the ring with their preds/cursor.
    const waiters = [...this.#waiters];
    for (const w of waiters) { w(); }
  }

  subscribe(): Subscription {
    return new Subscription(this);
  }
}

// --- Subscription ---

// Match rule (v1, flat-set): an event fires if any watched (table, col) value
// is present in the event's before row or after row. Implicit OR across every
// pair — same semantics documented in AGENTS.md "Matching".
const eventMatchesPreds = (event: LiveEvent, preds: PredicateSet): boolean => {
  const perTable = preds.get(event.table);
  if (!perTable) { return false; }
  for (const row of [event.before, event.after]) {
    if (!row) { continue; }
    for (const [col, values] of perTable) {
      const v = row[col];
      if (v == null) { continue; }
      if (values.has(String(v))) { return true; }
    }
  }
  return false;
};

export class Subscription {
  #bus: LiveBus;
  #unregister: (() => void) | undefined;

  constructor(bus: LiveBus) { this.#bus = bus; }

  close(): void {
    if (this.#unregister) {
      this.#unregister();
      this.#unregister = undefined;
    }
  }

  // Block until at least one event not-visible-in-cursor matches preds.
  // Admission: throws CursorTooOldError if xmin(cursor) < bus.retentionFloor.
  async waitNext(preds: PredicateSet, cursor: Cursor): Promise<void> {
    // Admission: only enforced once the bus has initialized its floor.
    const snap = parseSnapshot(cursor);
    if (snap.xmin < this.#bus.retentionFloor) {
      throw new CursorTooOldError(cursor, this.#bus.retentionFloor);
    }

    // If a match is already in the ring, resolve immediately.
    if (this.#bus._hasMatchingEvent(preds, cursor)) { return; }

    // Otherwise wait for a wake-up and re-check.
    await new Promise<void>((resolve) => {
      const unreg = this.#bus._onNewEvents(() => {
        if (this.#bus._hasMatchingEvent(preds, cursor)) {
          unreg();
          resolve();
        }
      });
      this.#unregister = unreg;
    });
    this.#unregister = undefined;
  }
}
