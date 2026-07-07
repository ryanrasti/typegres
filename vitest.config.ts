import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import swc from "unplugin-swc";

// `demo.ts` uses bare package imports (`from "typegres"`) so the playground
// snippet reads naturally. Alias those to the source so the demo test can
// run against src without a build step.
const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    // Order matters — Vite matches aliases longest-first, so subpath
    // entries come before the bare `typegres` root.
    alias: {
      "typegres/postgres": `${src}/types/postgres/index.ts`,
      "typegres/sqlite": `${src}/types/sqlite/index.ts`,
      typegres: `${src}/index.ts`,
    },
  },
  // SWC handles TC39 stage-3 decorators (`@expose()`, `@expose.unchecked()` on
  // codegen'd methods). Vite 8's default Oxc transform leaves them as-is,
  // which trips the Node runtime with a SyntaxError. SWC lowers them.
  // `oxc: false` disables the default; SWC owns the TS pipeline.
  oxc: false,
  plugins: [
    swc.vite({
      jsc: {
        target: "es2022",
        parser: { syntax: "typescript", decorators: true },
        transform: { decoratorVersion: "2022-03" },
      },
    }),
  ],
  test: {
    // Bumped from the 5s default: pg-backed tests hit their limit under
    // slow containers (act/docker on a single vCPU) even though they run
    // in ~50ms locally.
    testTimeout: 15000,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.direnv/**",
      "**/examples/**",
      "packages/**",
      "site/**",
    ],
  },
});
