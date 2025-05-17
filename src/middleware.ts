import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    
    try {
        const session = await auth();
        const callbackUrl = req.nextUrl.pathname;
    
        if(session) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url));
    
    } catch (error) {

        console.log('middle error:', error);

    }
   
}

export const config = {
    matcher: ['/admin/:path*'], // Just dynamic routes, not static files
  };