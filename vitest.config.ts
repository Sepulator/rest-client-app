import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: ['./src/__tests__/setup-tests.ts'],
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
        // 'src/__tests__/setup-tests.{js,ts,tsx}',
        'src/**/*.d.ts',
      ],
    },
  },
});
