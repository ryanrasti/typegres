# ops-demo: agent notes

Things that were unclear / had to be looked up while building this demo.

## Open

1. **Live not wired in the demo.** Server boots with `db.startLive()` commented out. Two missing pieces: (a) `_typegres_live_events` table — has to be CREATEd against the DB (`TypegresLiveEvents.createTableSql()`), so it belongs in our migrations; (b) per-table emission — codegen-generated tables use `db.Table("name")` with no transformer, but live needs `db.Table("name", { transformer: TypegresLiveEvents.makeTransformer() })`. Codegen has no opt-in flag for this yet.

2. **Live-over-RPC protocol shape (TBD).** Even after (1), the wire shape needs design. Plan: client expression returns a `QueryBuilder` (not `.execute()`); server `await exoEval(code, {api})` → `QueryBuilder`; iterate `for await … of db.live(qb)` and write each yield via Hono `streamSSE`. Disconnect → iterator throws → `db.live()`'s `finally` unsubscribes. Open: client-side ergonomics — needs a typed helper so callers don't have to remember "this expression must return a QueryBuilder."

3. **Top-level `await typegres({...})` in `db.ts`.** Importing any schema file eagerly opens a connection. Footgun for type-only imports / tests.

4. **Codegen has no support for pg enums.** `CREATE TYPE x AS ENUM (...)` columns currently fall through introspection as unknown. Demo sidesteps by using `text NOT NULL DEFAULT '...'` for `orders.status` etc. — which is also the prevailing pattern in TS-backed PG apps (looser type system, but enum migrations in pg are painful: `ALTER TYPE ... ADD VALUE` works with caveats, removing/renaming values requires full type recreation; most TS shops prefer string-literal unions + CHECK constraints). Worth adding eventually — when a project *does* use pg enums, silent miscodegen is a footgun. Sketch: introspect `pg_type.typtype = 'e'`, emit a TS string-literal union + a Text-shaped column class branded with the enum name.

5. **`skipLibCheck: true` required in tsconfig.** `unplugin-swc` (needed for the decorator workaround) transitively types `@farmfe/core`, `@rspack/core`, `rollup`, `unloader`, `webpack` — none installed → `tsgo --noEmit` errors out unless you skip lib check. Same root cause as #6: would disappear if decorators went away.

6. **`tsx` required to run scripts (not raw `node --experimental-strip-types`).** Node ESM resolver doesn't auto-search `.ts` extensions; strip-types only rewrites bodies, not imports. Either every relative import gets a literal `.ts` suffix (ugly, also a tsx-style choice) or use `tsx`. Demo went with `tsx`. `examples/basic` works under raw node only because `migrate.ts` has no relative imports — first script with internal imports hits this.

7. **`@tool()` vs `@tool.unchecked()` is undocumented.** `@tool()` requires a zod schema per parameter; calling `@tool()` on a method that takes unvalidated input (e.g. `insertOrder({...row})`, `advanceOrder(id: string)`) throws at decoration time. `@tool.unchecked()` skips validation and accepts anything. Picked the right one by reading `src/exoeval/tool.ts` and `rpc.test.ts`. Worth either documenting the contract or making `@tool()` infer "no schemas → unchecked" (which is what most users would expect).

8. **Multi-table seed inserts have no clean ID-handoff pattern.** Each `Table.insert(...).execute(db)` returns rows but you have to chain `.returning()` to get IDs, then thread them as strings into FKs of the next batch. Demo sidesteps with `TRUNCATE ... RESTART IDENTITY CASCADE` so IDs are predictable (1..N) and FK refs are hardcoded. Works for a seed; would not generalize.

9. **Bus's polling loop crashes the process when `_typegres_live_events` is missing.** With `db.startLive()` enabled but no events table, the polling query throws and bubbles uncaught out of the loop, killing the server. Should be a clear startup-time error from `startLive()` itself ("events table not found — run `TypegresLiveEvents.createTableSql()`") or from a single first poll, not a delayed crash from a background tick.

10. **Decorators force a custom build step on every typegres consumer.** `@tool()` is TC39 stage-3, which Node hasn't shipped natively and Vite 8's default Oxc transform leaves untouched → SyntaxError at import. Workarounds we've already paid for: `tsdown.config.ts` uses `unplugin-swc`, vitest configs use `unplugin-swc`, tsx happens to handle it via its own swc pipeline. Each new consumer (vitest in ops-demo, eventually a Vite client app, anyone embedding typegres in their own bundler) has to repeat this dance. **Resolve by either (a) eliminate** — drop decorators, register tools via a runtime call (e.g. `tool(this, 'name', fn)`) or via a class wrapper — **or (b) document** prominently: a setup-guide section + a copy-pasteable swc config snippet + a per-bundler matrix (vite/vitest, webpack, esbuild, rollup, tsx, raw node). (a) is cleaner long-term; (b) is shippable now.

## Closed

1. **exoeval wasn't a public export.** `@tool`, `RpcClient`, `inMemoryChannel`, `safeStringify` lived in `src/exoeval/` but weren't in `package.json#exports`. **Fixed:** added a `./exoeval` subpath + tsdown entry; made `safeStringify` public.

2. **`tg generate` stripped `@tool()` decorators on regenerate.** **Fixed:** generator now emits `@tool()` by default on new files (with `tool` import). Update path parses the existing block and preserves per-entry decoration state — entries the user stripped stay stripped, new entries from migrations default to decorated. Update path doesn't touch imports — if a regen adds `@tool()` to a previously-undecorated file, add the import or strip the decorator. Pure `generateTable(...)` extracted, covered by `src/tables/generate.test.ts`.

3. **`db.Table === Table`.** Same function (database.ts:206). Either spelling works.

4. **Circular imports between schema files.** Refs to other tables go *inside method bodies only* (basic example pattern; codegen emits this shape). Field initializers must not reference other table classes — TDZ.

5. **`@tool()` on relation methods works over the wire** — verified by `src/server/api.test.ts > customer().select() from an order returns the linked customer` (closes prior open issue).

6. **Server response: use `c.body(...)` not `new Response(...)`.** With `@hono/node-server`, returning a raw `Response` constructed with `safeStringify(result)` produced an empty body (status 200, content-length 0). Using Hono's `c.body(text, status, headers)` works as expected. Cause not investigated; use the Hono helper.
