import { beforeAll, afterEach, afterAll } from 'vitest';
import '@testing-library/jest-dom';

import { server } from '@/testing/mocks/server';

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
