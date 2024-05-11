import NextAuth from "next-auth";
import JWT from "next-auth/jwt";

export interface UserData extends User {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  role: string | string[];
}

export interface JWTPayload {
  iss: string;
  sub: string;
  sid: string;
  jti: string;
  role: string | string[];
  username: string;
  userInfo: string;
  email: string;
  nbf: number;
  exp: number;
  iat: number;
}

declare module "next-auth" {
  interface Session {
    user: UserData;
    error?: stirng;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserData;
    iat: number;
    exp: number;
    jti: string;
    error?: stirng;
  }
}
