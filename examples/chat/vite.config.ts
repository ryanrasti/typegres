import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import swc from "unplugin-swc";

// swc lowers the TC39 stage-3 decorators typegres uses for @expose —
// Vite's built-in oxc transform parses but does not lower them, and
// workerd's V8 can't run them raw. Scoped to .ts so React TSX stays on
// the default pipeline (fast refresh intact).
const decorators = swc.vite({
  include: /\.ts$/,
  jsc: {
    target: "es2022",
    parser: { syntax: "typescript", decorators: true },
    transform: { decoratorVersion: "2022-03" },
  },
});

export default defineConfig({
  plugins: [decorators, react(), tailwindcss(), cloudflare()],
});
