type AuthPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
};

export type { AuthPayload, AuthResponse };