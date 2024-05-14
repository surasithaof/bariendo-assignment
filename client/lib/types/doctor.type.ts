import { UserOrganization } from "./user.type";

export interface Doctor {
  id: number;
  userOrganizationId: number;
  userOrganization: UserOrganization;
  createdAt: string;
  updatedAt: string;
}
