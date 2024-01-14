import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/React-slider/",
  plugins: [react()],
  // build: {
  //   outDir: "dist",
  //   assetsDir: "assets",
  //   assetsInlineLimit: 0,
  //   rollupOptions: {
  //     output: {
  //       assetFileNames: (assetInfo) => {
  //         const extType = assetInfo.name.split(".")[1];
  //         if (/png|jpe?g/i.test(extType)) {
  //           return `assets/images/[name][extname]`;
  //         }
  //         if (/svg/i.test(extType)) {
  //           return `assets/svg/[name][extname]`;
  //         }
  //         return `assets/${extType}/[name][extname]`;
  //       },
  //       chunkFileNames: "assets/js/[name]-[hash].js",
  //       entryFileNames: "assets/js/[name]-[hash].js",
  //     },
  //   },
  // },
});
