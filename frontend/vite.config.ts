import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: [
      {find: "@", replacement: path.resolve(__dirname, "src")},
      {find: "@icons", replacement: path.resolve(__dirname, "src/assets/icons")},
      {find: "@images", replacement: path.resolve(__dirname, "src/assets/images")},
      {find: "@components", replacement: path.resolve(__dirname, "src/components")},
      {find: "@pages", replacement: path.resolve(__dirname, "src/pages")},
      {find: "@hooks", replacement: path.resolve(__dirname, "src/hooks")},
      {find: "@styles", replacement: path.resolve(__dirname, "src/styles")},
      {find: "@redux", replacement: path.resolve(__dirname, "src/redux")},
    ]
  }
});
