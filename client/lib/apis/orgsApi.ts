import AxiosInstance from "../axios/AxiosInstanceClient";
import { Organization } from "../types/org.type";

export const getOrgsApi = async () => {
  return AxiosInstance.get<Organization[]>("/orgs");
};
