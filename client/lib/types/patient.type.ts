import { UserOrganization } from "./user.type";

export interface Patient {
  id: number;
  userOrganizationId: number;
  userOrganization: UserOrganization;
  createdAt: string;
  updatedAt: string;
}
