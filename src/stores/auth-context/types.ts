export type UserData = {
  name: string;
  email: string;
};

export type AuthContextType = {
  user?: UserData;
  login: (userData: UserData) => void;
  logout: () => void;
};
