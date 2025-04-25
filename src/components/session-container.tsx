
import { auth } from '@/lib/auth';
import { Session } from 'next-auth';

interface SessionContainerProps {
    children: React.ReactNode,
    session: Session | null
}

export default async function SessionContainer({ children, session } : SessionContainerProps) {
    const authSession = await auth();

    console.log(authSession);

    return (
        <div>{children}</div>
    );
}