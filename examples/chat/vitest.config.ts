import { defineConfig } from "vitest/config";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import swc from "unplugin-swc";

export default defineConfig({
  plugins: [
    // Same decorator lowering as vite.config.ts (see comment there).
    swc.vite({
      include: /\.ts$/,
      jsc: {
        target: "es2022",
        parser: { syntax: "typescript", decorators: true },
        transform: { decoratorVersion: "2022-03" },
      },
    }),
    cloudflareTest({
      wrangler: { configPath: "./wrangler.jsonc" },
    }),
  ],
});
