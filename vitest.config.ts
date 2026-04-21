import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// `demo.ts` uses bare package imports (`from "typegres"`) so the playground
// snippet reads naturally. Alias those to the source so the demo test can
// run against src without a build step.
const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "typegres/types": `${src}/types/index.ts`,
      typegres: `${src}/index.ts`,
    },
  },
  test: {
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
