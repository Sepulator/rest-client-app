import type { AuthContextType } from '@/stores/auth-context/types';

export const mockUserData: AuthContextType = {
  user: { id: 'test-user-id', email: 'tempemail@gmail.com' },
  loading: false,
};
