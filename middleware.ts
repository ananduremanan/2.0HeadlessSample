import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for the root path
  if (request.nextUrl.pathname === "/") {
    // Redirect to the /dashboard path
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // Continue with the next middleware or request handler
  return NextResponse.next();
}

// Optional: Configure the matcher to specify paths where the middleware should run
export const config = {
  matcher: "/",
};
