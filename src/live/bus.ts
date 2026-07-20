import type { Connection } from "../database";
import { sql } from "../builder/sql";
import type { Database } from "../database";
import { type Cursor, parseSnapshot, visible } from "./snapshot";
import type { PredicateSet } from "./extractor";

// Inlined to avoid pulling in events.ts (and its `class extends Table(...)`
// dependency) from this module's import graph. Database imports Bus, and
// any chain through events.ts → table.ts hits a circular import that
// leaves Table in TDZ when events.ts evaluates. See ISSUES.md.
const EVENTS_TABLE = "_typegres_live_events";

// Each leaf records the (table, col, value) path the sub got inserted at,
// plus direct refs to every map/set on the way down. Lets unsubscribe
// remove + prune in O(predicates) without re-traversing the index.
type Leaf = {
  vIdx: Set<Subscription>;
  cIdx: Map<string, Set<Subscription>>;
  value: string;
  tIdx: Map<string, Map<string, Set<Subscription>>>;
  col: string;
  table: string;
};

// One subscription per active live query. The bus holds a reverse index of
// `(table, col, value) → Set<Subscription>` so event matching is O(columns)
// per event, not O(subs). The Subscription instance IS the identity in
// the index — JS reference equality, no separate id field.
//
// Single-shot: signaled at most once, auto-unsubscribed on signal. The
// consumer awaits `wait`; bus invokes `signal` (resolves wait, drains
// leafs). `unsubscribe()` is idempotent — safe to call from a
// consumer-break finally even after auto-unsubscribe ran.
//
// `cancel(reason)` rejects `wait` so an external caller (typically
// `bus.stop()` or a per-iter abort) can release a consumer parked on
// the await. The live generator catches AbortError in its finally and
// exits cleanly. Without this, `await currentSub.wait` is a non-yield
// point that .return() cannot interrupt — the iterator hangs forever.
export class Subscription {
  readonly leafs: Leaf[] = [];
  constructor(
    readonly cursor: Cursor,
    readonly predicateSet: PredicateSet,
    readonly wait: Promise<void>,
    readonly signal: () => void,
    readonly unsubscribe: () => void,
    readonly cancel: (reason?: unknown) => void,
  ) {}
}

// Thrown by `subscribe()` when the subscription's cursor is older than the
// bus's in-memory backfill window. The caller should catch this and
// restart their iteration with a fresh cursor.
export class CursorTooOldError extends Error {
  constructor(subXmin: bigint, floor: bigint) {
    super(
      `Subscription cursor.xmin=${subXmin} is older than the bus window's floor=${floor}. ` +
        `Restart with a fresh cursor.`,
    );
    this.name = "CursorTooOldError";
  }
}

// `xid` is a pg transaction id or a caller-stamped sqlite seq — the bus
// only ever compares it through `visible()`.
export type EventRow = {
  xid: bigint;
  table: string;
  // (col, canonical-text value) pairs from event.before ∪ event.after —
  // the shape both image sides share. Null sides contribute nothing.
  pairs: [string, string][];
};

export type BusOptions = {
  // Polling cadence in ms (pg only). Default 100.
  intervalMs?: number;
  // In-memory backfill window size. Default 10_000. The bus retains the
  // most-recent N events; subscriptions whose cursor predates the floor
  // are rejected with CursorTooOldError.
  windowSize?: number;
};

// The bus is dialect-shared; only its EVENT SOURCE differs:
//   - pg: a polling loop reads `_typegres_live_events` and dispatches
//     events newly visible since the last snapshot watermark.
//   - sqlite: no shadow table, no polling — capture pushes events into
//     `ingest()` in the mutation's own tick, with seq-counter xids and
//     seq-embedded cursors (seqCursor) so the MVCC `visible()` test
//     doubles as the seq comparison.
// Index, subscribe/backfill, and lifecycle are identical either way.
export class Bus {
  // Reverse index: table → col → value → set of subscriptions.
  #index: Map<string, Map<string, Map<string, Set<Subscription>>>> = new Map();
  #subs: Set<Subscription> = new Set();
  // Bus's processed-through cursor: every poll computes "events newly
  // visible since #watermark", then advances #watermark to the new
  // snapshot. Without it we'd re-dispatch already-handled events.
  // (pg only — sqlite events arrive exactly once via ingest.)
  #watermark: Cursor | undefined;
  // Last N events observed by the bus, oldest-first. Used for sub
  // backfill scans without a DB roundtrip.
  #buffer: EventRow[] = [];
  // Lower bound on xids we still have backfill data for. Subscriptions
  // whose cursor.xmin is below this floor can't be safely backfilled.
  #floor: bigint = 0n;
  #running = false;
  #loopPromise: Promise<void> | undefined;
  // Resolves the in-flight wait between polls; calling it kicks the loop
  // immediately. Replaced each poll cycle.
  #wakeup: (() => void) | undefined;
  // Resolvers waiting on the next completed poll. pollNow() pushes one
  // and the loop drains the whole list after each cycle, so concurrent
  // pollNow() calls all wake on the same poll.
  #oncePolled: (() => void)[] = [];
  readonly #intervalMs: number;
  readonly #windowSize: number;
  readonly #database: Database;

  constructor(
    private conn: Connection<any>,
    opts: BusOptions = {},
  ) {
    this.#intervalMs = opts.intervalMs ?? 100;
    this.#windowSize = opts.windowSize ?? 10_000;
    this.#database = conn.database;
  }

  // Lazy start, awaited by each live() call before it subscribes — pg
  // connections that never use .live() never poll. The cached promise
  // (not a boolean) is what makes concurrent callers WAIT for the
  // watermark seed: a subscriber slipping in mid-seed would pass the
  // floor check vacuously and could miss events older than the seed.
  #startPromise: Promise<void> | undefined;
  ensureStarted(): Promise<void> {
    return (this.#startPromise ??= this.#start());
  }

  // Capture the initial snapshot and start the polling loop (pg). On
  // sqlite there is nothing to seed or poll — events arrive via ingest().
  async #start(): Promise<void> {
    this.#running = true;
    if (this.#database.dialect !== "postgres") {
      return;
    }
    // Seed: bus's watermark is "now"; floor is now's xmin (nothing older
    // needs backfill — it's already visible to any cursor taken later).
    this.#watermark = await this.#readCursor();
    this.#floor = this.#watermark.xmin;
    this.#startLoop();
  }

  async stop(): Promise<void> {
    this.#running = false;
    this.#wakeup?.();
    await this.#loopPromise;
    this.#loopPromise = undefined;
    this.#watermark = undefined;
    this.#buffer = [];
    this.cancelSubscriptions();
  }

  // Cancellation generation. Bumped by cancelSubscriptions(); the live()
  // loop snapshots it per iteration and exits if it changed — that
  // covers iterators that were MID-RERUN at cancel time (not parked, so
  // no Subscription to reject) which would otherwise re-subscribe and
  // outlive the cancel.
  #epoch = 0;
  get epoch(): number {
    return this.#epoch;
  }

  // Wake every consumer parked on `await sub.wait` (cancel() rejects it;
  // the live iterator catches AbortError and exits cleanly). Used by
  // stop() and Connection.cancelLiveSubscriptions.
  cancelSubscriptions(): void {
    this.#epoch++;
    for (const sub of [...this.#subs]) {
      sub.cancel();
    }
  }

  // Push-side event source (sqlite): called synchronously right after a
  // mutation, with caller-stamped monotonic xids — the single-writer
  // replacement for the pg poll.
  ingest(events: readonly EventRow[]): void {
    if (!this.#running || events.length === 0) {
      return;
    }
    this.#dispatch([...events]);
  }

  // Returns undefined if the in-memory backfill buffer already shows a
  // mutation the cursor doesn't see — caller should rerun immediately,
  // no need to wait on anything. Otherwise returns a Subscription whose
  // `wait` resolves on the next matching event.
  subscribe(cursor: Cursor, predicateSet: PredicateSet): Subscription | undefined {
    if (!this.#running) {
      throw new Error("Bus not started — live() awaits ensureStarted() before subscribing");
    }
    if (cursor.xmin < this.#floor) {
      throw new CursorTooOldError(cursor.xmin, this.#floor);
    }
    // Backfill check first — if any buffered event the cursor doesn't
    // see matches our preds, skip indexing entirely.
    for (const event of this.#buffer) {
      if (visible(cursor, event.xid)) {
        continue;
      }
      const byCol = predicateSet.get(event.table);
      if (!byCol) {
        continue;
      }
      for (const [col, value] of event.pairs) {
        if (byCol.get(col)?.has(value)) {
          return undefined;
        }
      }
    }

    // No backfill match — index for future events.
    const { promise: wait, resolve, reject } = Promise.withResolvers<void>();
    // wait gets attached to one of resolve/reject in the call below;
    // before that, swallow unhandled-rejection if cancel fires before
    // anyone awaits.
    wait.catch(() => {});
    const sub: Subscription = new Subscription(
      cursor,
      predicateSet,
      wait,
      // signal:
      () => {
        // Single-shot: first signal resolves + unsubscribes; later calls are
        // no-ops (resolve idempotent, #subs.delete returns false).
        resolve();
        sub.unsubscribe();
      },
      // unsubscribe:
      () => {
        if (!this.#subs.delete(sub)) {
          return;
        }
        for (const L of sub.leafs) {
          L.vIdx.delete(sub);
          if (L.vIdx.size > 0) {
            continue;
          }
          L.cIdx.delete(L.value);
          if (L.cIdx.size > 0) {
            continue;
          }
          L.tIdx.delete(L.col);
          if (L.tIdx.size > 0) {
            continue;
          }
          this.#index.delete(L.table);
        }
        sub.leafs.length = 0;
      },
      // cancel: reject `wait` so a parked consumer wakes with a
      // throwable. Idempotent — calling it after signal/unsubscribe
      // is a no-op (Promise rejection is one-shot).
      (reason: unknown = new DOMException("aborted", "AbortError")) => {
        reject(reason);
        sub.unsubscribe();
      },
    );
    this.#subs.add(sub);
    for (const [table, byCol] of predicateSet) {
      let tIdx = this.#index.get(table);
      if (!tIdx) {
        tIdx = new Map();
        this.#index.set(table, tIdx);
      }
      for (const [col, values] of byCol) {
        let cIdx = tIdx.get(col);
        if (!cIdx) {
          cIdx = new Map();
          tIdx.set(col, cIdx);
        }
        for (const value of values) {
          let vIdx = cIdx.get(value);
          if (!vIdx) {
            vIdx = new Set();
            cIdx.set(value, vIdx);
          }
          vIdx.add(sub);
          sub.leafs.push({ vIdx, cIdx, value, tIdx, col, table });
        }
      }
    }
    return sub;
  }

  // Force one poll iteration — for tests so they don't race against
  // the timer. Resolves after the next poll cycle completes. On sqlite
  // dispatch is synchronous, so there is no loop to force — no-op.
  async pollNow(): Promise<void> {
    if (!this.#running) {
      throw new Error("Bus not started");
    }
    if (!this.#loopPromise) {
      return;
    }
    const done = new Promise<void>((resolve) => {
      this.#oncePolled.push(resolve);
    });
    this.#wakeup?.();
    await done;
  }

  #startLoop(): void {
    this.#loopPromise = (async () => {
      while (this.#running) {
        await this.#poll();
        const waiters = this.#oncePolled.splice(0);
        for (const w of waiters) {
          w();
        }
        if (!this.#running) {
          break;
        }
        await new Promise<void>((resolve) => {
          this.#wakeup = resolve;
          // Node's Timeout has .unref() so an idle bus doesn't keep
          // the process alive; browser setTimeout returns a number
          // and has no such method.
          const t = setTimeout(resolve, this.#intervalMs) as unknown as { unref?: () => void };
          t.unref?.();
        });
        this.#wakeup = undefined;
      }
    })();
  }

  async #readCursor(): Promise<Cursor> {
    const r = await this.conn.execute(sql`SELECT pg_current_snapshot()::text AS s`);
    return parseSnapshot((r.rows as { s: string }[])[0]!.s);
  }

  async #poll(): Promise<void> {
    const cur = await this.#readCursor();
    const prev = this.#watermark;
    this.#watermark = cur;
    if (!prev) {
      return;
    }
    // Events newly visible since `prev`: index range scan from prev.xmin,
    // refined by per-row visibility against both cursors. pg_snapshot
    // can't bind as a typed param so cursor text round-trips through
    // `::pg_snapshot`.
    const r = await this.conn.execute(sql`
      SELECT xid::text AS xid, "table", before::text AS before, after::text AS after
      FROM ${this.#database.scopedIdent(EVENTS_TABLE)}
      WHERE xid >= pg_snapshot_xmin(${sql.param(cursorToText(prev))}::pg_snapshot)
        AND pg_visible_in_snapshot(xid, ${sql.param(cursorToText(cur))}::pg_snapshot)
        AND NOT pg_visible_in_snapshot(xid, ${sql.param(cursorToText(prev))}::pg_snapshot)
      ORDER BY id
    `);
    const raw = r.rows as unknown as {
      xid: string;
      table: string;
      before: string | null;
      after: string | null;
    }[];
    this.#dispatch(
      raw.map((row) => ({
        xid: BigInt(row.xid),
        table: row.table,
        pairs: parseEventPairs(row.before, row.after),
      })),
    );
  }

  // Shared tail of both event sources (pg #poll, sqlite ingest): signal
  // matching subs whose cursor doesn't already see the event, then append
  // to the in-memory window and trim.
  #dispatch(newEvents: EventRow[]): void {
    for (const event of newEvents) {
      for (const sub of this.#subsMatching(event)) {
        if (!visible(sub.cursor, event.xid)) {
          sub.signal();
        }
      }
    }
    // Append to the in-memory window, then trim. Each evicted event
    // raises the floor — no future sub can backfill across that gap.
    this.#buffer.push(...newEvents);
    if (this.#buffer.length > this.#windowSize) {
      const dropped = this.#buffer.splice(0, this.#buffer.length - this.#windowSize);
      const candidate = dropped[dropped.length - 1]!.xid + 1n;
      if (candidate > this.#floor) {
        this.#floor = candidate;
      }
    }
  }

  // Look up subs whose reverse-index has any (col, value) pair that matches
  // anything in event.before or event.after.
  #subsMatching(event: EventRow): Set<Subscription> {
    const out = new Set<Subscription>();
    const tIdx = this.#index.get(event.table);
    if (!tIdx) {
      return out;
    }
    for (const [col, value] of event.pairs) {
      const vIdx = tIdx.get(col)?.get(value);
      if (!vIdx) {
        continue;
      }
      for (const sub of vIdx) {
        out.add(sub);
      }
    }
    return out;
  }
}

// Flatten event.before/after (each `{col: "stringified value", ...}` —
// same canonicalization as the extractor's text-cast values) into a
// single array of (col, value) pairs. Run once per event at ingest so
// per-sub matching never re-parses JSON.
export const parseEventPairs = (before: string | null, after: string | null): [string, string][] => {
  const out: [string, string][] = [];
  for (const raw of [before, after]) {
    if (!raw) {
      continue;
    }
    const obj = JSON.parse(raw) as { [k: string]: unknown };
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string") {
        out.push([k, v]);
      }
    }
  }
  return out;
};

const cursorToText = (c: Cursor): string => `${c.xmin}:${c.xmax}:${[...c.xip].join(",")}`;
