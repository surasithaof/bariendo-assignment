import AxiosInstance from "../axios/AxiosInstanceClient";
import { UserRole } from "../types/auth.enum";
import { UserOrganization } from "../types/user.type";

export const getUserOrgsApi = async (userId: number) => {
  return AxiosInstance.get<UserOrganization[]>(`/users/${userId}/orgs`);
};

export const createUserOrgsApi = async (
  userId: number,
  orgId: number,
  role: UserRole
) => {
  return AxiosInstance.post<UserOrganization>(
    `/users/${userId}/orgs/${orgId}`,
    {
      role,
    }
  );
};
