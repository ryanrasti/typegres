import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

// SWC handles the TC39 stage-3 decorators (`@expose()`) that `tg
// generate` emits on columns and relations. Vite's default transform
// leaves them as-is, which trips the Node runtime with a SyntaxError.
export default defineConfig({
  oxc: false,
  plugins: [
    swc.vite({
      jsc: {
        target: "es2022",
        parser: { syntax: "typescript", decorators: true },
        transform: { decoratorVersion: "2022-03" },
      },
    }),
  ],
});
