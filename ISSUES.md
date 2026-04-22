# Issues

> **TODO:** move these into GitHub Issues and delete this file.

## Critical

1. **`TsTypeOf` doesn't recursively unwrap `Record`** — nested relations via
   `scalar()` surface `{name: Text<1>}` in TS rather than `{name: string}`.
   Runtime deserialization is correct.

2. **`Record` override DTS mismatch** — a `@ts-expect-error` is stripped by
   DTS generation. The emitted `.d.ts` has a conflicting `deserialize`
   return type.

3. **Stock TypeScript stack-overflows on our hierarchy** — the recursive
   class hierarchy trips stock `tsc`. Requires `tsgo`.

4. **`column()` returns a descriptor, not an instance** — a plain object
   `{ __column, __class, ...opts }` leaks through the builders instead of
   being a real `Any` with an unbound sentinel.

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

11. **Aggregates** — `count`, `sum`, `avg`, etc. need `prokind='a'` in
    codegen.

12. **Aggregate namespace transform after `groupBy`** — the namespace
    should become aggregate-typed.

13. **RPC layer + DoS protection** — planned to use `exoeval` (minimal JS
    subset for capability-based untrusted execution), with gas/memory
    limits on the evaluator and query-cost analysis before sending to pg.

14. **`.live()` subscriptions** — previous implementation lived under
    `src/live/` and was removed as unreviewed. Design: tables+predicates
    extracted from each live query, WAL-driven (or synthetic event table)
    change matching, re-run query on match. Needs real design review
    before reimplementing.
