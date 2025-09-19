import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';

import { server } from '@/testing/mocks/server';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorage.clear();
});

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
