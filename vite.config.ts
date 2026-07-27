import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le nom du dépôt GitHub est utilisé comme base path pour GitHub Pages.
// Remplacez "dynasty8-catalogue" par le nom exact de votre dépôt si différent.
const REPO_NAME = 'dynasty8-catalogue';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // En production sur GitHub Pages, le site est servi depuis /REPO_NAME/.
  // Sur Vercel/Netlify (variable VERCEL ou NETLIFY définie) ou en dev, la base reste "/".
  base:
    mode === 'gh-pages' ? `/${REPO_NAME}/` : '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
}));
