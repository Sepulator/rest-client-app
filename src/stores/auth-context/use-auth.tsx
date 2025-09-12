'use client';
import { use } from 'react';

import { AuthContext } from '@/stores/auth-context/context';

export const useAuth = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('Must be used within a AuthContext');
  }

  return context;
};
