import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

// Runs tests inside real workerd (the same runtime the DO ships on), with
// the DO + SQLite storage wired up from wrangler.jsonc.
export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        // A long-lived Cap'n Web WebSocket keeps the DO's SQLite open, which
        // the per-test isolated-storage reset can't snapshot. Disable it; each
        // test uses its own DO id instead, so they stay independent.
        isolatedStorage: false,
        wrangler: { configPath: "./wrangler.jsonc" },
      },
    },
  },
});
