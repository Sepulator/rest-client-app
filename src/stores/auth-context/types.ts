export type UserData = {
  id: string;
  email: string;
};

export type AuthContextType = {
  user?: UserData;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
