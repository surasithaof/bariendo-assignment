import CredentialsProvider from "next-auth/providers/credentials";
import * as Auth from "./auth";
import { decode } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import axios, { AxiosError } from "axios";
import { JWTPayload, UserData } from "@/lib/types/next-auth";
import { LoginCredential, REFRESH_TOKEN_ERROR } from "@/lib/types/auth.type";
import { APIErrorResponse } from "@/lib/types/shared.type";
import { AppRoute } from "../constants";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const loginResponse = await Auth.login(
            credentials as LoginCredential
          );
          const { sub, email, exp, role } = decode(
            loginResponse.accessToken
          ) as JWTPayload;
          const user: UserData = {
            id: sub,
            email: email,
            accessToken: loginResponse.accessToken,
            accessTokenExpires: exp,
            refreshToken: loginResponse.refreshToken,
            role: role,
          };
          return user;
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const errorObj = axiosError?.response?.data as APIErrorResponse;
            if (errorObj) console.error("axios error obj", errorObj);
            else console.error("axios error", axiosError);
          } else {
            console.error("error", error);
          }
          throw error;
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "token",
      name: "token",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        accessToken: { label: "accessToken", type: "text" },
        refreshToken: { label: "refreshToken", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const { sub, email, exp, role } = decode(
            credentials?.accessToken || ""
          ) as JWTPayload;
          const user: UserData = {
            id: sub,
            email: email,
            accessToken: credentials?.accessToken || "",
            accessTokenExpires: exp,
            refreshToken: credentials?.refreshToken || "",
            role: role,
          };
          return user;
        } catch (error: any) {
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: AppRoute.Auth.SignIn,
    error: AppRoute.Auth.SignIn,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.user = user as UserData;
        return token;
      }
      const now = Math.floor(new Date().getTime() / 1000);
      const userData = token.user;
      const isExpired = now > userData.accessTokenExpires;
      if (!isExpired) {
        return token;
      }

      return refreshAccessToken(
        token,
        userData.accessToken,
        userData.refreshToken
      );
    },
    async session({ session, token, user }) {
      session.user = token.user;
      if (token?.error) {
        session.error = token.error;
      }
      return session;
    },
  },
};

async function refreshAccessToken(
  token: JWT,
  accessToken: string,
  refreshToken: string
) {
  try {
    const refreshTokenResponse = await Auth.refreshToken(
      accessToken,
      refreshToken
    );
    const { sub, email, exp, role } = decode(
      refreshTokenResponse.accessToken
    ) as JWTPayload;
    const refreshedUser: UserData = {
      id: sub,
      email: email,
      accessToken: refreshTokenResponse.accessToken,
      accessTokenExpires: exp,
      refreshToken: refreshTokenResponse.refreshToken,
      role: role,
    };
    token.user = refreshedUser;
    return token;
  } catch (error) {
    token.error = REFRESH_TOKEN_ERROR;
    return token;
  }
}
