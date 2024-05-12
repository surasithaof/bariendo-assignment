import { UserRole } from "../types/auth.enum";

export const hasRole = (
  userRole: string | string[] | undefined,
  checkingRole: UserRole
): boolean => {
  if (typeof userRole === "string" && userRole === checkingRole) {
    return true;
  }
  if (
    typeof userRole === "object" &&
    userRole.some((r) => r === checkingRole)
  ) {
    return true;
  }
  return false;
};
