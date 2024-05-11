import {
  LoginCredential,
  LoginResponse,
  RegisterPayload,
} from "../../types/auth.type";
import AxiosInstance from "../../axios/AxiosInstanceClient";

export const loginApi = async (credentials: LoginCredential) => {
  return AxiosInstance.post<LoginResponse>("/auth/sign-in", credentials);
};

export const registerStudentApi = async (payload: RegisterPayload) => {
  return AxiosInstance.post<LoginResponse>("/auth/sign-up", payload);
};

export const refreshTokenApi = async (
  accessToken: string,
  refreshToken: string
) => {
  return AxiosInstance.post<LoginResponse>("/auth/refresh-token", {
    accessToken,
    refreshToken,
  });
};
