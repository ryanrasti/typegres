import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      capnweb: path.resolve(__dirname, "src/capnweb/src/index.ts"),
      // Ignore pg module (Node.js only, not used in browser)
      pg: path.resolve(__dirname, "src/empty-module.ts"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["pg", "@electric-sql/pglite"],
  },
  define: {
    "process.env": "{}",
    process: "({env:{}})",
  },
  build: {
    target: "esnext", // ES2022 supports top-level await
  },
  esbuild: {
    target: "esnext", // Also set for dev mode
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ["../.."],
    },
  },
});
