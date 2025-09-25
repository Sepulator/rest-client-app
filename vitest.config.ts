import { defineConfig } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['next-intl'],
      },
    },
    setupFiles: ['./src/testing/setup-tests.ts'],
    coverage: {
      reporter: 'text',
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/App.{js,jsx,ts,tsx}',
        'src/testing/setup-tests.{js,ts,tsx}',
        'src/**/*.d.ts',
        'src/i18n/**/*',
        '**/*/fonts.ts',
        'src/utils/supabase/**/*',
      ],
    },
  },
});
