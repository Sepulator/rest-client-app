'use client';

import { createContext } from 'react';

import type { AuthContextType } from '@/stores/auth-context/types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
