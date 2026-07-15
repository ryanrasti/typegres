import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Builds the browser client (client/) to dist/client, which wrangler serves as
// static assets. The Worker + Durable Object are built/served by wrangler; this
// config is only the frontend.
export default defineConfig({
  root: "client",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
  },
});
