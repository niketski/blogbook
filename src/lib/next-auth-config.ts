import UserModel, { IUser } from "@/models/user-model";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: 'Username', },
                password: { label: 'Password',  type: 'password' }
            },
            async authorize(credentials) {

                const existingUser = await UserModel.find<IUser>({ username: credentials?.username });
                // console.log(credentials);
                // console.log(existingUser);
                console.log('authorize');
                // return existingUser[0];

                if (existingUser[0]) {
                // Any object returned will be saved in `user` property of the JWT
                return existingUser[0]
                } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
};

export default nextAuthConfig;