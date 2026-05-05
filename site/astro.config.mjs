import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import swc from "unplugin-swc";

// Astro replaces the previous Next setup. Site is fully static
// (`output: "static"`); per-route React islands hydrate the
// interactive bits (playground, demo, dark-mode toggle).
//
// SWC plugin handles TC39 stage-3 decorators that typegres uses on
// `@tool()` — the friction Next 14's compiler couldn't accommodate.

export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }), // we provide our own globals.css
    mdx(),
  ],
  vite: {
    plugins: [
      swc.vite({
        jsc: {
          target: "es2022",
          parser: { syntax: "typescript", tsx: true, decorators: true },
          transform: { decoratorVersion: "2022-03", react: { runtime: "automatic" } },
        },
      }),
    ],
    // PGlite ships WASM + a binary "FS bundle" alongside its JS. Vite's
    // default dep-prebundle mangles those assets (manifests as "Invalid
    // FS bundle size: 453 !== 5289109" — the 453-byte response is an
    // index.html the dev server serves when the asset path 404s).
    // Excluding from optimizeDeps leaves the dynamic import alone, and
    // `worker: { format: 'es' }` is required so PGlite's worker URL
    // resolves to a real ESM bundle rather than IIFE.
    optimizeDeps: {
      exclude: ["@electric-sql/pglite"],
    },
    worker: {
      format: "es",
    },
    assetsInclude: ["**/*.wasm", "**/*.data"],
    // typegres is a `file:..` dep, so PGlite resolves into the parent
    // repo's node_modules. Vite's default fs.allow restricts to the
    // current project root; widen it to the repo root so PGlite's
    // .wasm + .data assets can be served in dev.
    server: {
      fs: {
        allow: ["..", "../node_modules"],
      },
    },
  },
});
