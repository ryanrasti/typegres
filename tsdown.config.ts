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
    entry: ["src/index.ts", "src/core.ts", "src/config.ts", "src/builder/sql.ts", "src/types/postgres/index.ts", "src/types/sqlite/index.ts", "src/cli.ts", "src/exoeval/index.ts", "src/capnweb/shim.ts", "src/driver-do-sqlite.ts"],
    format: ["esm"],
    clean: true,
    deps: { neverBundle: ["pg", "@electric-sql/pglite", "better-sqlite3", "capnweb"] },
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
