import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
