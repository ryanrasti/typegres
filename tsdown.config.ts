import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/config.ts", "src/types/index.ts", "src/builder/sql.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
});
