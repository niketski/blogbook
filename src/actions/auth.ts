'use server'

import dbConnect from "@/lib/db-connect";
import { createSession, deleteSession } from "@/lib/session";
import UserModel, { IUser } from "@/models/user-model";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongoose";
import { z } from "zod";

interface LoginFormState {
    message?: string,
    status: 'error' | 'success' | 'idle',
    values: {
        username: string,
        password: string,
    }
    errors: {
        username?: string[],
        password?: string[],
        _form?: string,
    }
}

async function login(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
        console.log('prev state: ', prevState);

        const formSchema = z.object({
            username: z.string().min(3, { message: 'Username is required.' }),
            password: z.string().min(3, { message: 'Password is required.' })
        });

        const result = formSchema.safeParse({
            username,
            password
        });

        if(!result.success) {
            
            const errors = result.error.flatten().fieldErrors;

            return {
                values: {
                    username,
                    password
                },
                status: 'error',
                message: 'Login error, please make sure that the username and password are correct.',
                errors,
            }
        }

        // set up connection to the database
        await dbConnect();

        console.log('connecting..')

        const existingUser = await UserModel.findOne<IUser>({ username });
        console.log(existingUser);
        // check if there's existing user on the given username
        if(!existingUser) {
            return {
                values: {
                    username,
                    password
                },
                status: 'error',
                errors: {
                    _form: 'The user doesn\'t exist.' 
                }
            }
        }

        const hashedPassword = existingUser.password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);

        // check if password is valid
        if(!isValidPassword) {

            return {
                values: {
                    username,
                    password
                },
                status: 'error',
                errors: {
                    _form: 'Invalid password.'
                }
            }
        }

        const userId = existingUser._id as ObjectId;

        // create session
        await createSession(userId.toString());

        return {
            status: 'success',
            message: 'You have logged in successfully!',
            errors: {},
            values: {
                username: '',
                password: ''
            }
        }

    } catch(error: unknown) {

        console.log(error);

        const errorResponse: LoginFormState = {
            ...prevState,
            errors: {
                _form: 'Login error.'
            },
            status: 'error',
            message: 'Something went wrong.'
        };

        if(error instanceof Error) {

            return {
                ...errorResponse,
                errors: {
                    _form: error.message
                }
            }

        }

        return errorResponse;

    }
}

async function logOut() {
    
    await deleteSession();
    
}

export {
    login,
    logOut
};