type AuthPayload = {
  username: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  userName: string;
  userId: number;
};

export type { AuthPayload, AuthResponse };
