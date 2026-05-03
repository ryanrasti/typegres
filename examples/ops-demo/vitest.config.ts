import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

// Schema files use TC39 stage-3 decorators (`@tool()` from typegres/exoeval).
// Vite 8's default Oxc transform leaves them as-is, which trips the Node
// runtime with a SyntaxError. SWC lowers them.
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
  test: {
    testTimeout: 15000,
  },
});
