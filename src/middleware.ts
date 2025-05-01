import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const session = await auth();
    const callbackUrl = req.nextUrl.pathname;
    
   if(session) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url));
}

export const config = {
    matcher: ['/admin/:path*'], // Just dynamic routes, not static files
  };