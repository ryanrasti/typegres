# Live Queries — open issues

## v1 scope (what we support)

A query is live-able iff **every table reference has at least one top-level
`AND`-conjuncted equality predicate** of one of these forms:

- `col = <literal>` — a literal anchor (param/CAST/etc.)
- `col = other_table.col` — a column-equality edge to another reference

Otherwise arbitrary: `JOIN`, `LEFT JOIN`, `GROUP BY`, `HAVING`,
subqueries — fine. The extractor only inspects top-level `WHERE`/`ON`.

The Bus (index, subscribe/backfill, lifecycle) is dialect-shared; only
the **event source** differs. pg (`pg/`): shadow events table + polling +
MVCC snapshot cursors. sqlite (`sqlite/`): no shadow table and no polling
— the runtime is a synchronous single writer (better-sqlite3, a Durable
Object's SqlStorage), so RETURNING-image capture pushes events into
`Bus.ingest()` in the same tick as the mutation (buffered until COMMIT
inside transactions — see SqliteLiveExecutor), entirely in memory;
cursors are integer seqs embedded in the snapshot `Cursor` shape so the
MVCC `visible()` test doubles as the seq comparison. The scope rule above
applies to both dialects.

## Open

1. **Public API gap, closed.** Opt-in is uniformly
   `db.Table("notes", { live: true })`; the live engine is wired at
   `db.attach(driver, busOpts?)` with no start/stop lifecycle — sqlite
   capture is active from attach, the pg poller starts lazily on first
   `.live()` use, and `close()` tears the engine down. The only pg
   ceremony left is `ensurePgLiveEventsTable(conn)` for the events-table
   DDL (a migration concern, deliberately explicit).

2. ~~**`stopLive()` leaves active subscriptions wedged.**~~ Resolved:
   `Bus.stop()` cancels outstanding subscriptions (rejects parked `wait`s
   with AbortError; the live generator observes shutdown as clean
   completion). Covered by the sqlite
   cancelLiveSubscriptions / close() teardown tests.

3. **More `.live()` tests.** Five today (insert/update/delete/join/not-started).
   Missing: backfill-from-buffer (subscribe returns `undefined`, caller
   reruns immediately without waiting on a poll), `CursorTooOldError`
   recovery through the async iterator (hard to trigger deterministically —
   each iteration captures a fresh cursor), multiple concurrent subs on
   the same Database, tx-bound `Database.live()` rejection, and shutdown
   while an iterator is waiting.

4. **Circular-import workarounds.**
   - `bus.ts` inlines `const EVENTS_TABLE = "_typegres_live_events"` to
     keep events.ts out of its import chain. Historical note: the
     original TDZ crash came from an events.ts that did `class extends
     Table(...)` at module load; the current events.ts is class-free re
     Table, and it now sits in database's load graph via executor.ts →
     live/pg/events.ts with no incident (verified against the site vite
     build, the original crash site). The bus's inlined constant is
     belt-and-suspenders at this point.

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

9. **Text canonicalization landmines** — the matcher replays SQL `=`
   *outside* SQL: it lifts predicate values out of the query and compares
   canonical text in JS. That loses every normalization `=` would have
   applied (operator resolution, pg implicit casts, sqlite affinity /
   numeric cross-class comparison), so the invariant the whole scheme
   rests on is: **the canonical rendering must be constant on each SQL
   equality class** — two `=`-equal values that render differently are a
   silently *missed wakeup* (always a false negative; conflating unequal
   values merely causes a harmless spurious rerun).

   `::text` / `CAST(x AS text)` satisfies this for the common types
   (int, text, uuid, bool, float8) when both sides render through the
   same type's output function. Known drift:

   **pg** (pre-existing, unfixed):
   - **`numeric`** — scale survives `::text`: `1 = 1.0 = 1.00` but
     `'1'` / `'1.0'` / `'1.00'` (verified). `trim_scale()` (pg13+)
     normalizes. This is the most likely real-world miss.
   - **`timestamptz`** — `::text` honors session `TimeZone`/`DateStyle`;
     event images render in the *writer's* session, extractor values in
     the live connection's session — differing GUCs break matching.
     Same-pool same-settings holds in practice but is undocumented.
   - **`citext`** / non-binary collations — equal at compare time,
     case-preserving as text.

   **sqlite** (as of the sqlite backend):
   - **Fixed**: drivers bind every JS number as REAL while
     integer-affinity columns store INTEGER (`'1.0'` vs `'1'`);
     `canonical.ts` collapses integral REALs before the text cast.
     Root cause: sqlite operators live on root `Any`, which binds bare
     `?` params (`sql-value.ts` — `CAST(? AS any)` would be wrong), so
     unlike pg's `TypedParam` nothing re-normalizes the binding class.
     A parity test hangs-on-timeout if the render sites ever diverge.
   - **Open (contrived)**: TEXT-affinity column vs number param —
     SQL applies TEXT affinity to REAL `1.0` → matches stored `'1.0'`,
     but the collapsed anchor renders `'1'` → miss. Reachable because
     root-`Any.eq` accepts any primitive.
   - **Harmless**: no-affinity columns distinguish integer `1` from
     text `'1'`; canonical text conflates them → spurious rerun only.

   Fix directions (complementary, roughly in order of leverage):
   1. **Typed casts in the sqlite operator codegen** — per-type arg slots
      so `eq` emits `CAST(? AS INTEGER)` etc., mimicking compare-time
      affinity at the binding layer. Fixes the anchor at the source
      (including the TEXT-affinity edge) and would let `canonical.ts`'s
      CASE collapse be deleted. Correct independent of live.
   2. **Per-type canonical-render hook** on the type classes (all three
      render sites hold typed values): `Numeric → trim_scale(x)::text`,
      `timestamptz → UTC-normalized`, sqlite classes → their affinity
      semantics (or JS-side `String()` canonicalization, which collapses
      `1.0`/`1` for free). Subsumes `canonical.ts` and fixes pg numeric.
   3. Status quo: `canonical.ts`'s dialect-level rendering — works for
      the common types, locked by tests, ad-hoc.

10. **Unsupported predicate forms produce a generic "unrooted" error**
   instead of a clear "this predicate form isn't supported" message —
   `OR`, `NOT`, non-equality predicates at the top level just don't get
   seen by the extractor. Workable but unhelpful to diagnose.

11. **`wrapUpdate` shadows the user's column references with `__typegres_before`.**
   The live transformer rewrites a plain UPDATE into a CTE chain that
   joins `__typegres_before` (a `SELECT *, ctid FROM <foos> ... FOR UPDATE`).
   Both `<foos>` and `__typegres_before` are then in scope of the SET / RETURNING
   clauses, so any user-written raw-SQL fragment that references columns
   *unqualified* hits "column reference X is ambiguous" once live is enabled.

   Reproducer (the demo's `Orders.advance` originally tripped this):
   ```ts
   .set(() => ({ status: Text.from(sql`CASE status WHEN 'draft' THEN 'confirmed' ... END`) }))
   ```
   Workaround: write `CASE orders.status WHEN ...` (qualify with the table alias).

   Fix range: rename the CTE columns out of the user's namespace
   (`SELECT col AS __tg_before_col, ctid` etc.), or expose a
   first-class `.case()` builder on `Any` so users don't author raw
   SQL for what should be typed expressions:

   ```ts
   orders.status.case({
     "draft":     "confirmed",
     "confirmed": "picking",
     ...
   } /* , else?: ... */)  // → Text<...>
   ```

   That removes the need for the user to think about qualification
   *and* gives them type-checked branch values; the builder emits
   `CASE <this.toSql()> WHEN ... END` so the receiver is always
   correctly qualified.

12. **WAL / logical-replication ingestion as an alternative to the shadow
   table** (pg; the sqlite backend already has no shadow table — its
   analog of this gap is that RETURNING-image capture also only sees
   builder-routed writes, where per-table triggers would catch raw SQL
   too) — today every pg mutation gains a `_typegres_live_events` insert
   in the same statement. That captures only writes that go through
   typegres builders, costs an extra row per mutation, and grows a table
   the user has to manage. A WAL-backed mode (logical decoding via a
   replication slot, plugin like `pgoutput` or `wal2json`) would catch
   *all* writes regardless of source and add no per-write overhead. Cost:
   replication permissions, per-table `REPLICA IDENTITY` config, slot
   monitoring (a stalled consumer holds WAL forever). Worth offering as
   a swappable backend for clients who prefer it.

13. **Cap'n Web streaming surface (deferred; learnings recorded).**
   `.live()` is a local AsyncIterable on both dialects (already
   wire-consumable via exoeval's streaming); a capnweb push surface —
   `subscribe(conn, cb)` driving the generator with `await cb(rows)`
   backpressure — was prototyped and works, deferred to keep the live
   core minimal. What the prototype established, so the next attempt
   starts from knowledge:
   - capnweb's `map` recorder serializes any captured plain function as a
     nested record-replay closure (async ones are rejected outright:
     "RPC closures cannot be async functions"). Passing a callback **by
     reference** requires a plain RPC call — build the refined query
     capability via `doRpc`, then call `subscribe` directly on the stub.
   - An argument stub is auto-released when the call frame returns
     ("RpcImportHook was already disposed" on the first push). The callee
     must `dup()` the callback on entry and dispose the retained handle
     on unsubscribe — which is exactly the pin/unpin-a-Durable-Object
     lifecycle, and what the harness leak guard verifies.
   - A driver loop that always has a `next()` in flight parks the live
     generator at `await sub.wait` — a non-yield suspension `.return()`
     cannot interrupt. `Connection.live()` needs an AbortSignal (or
     equivalent) that `cancel()`s the in-flight Subscription so
     unsubscribe can wake a parked consumer.
   - Client-side, capnweb invokes an exported callback with args as
     RpcPromises — the client cb must resolve them.

14. **Multi-connection sqlite live / `LiveDriver` (parked).** Two
   Connections attached to one sqlite driver share the statement clock
   (`SyncDriver.liveSeq`) but NOT a bus — each attach() makes its
   own, and events captured through one Connection never reach the
   other's subscribers. Unexercised today (a DO is one driver, one
   Connection). The named future shape: a user-constructed `LiveDriver`
   wrapper (`db.attach(new LiveDriver(new SqliteDriver(...)))`) owning
   the clock AND a per-driver bus, reverting the base drivers to dumb
   pipes. Notes from the design discussion: a per-statement driver
   callback cannot absorb capture (CompiledSql has no table/column/
   builder context — interception must stay at the Connection layer),
   and per-statement clock ticking is not load-bearing (only capture-
   time advancement matters for cursor correctness).

15. **sqlite shared-handle interleaving (both drivers; rare; fix deferred).**
   Sqlite has ONE handle/session, so a task that runs concurrently with an
   open transaction's await gaps executes its SQL INSIDE that transaction:
   a live rerun's SELECTs see uncommitted (possibly later-rolled-back)
   rows, and a pooled-connection mutation is silently absorbed into the
   transaction while its event was already ingested — a phantom event if
   the transaction rolls back. Narrow in practice: commit-deferred flush
   means live signals never originate mid-transaction, so hitting it
   requires app code running its own concurrency (Promise.all etc.)
   against an open transaction.

   **Durable Objects ARE affected too** — empirically verified in workerd
   (probe since deleted): the input gate only blocks OTHER EVENTS (new
   requests, alarms, timers) while `storage.transaction()` is open;
   same-invocation microtask siblings interleave freely at the callback's
   await points, read uncommitted state, and their writes join/roll back
   with the transaction. Two corollaries: (a) a DO tx callback must only
   await storage ops — awaiting anything resolved by sibling code
   deadlocks (the gated sibling never runs... unless it's microtask-only,
   in which case it interleaves instead); (b) on the DO driver a
   mid-transaction cursor also never self-heals, because the native
   commit path runs no driver statement — `liveSeq` isn't bumped at
   COMMIT, so the transaction's events stamp with the last in-txn
   statement's seq, which such a cursor already considers seen.

   Deferred fix (sketch): make the sqlite live iteration a synchronous
   frame (compile + executeSync + deserializeRows — kills the
   extractor/user-query straddle), park iterations on a Connection-held
   open-transaction promise before entering the frame, and bump (or
   stamp past) the statement clock at commit on the native-transaction
   path.

16. **Mutation builders embedded in raw sql templates bypass capture.**
   Capture fires only when the builder is the top-level argument to
   execute/hydrate (Executor.run's instanceof dispatch). A live-table
   mutation interpolated into a sql`` template compiles as a plain
   statement — no events, silently stale subscribers. (On main, pg's
   bind-time transformer covered simple template embedding; the
   CTE-embedded form was invalid there too.) No in-repo code uses the
   pattern; fix would be detection at compile/bind time or documenting
   the boundary alongside the raw-SQL one in item 12.
