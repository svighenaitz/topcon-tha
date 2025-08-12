import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest-setup.ts',
    exclude: ['e2e/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      exclude: [
        'node_modules/**',
        'e2e/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/test-utils.*',
        '**/vitest-setup.*',
        '**/coverage/**',
        '**/dist/**',
        '**/.{git,cache,output,temp}/**',
        '**/main.tsx',
      ]      
    },
  },
}); 