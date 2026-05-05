import { defineConfig } from "vitest/config";
import path from "path";
import swc from "unplugin-swc";

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        target: "es2022",
        parser: { syntax: "typescript", decorators: true },
        transform: { decoratorVersion: "2022-03" },
      },
    }),
  ],
  test: {
    environment: "happy-dom",
    globals: true,
    server: {
      // typegres is a `file:..` dep — vitest's dep optimizer must read
      // outside this package root, same widening we apply in dev.
      deps: { external: [/^typegres/] },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
