import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/config.ts", "src/types/index.ts", "src/builder/sql.ts"],
  format: ["esm"],
  dts: false, // TODO: stock TS stack overflows on recursive types, need tsgo DTS support
  clean: true,
});
