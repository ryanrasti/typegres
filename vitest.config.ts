import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Test files share a single Postgres fixture; running them in parallel
    // creates table-name collisions on the shared DB. Ship-time cost is small
    // (<2s for the whole suite) and correctness wins.
    fileParallelism: false,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.direnv/**",
      "**/examples/**",
    ],
  },
});
