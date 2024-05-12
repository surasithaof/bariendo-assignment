import { UserRole } from "./types/auth.enum";

export const ErrorMessages = {
  SERVICE_ERROR: "Something went wrong. Please try again later",
  UNAUTHORIZED: "Unauthorized",
};
Object.freeze(ErrorMessages);

export const AppRoute = {
  Home: "/",
  Auth: {
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
