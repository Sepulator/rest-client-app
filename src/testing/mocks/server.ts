import { setupServer } from 'msw/node';

import { handlers } from '@/testing/mocks/handlers';

export const server = setupServer(...handlers);
