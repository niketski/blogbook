import UserModel, { IUser } from "@/models/user-model";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import dbConnect from "./db-connect";

const nextAuthConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: 'Username', },
                password: { label: 'Password',  type: 'password' }
            },
            async authorize(credentials) {
                await dbConnect();
                console.log('authorize');

                const result = await UserModel.find<IUser>({ username: credentials?.username });
                const existingUser = result[0];


                if (existingUser) {
                    const hashedPassword = existingUser.password;
                    const currentPassword = credentials.password as string;
                    const isValidPassword = await bcrypt.compare(currentPassword, hashedPassword);

                    if(isValidPassword) {

                        return existingUser;
                    
                    }

                    return null;
                    
                } else {
                
                    return null
        
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60 // 1 day
    },
    jwt: {
        maxAge: 24 * 60 * 60, // 1 day
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user) {

              token.id = user.id; // Add id to the token
            
            }

            return token;
        },
        async session({ session, token}) {
            
            if (session.user && token.sub) {
                session.user.id = token.sub; // <-- ADD user id to session.user
              }

            return session;
        }
    },
    trustHost: true
};

export default nextAuthConfig;