import NextAuth, { AuthOptions } from 'next-auth';

const handler = NextAuth({});

export { handler as GET, handler as POST };
