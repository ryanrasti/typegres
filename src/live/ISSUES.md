# Live Queries — open issues

## v1 scope (what we support)

A query is live-able iff **every table reference has at least one top-level
`AND`-conjuncted equality predicate** of one of these forms:

- `col = <literal>` — a literal anchor (param/CAST/etc.)
- `col = other_table.col` — a column-equality edge to another reference

Otherwise arbitrary: `JOIN`, `LEFT JOIN`, `GROUP BY`, `HAVING`,
subqueries — fine. The extractor only inspects top-level `WHERE`/`ON`.

## Open

1. **Public API gap: live mode isn't actually consumable from the package yet.**
   The npm entrypoint exports `Database`, `db.startLive()`, and `db.live()`,
   but not the setup pieces users need to make live mode work:
   - `TypegresLiveEvents.makeTransformer()` to opt tables into event capture
   - `TypegresLiveEvents.createTableSql()` to create `_typegres_live_events`

   `package.json` also uses explicit export maps, so consumers can't rely on
   a deep import escape hatch. Result: the live subsystem exists, but from a
   package user's perspective it's effectively private / unusable.

   Fix options: export `TypegresLiveEvents`; expose a higher-level
   `enableLive()` helper; or intentionally keep the whole feature internal
   until the setup surface is ready.

2. **`stopLive()` leaves active subscriptions wedged.**
   Shutting down the bus stops polling, but today it does not drain existing
   subscriptions or settle their `wait` promises. Any async iterator parked in
   `await currentSub.wait` can hang forever if `db.stopLive()` is called while
   it's waiting. The old Bus instance also keeps stale subscription/index state
   alive until GC.

   `Bus.stop()` should explicitly resolve/reject/unsubscribe outstanding subs,
   and live iterators should observe shutdown as completion or error rather
   than hanging.

3. **More `.live()` tests.** Five today (insert/update/delete/join/not-started).
   Missing: backfill-from-buffer (subscribe returns `undefined`, caller
   reruns immediately without waiting on a poll), `CursorTooOldError`
   recovery through the async iterator (hard to trigger deterministically —
   each iteration captures a fresh cursor), multiple concurrent subs on
   the same Database, tx-bound `Database.live()` rejection, and shutdown
   while an iterator is waiting.

4. **Circular-import workarounds.**
   - `bus.ts` inlines `const EVENTS_TABLE = "_typegres_live_events"`
     because importing `TypegresLiveEvents` would cycle through
     `events.ts → table.ts → insert.ts → database.ts → bus.ts`, and
     `events.ts`'s `class extends Table(...)` evaluates `Table` at
     module-load (TDZ).

   Fix options: hoist the constant to a Table-free module; lazy class
   factory; restructure deps so the live modules don't pull `database.ts`.

5. **No `pg_notify` / `LISTEN`** — rerun latency floor is the poll
   interval (default 100ms). Adding `pg_notify('typegres_live_events', '')`
   in the events CTE plus a dedicated LISTEN connection drops latency to
   ms. Needs a driver tweak so the bus can hold a long-lived connection
   exposing `notification` events. Polling stays as the source of truth;
   NOTIFY is just a kick.

6. **No retention / pruning of `_typegres_live_events`** — bus's in-memory
   ring (`windowSize`, default 10k) bounds *its* working set, but the table
   grows forever. v2: periodic `DELETE WHERE xid < ?` driven by bus's
   `floor` (or a min over all subs). The xid btree index makes the delete
   cheap; policy choice is open (time / count / watermark).

7. **Long-running subscription stability** — untested under stress.
   Connection drops mid-poll, skewed clocks across writers vs. pollers,
   xid8 wraparound (theoretical, ~600 years at 1Mtx/s), bus connection
   lost while subs are waiting (today they wedge — should signal an error),
   and stop/start lifecycle semantics around active subscribers need hardening.

8. **`resubscribe(old, new)` to avoid index churn** — every iteration today
   does `unsubscribe(old); subscribe(new);`, fully tearing down and
   rebuilding the reverse-index leaves even when the predicate set mostly
   overlaps. Not a correctness issue (backfill closes the gap), but a
   perf footnote: an atomic-swap that diffs old vs. new and only mutates
   leaves that changed would be cheaper for stable predicate sets.

9. **Text canonicalization landmines** — both extractor and events
   transformer canonicalize values via `col::text`; bus matches by string
   equality. Symmetric *as long as both sides agree on text form*. Three
   pg types drift:
   - **`timestamptz`** — `::text` honors session `TimeZone`; same instant,
     different text in different sessions.
   - **`citext`** — case-insensitive at compare time but `::text` preserves
     case; equal values can produce non-equal text.
   - **`numeric`** — trailing zeros / scale survive `::text`;
     `1.0::numeric` and `1::numeric` compare equal but differ as text.

   No live test exercises any of these today; a user query against one of
   these column types may silently miss matches. Fix range: canonicalizing
   casts (`lower()` / `extract(epoch from …)`) up to a binary comparator
   in the bus.

10. **Unsupported predicate forms produce a generic "unrooted" error**
   instead of a clear "this predicate form isn't supported" message —
   `OR`, `NOT`, non-equality predicates at the top level just don't get
   seen by the extractor. Workable but unhelpful to diagnose.

11. **WAL / logical-replication ingestion as an alternative to the shadow
   table** — today every mutation gains a `_typegres_live_events` insert
   in the same statement. That captures only writes that go through
   typegres builders, costs an extra row per mutation, and grows a table
   the user has to manage. A WAL-backed mode (logical decoding via a
   replication slot, plugin like `pgoutput` or `wal2json`) would catch
   *all* writes regardless of source and add no per-write overhead. Cost:
   replication permissions, per-table `REPLICA IDENTITY` config, slot
   monitoring (a stalled consumer holds WAL forever). Worth offering as
   a swappable backend for clients who prefer it.
