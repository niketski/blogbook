'use server'

import z from 'zod';
import TagModel from '@/models/tag-model';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db-connect';

interface CreateTagFormState {
    message: string,
    status: 'error' | 'success' | 'pending',
    values: {
        name: string,
        slug: string
    },
    errors: {
        name?: string[],
        slug?: string[],
        _form?: string,
    }
}

export default async function createTag(prevState: CreateTagFormState, formData: FormData ): Promise<CreateTagFormState> {

    try {

        await dbConnect();

        const name: string = formData.get('name') as string;
        const slug: string = formData.get('slug') as string;
        const formSchema = z.object({
            name: z.string().min(1, { message: 'Name is required.' }),
            slug: z.string().min(1, { message: 'Slug is required.' }).refine(slug => /^[a-zA-Z0-9_-]*$/.test(slug), { message: 'Please don\'t include space or special characters.' })
        });

        const result = formSchema.safeParse({
            name,
            slug
        });


        if(!result.success) {

            const currentErrors = result.error.flatten().fieldErrors;

            return {
                status: 'error',
                message: 'Please make sure all fields are valid.',
                errors: currentErrors,
                values: {
                    name,
                    slug,
                },
            }
        }

        const newTag = new TagModel({
            name,
            slug,
        });

        await newTag.save();

        revalidatePath('/admin/blog/tag');

        return {
            message: 'Tag has been created successfully!',
            status: 'success',
            values: {
                name: '',
                slug: '',
            },
            errors: {}
        }

    } catch(error: unknown) {

        const name: string = formData.get('name') as string;
        const slug: string = formData.get('slug') as string;
        const responseError: CreateTagFormState = {
            status: 'error',
            values: {
                name,
                slug,
            },
            errors: {
                _form: error instanceof Error ? error.message : 'Something went wrong.',
            },
            message: 'There\'s error sending data.'
        };

        if(error instanceof mongoose.mongo.MongoServerError) {
            // duplicate slug or name validation error
            if(error.code === 11000) {

                return {
                    ...responseError, 
                    errors: {
                        _form: 'The tag either name or slug already exist, please use unique name or slug.'
                    }
                }
            }
        }

        if(error instanceof Error) {

             return {
                status: 'error',
                values: {
                    name,
                    slug,
                },
                errors: {
                    _form: error.message,
                },
                message: 'There\'s error sending data.'
            }

        }
        

        return responseError;
    }
}