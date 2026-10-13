import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // `import X from './file.svg?react'` → inline React component, so the
    // illustrations can pick up theme colours through CSS variables.
    svgr({ svgrOptions: { dimensions: false } }),
  ],
  // Tailwind runs through its Vite plugin; an inline (empty) PostCSS config
  // stops Vite from picking up any legacy postcss.config.js.
  css: { postcss: {} },
  build: {
    assetsInlineLimit: 0,
  },
});
