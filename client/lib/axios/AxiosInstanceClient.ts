import axios from "axios";
import { getSession } from "next-auth/react";
import { AppRoute } from "../constants";
import * as https from "https";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: defaultHeaders,
  timeout: 30000,
  httpsAgent: httpsAgent,
});

AxiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const user: any = session?.user;

  if (user?.error) {
    // redirect to show user need to logout before logging user out
    window.location.href = AppRoute.Home;
    return config;
  }

  if (user?.accessToken) {
    config.headers = {
      ...(config.headers as any),
      Authorization: `Bearer ${user?.accessToken}`,
    };
  }

  return config;
});

export default AxiosInstance;
