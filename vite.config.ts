import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: 'app',
  plugins: [react()],
  publicDir: 'public',
  build: { outDir: '../dist', emptyOutDir: true, target: 'es2022' },
  server: { fs: { allow: [fileURLToPath(new URL('.', import.meta.url))] } },
});
