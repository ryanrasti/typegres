import { defineConfig } from "tsdown";
import swc from "unplugin-swc";

// SWC handles TC39 stage-3 decorators (`@expose()`, `@expose.unchecked()`).
// tsdown's underlying rolldown/oxc transform leaves them as-is, which
// trips Node at runtime with a SyntaxError. SWC lowers them to ES2022.
const swcPlugin = () =>
  swc.rolldown({
    jsc: {
      target: "es2022",
      parser: { syntax: "typescript", decorators: true },
      transform: { decoratorVersion: "2022-03" },
    },
  });

export default defineConfig([
  // Library: multi-entry ESM + per-entry .d.ts for npm consumers.
  // Optional peer deps (`pg`, `@electric-sql/pglite`, `better-sqlite3`)
  // stay external so the bundler doesn't try to include their native
  // loaders — those use `require` / `__filename` and would trip Node's
  // CJS/ESM mixed-mode check when a consumer runs the CLI.
  {
    entry: ["src/index.ts", "src/config.ts", "src/builder/sql.ts", "src/types/postgres/index.ts", "src/types/sqlite/index.ts", "src/cli.ts", "src/exoeval/index.ts", "src/capnweb/shim.ts", "src/drivers/do.ts", "src/drivers/pg.ts", "src/drivers/pglite.ts", "src/drivers/sqlite.ts"],
    format: ["esm"],
    clean: true,
    // capnweb is force-bundled: typegres needs a fork that isn't on npm, so it
    // ships inlined and the shim re-exports the surface consumers need (see
    // src/capnweb/shim.ts).
    deps: {
      neverBundle: ["pg", "@electric-sql/pglite", "better-sqlite3"],
      alwaysBundle: ["capnweb"],
    },
    plugins: [swcPlugin()],
  },
  // Same shim, resolved through capnweb's `workerd` export condition. That
  // build imports `inject-workers-module` first, which stashes
  // `cloudflare:workers` on globalThis so capnweb interoperates with the
  // runtime's built-in RPC. Bundling only the default build would silently
  // drop that on Workers/Durable Objects; `package.json` routes the workerd
  // condition here. `cloudflare:workers` stays external — it's runtime-provided.
  {
    entry: { "capnweb/shim-workers": "src/capnweb/shim.ts" },
    format: ["esm"],
    dts: false,
    clean: false,
    inputOptions: { resolve: { conditionNames: ["workerd", "import", "default"] } },
    deps: {
      neverBundle: ["pg", "@electric-sql/pglite", "better-sqlite3", "cloudflare:workers"],
      alwaysBundle: ["capnweb"],
    },
    plugins: [swcPlugin()],
  },
  // Playground single-file bundle for the site's Monaco + esbuild-wasm
  // runtime. Emits directly into site/public/ so the site doesn't need a
  // copy step. pg is externalized via webpackIgnore on its dynamic
  // import call site.
  {
    entry: { typegres: "src/index.ts" },
    format: ["esm"],
    dts: true,
    outDir: "site/public",
    platform: "browser",
    deps: { neverBundle: ["pg", "@electric-sql/pglite"] },
    clean: false,
    plugins: [swcPlugin()],
  },
]);
