export type UserData = {
  id: string;
  email: string;
};

export type AuthContextType = {
  user?: UserData;
  loading: boolean;
};
