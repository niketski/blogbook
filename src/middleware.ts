import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/session'
import { cookies } from 'next/headers'

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname;
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);


    if(!session) {
        const loginUrl = new URL('/login', req.nextUrl);

        loginUrl.searchParams.set('redirect', path);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ '/admin/:path*'],
};