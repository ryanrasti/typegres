# ops-demo: agent notes

Things that were unclear / had to be looked up while building this demo.

## Open

1. **`@tool()` on relation methods — needed?** `src/rpc.test.ts` only decorates columns. Codegen now decorates relation methods too (defensive). Verify with an end-to-end RPC test that exercises a relation traversal client-side.

2. **Live-over-RPC protocol shape (TBD).** `db.live()` is in-process only. Plan: client expression returns a `QueryBuilder` (not `.execute()`); server `await exoEval(code, {api})` → `QueryBuilder`; iterate `for await … of db.live(qb)` and write each yield via Hono `streamSSE`. Disconnect → iterator throws → `db.live()`'s `finally` unsubscribes. Open: client-side ergonomics — needs a typed helper so callers don't have to remember "this expression must return a QueryBuilder."

3. **Top-level `await typegres({...})` in `db.ts`.** Importing any schema file eagerly opens a connection. Footgun for type-only imports / tests.

## Closed

1. **exoeval wasn't a public export.** `@tool`, `RpcClient`, `inMemoryChannel`, `safeStringify` lived in `src/exoeval/` but weren't in `package.json#exports`. **Fixed:** added a `./exoeval` subpath + tsdown entry; made `safeStringify` public.

2. **`tg generate` stripped `@tool()` decorators on regenerate.** **Fixed:** generator now emits `@tool()` by default on new files (with `tool` import). Update path parses the existing block and preserves per-entry decoration state — entries the user stripped stay stripped, new entries from migrations default to decorated. Update path doesn't touch imports — if a regen adds `@tool()` to a previously-undecorated file, add the import or strip the decorator. Pure `generateTable(...)` extracted, covered by `src/tables/generate.test.ts`.

3. **`db.Table === Table`.** Same function (database.ts:206). Either spelling works.

4. **Circular imports between schema files.** Refs to other tables go *inside method bodies only* (basic example pattern; codegen emits this shape). Field initializers must not reference other table classes — TDZ.
