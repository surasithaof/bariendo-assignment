import { UserRole } from "./auth.enum";
import { PagingReq } from "./shared.type";

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  agency: string;
  active: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface UserListReq extends PagingReq {
  keyword?: string;
  status?: UserStatus;
  roles?: UserRole[];
}

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
  All = "All",
}
