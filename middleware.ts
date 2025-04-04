import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const PUBLIC_API = ["/api/auth/signin", "/api/auth/signup"];
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (PUBLIC_API.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // If the token is not present, response with 401
  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        status: "error",
        data: null,
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
