import { defineConfig } from "tsdown";

export default defineConfig([
  // Library: multi-entry ESM + per-entry .d.ts for npm consumers.
  {
    entry: ["src/index.ts", "src/config.ts", "src/types/index.ts", "src/builder/sql.ts"],
    format: ["esm"],
    clean: true,
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
  },
]);
