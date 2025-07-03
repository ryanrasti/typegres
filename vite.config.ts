import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
        typegres: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
    }
  },
});