import axios, { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";
import * as https from "https";
import { getSession } from "next-auth/react";

export const ApiInstanceServer = async (
  context: GetServerSidePropsContext
): Promise<AxiosInstance> => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const session = await getSession(context);
  const user: any = session?.user;

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 30000,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    },
    httpsAgent: httpsAgent,
  });
};
