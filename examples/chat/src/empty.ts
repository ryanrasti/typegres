// Stub for the node-only typegres drivers (pg / better-sqlite3 / pglite).
// The Durable Object talks to SQLite through DoSqliteDriver only, so those
// drivers are never imported at runtime — aliasing them here (see
// wrangler.jsonc `alias`) keeps their native/node dependencies out of the
// workerd bundle.
export default {};
