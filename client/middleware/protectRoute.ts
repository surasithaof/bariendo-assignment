// middleware.ts
import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";
import {
  AllProtectRoutes,
  AppRoute,
  OfficerProtectRoutes,
  PatientProtectRoutes,
  SuperAdminProtectRoutes,
} from "../lib/constants";
export const protectRoute: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;

    const matchesProtectedPath = pathMatch(AllProtectRoutes, pathname);
    if (matchesProtectedPath) {
      const token = await getToken({ req: request });
      const jwtUser = token;

      if (!token) {
        const url = new URL(AppRoute.Auth.SignIn, request.url);
        url.searchParams.set("callbackUrl", encodeURI(request.url));
        return NextResponse.redirect(url);
      }

      // TODO: handle middleware for protect route.
      // if (
      //   isStudent(jwtUser?.user?.role) &&
      //   pathMatch(PatientProtectRoutes, pathname)
      // ) {
      //   return NextResponse.next();
      // } else if (
      //   isOfficer(jwtUser?.user?.role) &&
      //   pathMatch(OfficerProtectRoutes, pathname)
      // ) {
      //   return NextResponse.next();
      // } else if (
      //   isSuperAdmin(jwtUser?.user?.role) &&
      //   pathMatch(SuperAdminProtectRoutes, pathname)
      // ) {
      //   return NextResponse.next();
      // } else {
      //   const url = new URL(`/403`, request.url);
      //   return NextResponse.rewrite(url);
      // }
    }
    return NextResponse.next();
  };
};

const pathMatch = (protects: string[], currentPath: string): boolean => {
  return protects.some((path) => currentPath.startsWith(path));
};
