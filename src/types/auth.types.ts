type AuthPayload = {
  username: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
};

export type { AuthPayload, AuthResponse };
