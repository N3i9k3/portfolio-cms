import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      "portfolio-cms-production-2886.up.railway.app",
    ],
  },
});


