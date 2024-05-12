import { loginApi, refreshTokenApi, registerApi } from "../apis/authApi";
import {
  LoginCredential,
  LoginResponse,
  RegisterPayload,
} from "../types/auth.type";

export async function login(
  credentials: LoginCredential
): Promise<LoginResponse> {
  try {
    const resp = await loginApi(credentials);
    return resp.data;
  } catch (ex: any) {
    throw ex;
  }
}

export async function register(payload: RegisterPayload) {
  try {
    const resp = await registerApi(payload);
    return resp.data;
  } catch (ex: any) {
    throw ex;
  }
}

export async function refreshToken(
  accessToken: string,
  refreshToken: string
): Promise<LoginResponse> {
  try {
    const resp = await refreshTokenApi(accessToken, refreshToken);
    return resp.data;
  } catch (ex: any) {
    throw ex;
  }
}
