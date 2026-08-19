import { defineConfig } from "tsdown";
import swc from "unplugin-swc";

export default defineConfig({
  entry: ["server/index.ts"],
  outDir: "dist-server",
  format: ["esm"],
  platform: "node",
  target: "node22",
  dts: false,
  deps: { neverBundle: ["oracledb"] },
  plugins: [swc.rolldown({
    jsc: {
      target: "es2022",
      parser: { syntax: "typescript", decorators: true },
      transform: { decoratorVersion: "2022-03" },
    },
  })],
});
