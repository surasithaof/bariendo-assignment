import { UserRole } from "./types/auth.enum";

export const ErrorMessages = {
  INVLAID_LOGIN_CRED: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
  INACTIVE_USER: "ผู้ใช้งานถูกระงับ",
  BAD_REQUEST: "ข้อมูลไม่ถูกต้อง",
  INVALID_OTP: "OTP ไม่ถูกต้อง",
  SERVICE_ERROR: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
  UNAUTHORIZED: "ไม่มีสิทธิ์เข้าใช้งาน กรุณาใช้งานด้วยสิทธิ์การใช้งานอื่น",
};
Object.freeze(ErrorMessages);

export const ErrorCode = {
  INVLAID_LOGIN_CRED: "INVLAID_LOGIN_CRED",
  INACTIVE_USER: "INACTIVE_USER",
  SERVICE_ERROR: "SERVICE_ERROR",
};
Object.freeze(ErrorCode);

export const AppRoute = {
  Home: "/",
  Auth: {
    Main: "/auth",
    SignIn: "/auth/sign-in",
    Register: "/auth/sign-up",
  },
  Manage: {
    Base: "/manage",
    Courses: "/manage/courses",
    LearningResults: "/manage/learning-results",
    Users: "/manage/users",
    SystemConfigs: "/manage/system-configs",
  },
  MyProfile: "/my-profile",
  Error: "/error",
  UnAuthorized: "/403",
};
Object.freeze(AppRoute);

export const userRoles = [
  { key: UserRole.SuperAdmin, label: UserRole.SuperAdmin },
  { key: UserRole.Officer, label: UserRole.Officer },
  { key: UserRole.Doctor, label: UserRole.Doctor },
  { key: UserRole.Patient, label: UserRole.Patient },
];

export const PatientProtectRoutes: string[] = [AppRoute.MyProfile];

export const OfficerProtectRoutes: string[] = [
  AppRoute.Manage.Base,
  AppRoute.Manage.Users,
  AppRoute.Manage.LearningResults,
  AppRoute.Manage.SystemConfigs,
  AppRoute.MyProfile,
];

export const SuperAdminProtectRoutes: string[] = [
  ...OfficerProtectRoutes,
  AppRoute.Manage.Users,
];

export const AllProtectRoutes: string[] = [
  ...PatientProtectRoutes,
  ...OfficerProtectRoutes,
  ...SuperAdminProtectRoutes,
];
