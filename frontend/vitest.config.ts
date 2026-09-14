import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css: false,
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/test/**', 'src/types/**', 'src/**/*.d.ts', 'src/main.tsx'],
        reporter: ['text', 'html'],
      },
      // scripts/**/*.test.mjs는 jsdom setupFiles(localStorage 등 브라우저 API 사용)
      // 없이 node 환경에서 돌려야 하므로 별도 project로 분리한다.
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            environment: 'jsdom',
            setupFiles: ['src/test/setup.ts'],
            include: ['src/**/*.test.{ts,tsx}'],
          },
        },
        {
          extends: true,
          test: {
            name: 'scripts',
            environment: 'node',
            include: ['scripts/**/*.test.mjs'],
          },
        },
      ],
    },
  })
);
