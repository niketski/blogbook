import NextAuth from "next-auth"
import nextAuthConfig from "@/lib/next-auth-config";

const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(nextAuthConfig);

export { handlers, auth, signIn, signOut };