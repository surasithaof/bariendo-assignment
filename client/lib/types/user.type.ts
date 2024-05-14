import { UserRole } from "./auth.enum";
import { Doctor } from "./doctor.type";
import { Organization } from "./org.type";
import { Patient } from "./patient.type";

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
  patient?: Patient;
  doctor?: Doctor;
  updatedAt: string;
  createdAt: string;
}
