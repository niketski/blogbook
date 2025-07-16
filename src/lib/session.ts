import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { JWTPayload } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

interface AppSessionPayload extends JWTPayload {
    userId: string,
    expiresAt: Date
}

export async function encrypt(payload: AppSessionPayload) {
    
    return new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(encodeKey);
}

export async function decrypt(session: string | undefined = '') {

    try {

        const { payload } = await jwtVerify<AppSessionPayload>(session, encodeKey, {
            algorithms: ['HS256']
        });

        return payload;

    } catch(error: unknown) {

        if(error instanceof Error) {

            console.log('Failed to verify session.');

        }

    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000 );
    const session = await encrypt({
        userId,
        expiresAt
    });
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });
    
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value;
    const payload = await decrypt(session);

    if(!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 60 * 60 * 1000 );
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        expires
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    
    cookieStore.delete('session');   
}