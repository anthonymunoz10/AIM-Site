import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          output: {
            // libraries change rarely: separate files stay cached between site updates
            manualChunks: {
              react: ["react", "react-dom", "react-router-dom"],
              motion: ["framer-motion"],
            },
          },
        },
      },
}));
