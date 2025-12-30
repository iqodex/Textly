import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base set to './' allows assets to load correctly on GitHub Pages (e.g. /RepoName/assets/...)
  base: './', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});