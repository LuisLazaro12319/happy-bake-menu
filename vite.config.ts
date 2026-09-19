// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages hosts this at luislazaro12319.github.io/happy-bake-menu/, so every
// asset/link needs that subfolder baked in — same idea as NEXT_PUBLIC_BASE_PATH on
// the Next.js demo sites in this account.
const BASE_PATH = "/happy-bake-menu";

export default defineConfig({
  vite: {
    base: `${BASE_PATH}/`,
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: { basepath: BASE_PATH },
    // No server functions/dynamic server data anywhere in this app (just a fixed
    // product list + a WhatsApp link), so it can ship as plain static files —
    // deployable to GitHub Pages like the rest of the demo sites.
    prerender: { enabled: true, crawlLinks: true },
  },
});
