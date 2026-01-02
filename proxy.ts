import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const protectedPaths = [
  { path: "/superadmin", roles: ["superadmin"] },
  { path: "/admin", roles: ["admin", "superadmin"] },
  { path: "/volunteer", roles: ["volunteer"] },
  { path: "/dashboard", roles: ["user", "volunteer", "superadmin"] },
]

const publicPaths = ["/login", "/register", "/volunteerRegister", "/verify-email", "/volunteerOnboarding"]

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Check if path is public first
  const isPublicPath = publicPaths.includes(pathname)

  const protectedRoute = protectedPaths.find(route =>
    pathname.startsWith(route.path)
  )

  // Allow access to public paths without authentication
  if (isPublicPath) {
    // If user is already logged in and visiting public paths, redirect to their dashboard
    if (token) {
      const role = token.userType as string

      if (role === "superadmin") {
        return NextResponse.redirect(new URL("/superadmin", request.url))
      }
      if (role === "admin") {
        return NextResponse.redirect(new URL("/volunteer", request.url))
      }

      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  if (protectedRoute && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  //  Role mismatch
  if (token && protectedRoute) {
    const role = token.userType as string
    if (!protectedRoute.roles.includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
