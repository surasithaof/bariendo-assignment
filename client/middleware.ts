import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AdminProtectRoutes,
  AllProtectRoutes,
  AppRoute,
  DoctorProtectRoutes,
  PatientProtectRoutes,
  SuperAdminProtectRoutes,
} from "./lib/constants";
import { getToken } from "next-auth/jwt";
import { hasRole } from "./lib/auth/role";
import { UserRole } from "./lib/types/auth.enum";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("middleware:", pathname);

  const matchesProtectedPath = pathMatch(AllProtectRoutes, pathname);
  if (matchesProtectedPath) {
    console.log("match middleware:", matchesProtectedPath, pathname);
    const token = await getToken({ req: request });
    const jwtUser = token;

    if (!token) {
      const url = new URL(AppRoute.Auth.SignIn, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    // TODO: server side should sign organization and role in token.
    console.log(jwtUser?.user);
    if (
      hasRole(jwtUser?.user?.role, UserRole.Patient) &&
      pathMatch(PatientProtectRoutes, pathname)
    ) {
      return NextResponse.next();
    } else if (
      hasRole(jwtUser?.user?.role, UserRole.Doctor) &&
      pathMatch(DoctorProtectRoutes, pathname)
    ) {
      return NextResponse.next();
    } else if (
      hasRole(jwtUser?.user?.role, UserRole.Admin) &&
      pathMatch(AdminProtectRoutes, pathname)
    ) {
      return NextResponse.next();
    } else if (
      hasRole(jwtUser?.user?.role, UserRole.SuperAdmin) &&
      pathMatch(SuperAdminProtectRoutes, pathname)
    ) {
      return NextResponse.next();
    } else {
      const url = new URL(AppRoute.UnAuthorized, request.url);
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

const pathMatch = (protects: string[], currentPath: string): boolean => {
  return protects.some((path) => currentPath.startsWith(path));
};
