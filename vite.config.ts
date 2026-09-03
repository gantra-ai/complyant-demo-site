import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dataSrc from "./plugins/data-src.js";

// base matches the GitHub Pages path for this repo.
export default defineConfig({
  base: "/complyant-demo-site/",
  plugins: [
    react({
      // The instrumented build. Every native JSX element is stamped with
      // data-src="path:line" so a scanner can trace a rendered element back to
      // the line of source that produced it. Shipped in the production build
      // on purpose for this demo; a customer would enable it on staging only.
      babel: { plugins: [[dataSrc, { root: process.cwd() }]] },
    }),
  ],
});
