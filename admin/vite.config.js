import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // This will make '@' map to the 'src' folder
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // your backend server address
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
