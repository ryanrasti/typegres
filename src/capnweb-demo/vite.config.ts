import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      capnweb: path.resolve(__dirname, "src/capnweb/src/index.ts"),
      typegres: path.resolve(__dirname, "../../src/index.ts"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["@electric-sql/pglite"],
  },
  build: {
    target: "esnext", // ES2022 supports top-level await
  },
  esbuild: {
    target: "esnext", // Also set for dev mode
  },
  server: {
    host: true, // Allow external connections
    allowedHosts: [
      ".csb.app", // CodeSandbox wildcard
      ".stackblitz.io", // StackBlitz wildcard
      "localhost",
    ],
    fs: {
      // Allow serving files from one level up to the project root
      allow: ["../.."],
    },
  },
});

