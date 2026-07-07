# Issues

> **TODO:** move these into GitHub Issues and delete this file.

## Critical

1. ~~**`TsTypeOf` doesn't recursively unwrap `Record`**~~ — fixed by the
   #3 fix below; `Record<T>.deserialize`'s return type is
   `RowTypeToTsType<T>` which now resolves correctly. Verified by the
   active assertion in `src/builder/query.test.ts > scalar with cardinality
   'one'` (was a TODO comment, now `expectTypeOf<{name: string}>()`).

2. ~~**`Record` override DTS mismatch**~~ — stale; verified via standalone
   `tsc --noEmit` consumer test (with and without `skipLibCheck`). Source
   no longer has `@ts-expect-error`; emitted `.d.ts` cleanly types the
   override as `(raw: string) => T extends object ? RowTypeToTsType<T> :
   unknown`, which is a valid narrower-return override of the inherited
   `Any.deserialize: (raw: string) => unknown`.

3. ~~**`RowTypeToTsType` includes class methods**~~ — fixed in
   `src/types/runtime.ts`: `TsTypeOf<T>` collapses non-Any inputs to
   `never` (was: fell through to `T`, leaking method types into row
   results). Method-typed fields on rows now resolve to `never`, so
   `row.someMethod()` is "never is not callable" at the type level.
   Type test in `src/builder/query.test.ts` pins down both branches.
   Note: keys still appear in the row type with `never` values
   (couldn't switch to `as`-remap without breaking variance across
   `RowTypeToTsType<R & R2>` used by InsertBuilder.returningMerge).

## Non-critical

5. **Operators always parenthesize** — tighter output possible via operator
   precedence on an `Op` node.

6. **`scalar()` builds SQL via raw strings** — `ROW()` / `array_agg` /
   `COALESCE` should go through `Func` / `Op` nodes once those exist.

7. **Relation naming doesn't singularize** — self-referential FKs get
   awkward method names.

8. **`groupBy` non-aggregated-column enforcement is runtime-only** — pg
   catches it; types don't.

9. **JSON wire format loses precision for some types.** RPC sends queries +
   results as JSON. `int8` and `bytea` are deserialized as strings (not bigint /
   Uint8Array) so they round-trip through JSON cleanly. Float NaN / Infinity
   serialize as null through `JSON.stringify` and don't survive the wire.
   `undefined` collapses to `null` too — `safeStringify` maps top-level
   `undefined` to `"null"` so void-returning closures round-trip, but the
   distinction `undefined` vs `null` is lost. A richer "tagged JSON" wire codec
   — bigint, bytes, dates, ±Infinity, NaN, undefined as tagged sentinels (e.g.
   `["bigint","42"]`) — is the v0.2 fix; see Endo's `pass-style` for prior art.

10. ~~**Rename `@tool` → `@expose`.**~~ Done at launch prep. The exported
    decorator and namespace are `expose` / `expose.unchecked`; the
    `tool.ts` file kept its name internally. ESLint rule, codegen
    template, generated/ outputs, schema files, demo, README, and site
    copy all updated.

11. **Shared `Bool<N>` interface is a nominal-only marker.** Defined
    as `export interface Bool<N extends number> extends SqlValue<N> {}`
    in `src/types/bool.ts` — no declared method surface. The file
    comment explains why: concrete Bool classes (PG's and SQLite's)
    each ship `and`/`or`/`not` methods whose arg is their own concrete
    Bool, so requiring those methods on the shared interface creates a
    TS variance mismatch when a concrete class is assigned to
    `Bool<N>`. Fallout: any `SqlValue` satisfies `Bool<N>` at the
    type level, so misuse only surfaces as a `zBool` runtime error at
    the RPC boundary. Fix would need TS to gain a way to say
    "structurally-compatible up to the dialect's own concrete class"
    — or a redesign that gives up shared-Bool chaining.

12. **`stripMatchedOuterParens` shouldn't be necessary.** SQLite refuses
    to prepare a top-level parenthesized statement (`(SELECT …)`), but
    `FinalizedQuery.bind()` wraps its output in `(...)` unconditionally
    so the same shape can be spliced as a subquery inside a larger
    template. The `SqliteDriver.execute` path strips a matched outer
    pair as a driver-side affordance
    (`src/driver.ts:stripMatchedOuterParens`), which is a hack. The
    right fix is to distinguish "top-level compile" from "spliced as a
    subquery" at the bind level: only the subquery form emits the
    outer parens, and `SqliteDriver` stops rewriting SQL text.

## Missing features

9. **Subselects / correlated subqueries in `.select(...)`** — requires
   subquery-as-`Fromable`.

10. **CTE (`with`)** — next up.

13. **exoeval DoS / resource exhaustion** — exoeval lets untrusted clients
    compose queries arbitrarily. Nothing currently bounds the DB resources a
    single RPC call can consume (unbounded joins, huge cardinality scans,
    repeated expensive aggregations). Two solution paths:

    **A. Gas accounting (runtime metering):** instrument the evaluator and
    the DB layer with cost counters — AST node budget, max joins per query,
    `EXPLAIN`-based cardinality estimates or row-count caps, wall-clock
    timeout. Provides fine-grained control but adds latency (especially if
    running EXPLAIN before execution) and complexity.

    **B. Pre-compiled query whitelists:** clients can only invoke
    server-registered query templates (similar to persisted queries in
    GraphQL). The server pre-analyzes and approves each template; runtime
    only fills in parameters. Eliminates arbitrary composition entirely —
    simpler to reason about, but sacrifices the "ship any query from the
    client" flexibility that makes exoeval interesting.

    Likely answer is both: pre-compiled for production traffic, gas-metered
    for dev/admin/exploratory use.

15. ~~**Site: upgrade Next.js 14 → 16.**~~ `npm audit` reports 4 high-severity
    Next.js CVEs, all fix-gated on the 16.x major. They're server-side
    vulnerabilities (image optimizer, RSC, rewrites, Server Components DoS)
    that don't affect our static-export deployment to GitHub Pages — no Next
    server runs in production. Migration is real work: Turbopack by default,
    static-export opt-in changes, React 19 if we go that far, tailwind 4 if
    we bundle it. Track separately.

14. ~~**`.live()` subscriptions**~~ — done (PR #72). Predicate extraction,
    reverse-index bus, MVCC-snapshot-aware re-iteration.
