import { defineConfig, type ViteUserConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import swc from "unplugin-swc";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";

// `demo.ts` uses bare package imports (`from "typegres"`) so the playground
// snippet reads naturally. Alias those to the source so the demo test can
// run against src without a build step.
const src = fileURLToPath(new URL("./src", import.meta.url));

// Shared by both projects (projects are separate Vite configs — root-level
// resolve/plugins don't inherit).
const shared = {
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
  oxc: false as const,
  plugins: [
    swc.vite({
      jsc: {
        target: "es2022",
        parser: { syntax: "typescript", decorators: true },
        transform: { decoratorVersion: "2022-03" },
      },
    }),
  ],
} satisfies ViteUserConfig;

export default defineConfig({
  test: {
    // Bumped from the 5s default: pg-backed tests hit their limit under
    // slow containers (act/docker on a single vCPU) even though they run
    // in ~50ms locally.
    testTimeout: 15000,
    projects: [
      {
        ...shared,
        test: {
          name: "node",
          exclude: [
            // Workerd-project tests; the default include glob wouldn't
            // match them anyway, but keep the partition explicit.
            "**/*.do-test.ts",
            "**/node_modules/**",
            "**/dist/**",
            "**/.claude/**",
            "**/.direnv/**",
            "**/examples/**",
            "packages/**",
            "site/**",
          ],
        },
      },
      // Real-Durable-Object tests (src/**/*.do-test.ts) run INSIDE workerd;
      // the cloudflare:* modules they import are duck-type declared in
      // src/live/sqlite/do-test-modules.d.ts.
      {
        ...shared,
        plugins: [
          ...shared.plugins,
          cloudflareTest({
            main: "./src/live/sqlite/do-test.worker.ts",
            miniflare: {
              compatibilityDate: "2025-01-01",
              durableObjects: {
                TEST_DO: { className: "TestDO", useSQLite: true },
              },
            },
          }),
        ],
        test: {
          name: "workerd",
          include: ["src/**/*.do-test.ts"],
        },
      },
    ],
  },
});
