import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/config.ts", "src/types/index.ts", "src/builder/sql.ts"],
  format: ["esm"],
  dts: false, // tsgo handles DTS separately (stock TS stack overflows on recursive types)
  clean: true,
});
