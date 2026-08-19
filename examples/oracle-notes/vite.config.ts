import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist/client" },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
      "/healthz": "http://localhost:3001",
    },
  },
});
