'use server'

import z from 'zod';
import UserModel from '@/models/user-model';
import bcrypt from 'bcryptjs';

export interface registerState {
    status: 'success' | 'error' | 'idle',
    message: string,
    values: {
        name: string,
        username: string,
        email: string,
        address: string,
        password: string,
        confirmPassword: string,
    },
    errors: {
        name?: string[],
        username?: string[],
        email?: string[],
        address?: string[],
        password?: string[],
        confirmPassword?: string[]
        _form?: string
    }
}

export default async function register(prevState: registerState, formData: FormData): Promise<registerState> {

    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const password = formData.get('password') as string; 
    const confirmPassword = formData.get('confirmPassword') as string;
        
    try {

        const formSchema = z.object({
            name: z.string().trim().min(1, { message: 'Name is required' }).min(3, { message: 'Name must be atleast 3 characters'}),
            username: z.string().min(1, { message: 'Name is required' }).min(3, { message: 'Username must be atleast 3 characters.' }),
            email: z.string().min(1, { message: 'Email is required' }).email({message: 'Invalid email address.'}),
            address: z.string().min(1, { message: 'Invalid address' }),
            password: z.string().min(1, {message: 'Password is required'}).refine(val => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val), {message: 'Please use a strong password'}),
            confirmPassword: z.string().min(1, {message: 'Confirm password is required'}).refine(val => val === password, { message: 'The password don\'t match' }),
        });
        
        const result = formSchema.safeParse({
            name,
            username,
            email,
            address,
            password,
            confirmPassword
        });

        //check if there's an exiting user and throw an error to prevent creating new user
        const existingUser = await UserModel.find({});

        if(existingUser.length) {

            return {
                status: 'error',
                values: {
                    name,
                    username,
                    email,
                    address,
                    password,
                    confirmPassword
                },
                message: '',
                errors: {
                    _form: 'There\'s already existing user, please go to login page.'
                }
            }

        }

        if(!result.success) {
            const currentErrors = result.error.flatten().fieldErrors;

            return {
                status: 'error',
                values: {
                    name,
                    username,
                    email,
                    address,
                    password,
                    confirmPassword
                },
                message: 'Please make sure all of the fields are valid.',
                errors: currentErrors
            }
        }

        // hash password before saving to database
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            username,
            email,
            address,
            password: hashPassword
        });

        await newUser.save();

        return {
            status: 'success',
            message: 'You have registered successfully!',
            values: {
                name: '',
                username: '',
                email: '',
                address: '',
                password: '',
                confirmPassword: ''
            },
            errors: {}
        }

    } catch(error: unknown) {

        if(error instanceof Error) {
            return {
                status: 'error',
                message: 'Something went wrong.',
                values: {
                    name,
                    username,
                    email,
                    address,
                    password,
                    confirmPassword
                },
                errors: {
                    _form: error.message
                }
            }
        }

        return {
            status: 'error',
            message: 'Something went wrong.',
            values: {
                name,
                username,
                email,
                address,
                password,
                confirmPassword
            },
            errors: {
                _form: 'Error in submitting form.'
            }
        }
    }
}