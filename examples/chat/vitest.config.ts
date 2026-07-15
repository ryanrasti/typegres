import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

// Runs tests inside real workerd (the same runtime the DO ships on), with
// the DO + SQLite storage wired up from wrangler.jsonc.
export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.jsonc" },
      },
    },
  },
});
