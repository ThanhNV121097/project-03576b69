import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const MODES = ["system", "light", "dark"];

/**
 * The mode a visitor sees before they choose one: content.json's
 * site.defaultMode — "system" (their device's setting, the default), "light"
 * or "dark" — written onto <html> as data-default-mode each time the page is
 * built or served, so index.html's no-flash script knows it before React
 * loads. A missing or unknown value is "system".
 */
function defaultMode(): Plugin {
  let root = process.cwd();
  return {
    name: "default-mode",
    configResolved(config) {
      root = config.root;
    },
    transformIndexHtml(html) {
      let mode = "system";
      try {
        const site = JSON.parse(readFileSync(resolve(root, "src/content.json"), "utf8")).site;
        if (MODES.includes(site?.defaultMode)) mode = site.defaultMode;
      } catch {
        /* no content to read: the visitor's own setting */
      }
      return html.replace(/\sdata-default-mode="[^"]*"/, "").replace(/<html\b/i, `<html data-default-mode="${mode}"`);
    },
  };
}

// Served by `vite preview` behind the workspace's edge proxy, so every URL
// is host-relative and the app never assumes a port.
export default defineConfig({
  plugins: [react(), defaultMode()],
  base: "/",
  preview: { allowedHosts: true },
  server: { allowedHosts: true },
});
