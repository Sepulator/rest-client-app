export type UserData = {
  name: string;
  email: string;
};

export type AuthContextType = {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
};
