import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User page (3lwan.github.io) is served from the domain root, so base stays '/'.
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
