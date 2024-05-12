export interface LoginCredential {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginCredential {}

export interface LoginResponse {
  accessToken: "string";
  refreshToken: "string";
  expiresIn: number;
}
