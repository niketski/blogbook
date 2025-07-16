import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/session'
import { cookies } from 'next/headers'
import { updateSession } from './lib/session';

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname;
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    // redirect to logine page if there's no session
    if(!session) {

        const loginUrl = new URL('/login', req.nextUrl);

        loginUrl.searchParams.set('redirect', path);

        return NextResponse.redirect(loginUrl);

    } else {

        // update session 
        const currentDate = new Date();
        const sessionExpiration = new Date(session.expiresAt);
        const timeLeft = sessionExpiration.getTime() - currentDate.getTime();
        const halfHour = 1000 * 60 * 30;
        
        //check if the current date and time is 30 mins before the expiration date and time
        if(timeLeft > 0 && timeLeft <= halfHour) {

            // update session
            await updateSession();

            console.log('The session has been updated.');
        } 
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ '/admin/:path*'],
};