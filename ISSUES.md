# Issues

> **TODO:** move these into GitHub Issues and delete this file.

## Critical

1. **`TsTypeOf` doesn't recursively unwrap `Record`** — nested relations via
   `scalar()` surface `{name: Text<1>}` in TS rather than `{name: string}`.
   Runtime deserialization is correct.

2. **`Record` override DTS mismatch** — a `@ts-expect-error` is stripped by
   DTS generation. The emitted `.d.ts` has a conflicting `deserialize`
   return type.

3. **`RowTypeToTsType` includes class methods** — `db.execute(Todo.from())`
   returns `RowTypeToTsType<Todo>[]`, which maps every key on the row class.
   For column fields (`Any` instances) that's `TsTypeOf<col> = string | bigint | …`,
   but for class methods (e.g. `Todo.update`) the conditional falls through
   to `T`, threading the *method type* into the row type. Runtime returns
   plain deserialized objects with no methods — so the type claims `.update`
   exists but the runtime value is `undefined`. Fix: filter `RowTypeToTsType`
   to keys whose values extend `Any`. Mirrors issue #1 in shape (both are
   `TsTypeOf` mapping holes).

## Non-critical

5. **Operators always parenthesize** — tighter output possible via operator
   precedence on an `Op` node.

6. **`scalar()` builds SQL via raw strings** — `ROW()` / `array_agg` /
   `COALESCE` should go through `Func` / `Op` nodes once those exist.

7. **Relation naming doesn't singularize** — self-referential FKs get
   awkward method names.

8. **`groupBy` non-aggregated-column enforcement is runtime-only** — pg
   catches it; types don't.

## Missing features

9. **Subselects / correlated subqueries in `.select(...)`** — requires
   subquery-as-`Fromable`.

10. **CTE (`with`)** — next up.

13. **RPC layer + DoS protection** — planned to use `exoeval` (minimal JS
    subset for capability-based untrusted execution), with gas/memory
    limits on the evaluator and query-cost analysis before sending to pg.

15. **Site: upgrade Next.js 14 → 16.** `npm audit` reports 4 high-severity
    Next.js CVEs, all fix-gated on the 16.x major. They're server-side
    vulnerabilities (image optimizer, RSC, rewrites, Server Components DoS)
    that don't affect our static-export deployment to GitHub Pages — no Next
    server runs in production. Migration is real work: Turbopack by default,
    static-export opt-in changes, React 19 if we go that far, tailwind 4 if
    we bundle it. Track separately.

14. **`.live()` subscriptions** — previous implementation lived under
    `src/live/` and was removed as unreviewed. Design: tables+predicates
    extracted from each live query, WAL-driven (or synthetic event table)
    change matching, re-run query on match. Needs real design review
    before reimplementing.
