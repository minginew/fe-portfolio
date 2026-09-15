import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  build: {
    // 인트로 배경 타일(4KB)은 인라인하지 않는다: 엔트리 청크에 들어가면 전 페이지 FCP +150ms(실측), 별도 파일 + preload가 더 유리
    assetsInlineLimit: (filePath) => (filePath.includes('background_white') ? false : undefined),
  },
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
});
