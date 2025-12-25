import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const protectedPaths = [
  { path: "/superadmin", roles: ["superadmin"] },
  { path: "/admin", roles: ["admin", "superadmin"] },
  { path: "/dashboard", roles: ["user", "admin", "superadmin"] },
]

const publicPaths = ["/login", "/register", "/"]

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl


  const protectedRoute = protectedPaths.find((route) =>
    pathname.startsWith(route.path)
  )

  // 1. Handle Unauthenticated Users on Protected Routes
  if (protectedRoute && !token) {
    const loginUrl = new URL("/login", request.url)
    // Store the original URL to redirect back after login
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Verify Token and Handle Role-Based Access

  if (token) {
    const userRole = token.userType as string

    if (publicPaths.includes(pathname)) {
      if (userRole === "superadmin") {
        return NextResponse.redirect(new URL("/superadmin", request.url))
      }
      else if (userRole === "admin") {
        return NextResponse.redirect(new URL("/volunteer", request.url))
        
      }
      else{
        return NextResponse.redirect(new URL("/", request.url))

      }
    }

    // Check if user has permission for the protected route
    if (protectedRoute && !protectedRoute.roles.includes(userRole)) {
      // User is authenticated but doesn't have the right role
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}