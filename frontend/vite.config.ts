import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    visualizer({
      filename: 'report/bundle-stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@icons', replacement: path.resolve(__dirname, 'src/assets/icons') },
      { find: '@images', replacement: path.resolve(__dirname, 'src/assets/images') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@redux', replacement: path.resolve(__dirname, 'src/redux') },
      { find: '@util', replacement: path.resolve(__dirname, 'src/util') },
    ],
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React 관련
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return '@react-vendor';
          }

          // Supabase
          if (id.includes('node_modules/@supabase/')) {
            return '@supabase-vendor';
          }

          // Highlight.js & Lowlight
          if (
            id.includes('node_modules/highlight.js/') ||
            id.includes('node_modules/lowlight/')
          ) {
            return '@highlight-vendor';
          }

          // Tiptap & Prosemirror → 묶어서 하나로
          if (
            id.includes('node_modules/@tiptap/') ||
            id.includes('node_modules/prosemirror/')
          ) {
            return '@tiptap-bundle';
          }
        },
      },
    },
  },
});
