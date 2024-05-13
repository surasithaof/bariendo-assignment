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
  role: UserRole;
  updatedAt: string;
  createdAt: string;
}
