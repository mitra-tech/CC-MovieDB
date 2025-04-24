import { NextRequest, NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/", "/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path) || path.startsWith("/movies/");

    // protectedRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};