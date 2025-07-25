import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/ocean_of_movies/tree/main",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTest.ts",
  },
});
