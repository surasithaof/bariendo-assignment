import {
  loginApi,
  refreshTokenApi,
  registerStudentApi,
} from "./apis/auth/authApi";
import {
  LoginCredential,
  LoginResponse,
  RegisterPayload,
} from "./types/auth.type";

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

export async function registerStudent(payload: RegisterPayload) {
  try {
    const resp = await registerStudentApi(payload);
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
