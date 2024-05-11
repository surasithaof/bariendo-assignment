export interface LoginCredential {
  username: string;
  password: string;
}

// TODO: update fields.
export interface RegisterPayload extends LoginCredential {
  name: string;
  email: string;
  organizationId: number;
  role: string;
}

export interface LoginResponse {
  accessToken: "string";
  refreshToken: "string";
  expiresIn: number;
}
