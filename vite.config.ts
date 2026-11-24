import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          physics: ["matter-js"],
          three: ["three", "three/addons/environments/RoomEnvironment.js"],
        },
      },
    },
  },
});
