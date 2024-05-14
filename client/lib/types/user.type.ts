import { UserRole } from "./auth.enum";
import { Organization } from "./org.type";

export interface User {
  id: number;
  email: string;
  updatedAt: string;
  createdAt: string;
}

export interface UserOrganization {
  id: number;
  userId: number;
  user?: User;
  organizationId: number;
  organization?: Organization;
  name: string;
  role: UserRole;
  patient?: {
    id: number;
    userOrganizationId: number;
  };
  doctor?: {
    id: number;
    userOrganizationId: number;
  };
  updatedAt: string;
  createdAt: string;
}
