import { UserRole } from "./types/auth.enum";

export const ErrorMessages = {
  SERVICE_ERROR: "Something went wrong. Please try again later",
  UNAUTHORIZED: "Unauthorized",
};
Object.freeze(ErrorMessages);

export const AppRoute = {
  Base: "/",
  Home: "/home",
  Auth: {
    SignIn: "/auth/sign-in",
    Register: "/auth/sign-up",
  },
  Manage: {
    Base: "/manage",
    Users: "/manage/users",
    Appointments: "/manage/appointments",
  },
  Appointment: {
    Base: "/appointments",
    Detail: "/appointments/:id",
  },
  Error: "/error",
  UnAuthorized: "/403",
};
Object.freeze(AppRoute);

export const userRoles = [
  { key: UserRole.SuperAdmin, label: UserRole.SuperAdmin },
  { key: UserRole.Admin, label: UserRole.Admin },
  { key: UserRole.Doctor, label: UserRole.Doctor },
  { key: UserRole.Patient, label: UserRole.Patient },
];

export const PatientProtectRoutes: string[] = [
  AppRoute.Home,
  AppRoute.Appointment.Base,
];

export const DoctorProtectRoutes: string[] = [
  AppRoute.Home,
  AppRoute.Appointment.Base,
];

export const AdminProtectRoutes: string[] = [
  AppRoute.Home,
  AppRoute.Manage.Base,
  AppRoute.Manage.Users,
  AppRoute.Manage.Appointments,
];

export const SuperAdminProtectRoutes: string[] = [
  ...AdminProtectRoutes,
  AppRoute.Manage.Users,
];

export const AllProtectRoutes: string[] = [
  ...PatientProtectRoutes,
  ...DoctorProtectRoutes,
  ...AdminProtectRoutes,
  ...SuperAdminProtectRoutes,
];
