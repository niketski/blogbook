'use server'

import CategoryModel from '@/models/category-model';
import z from 'zod';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db-connect';

interface EditCategoryFormState {
    status: 'error' | 'success' | 'idle',
    message: string,
    values: {
        name: string,
        slug: string
    },
    errors:  {
        name?: string[],
        slug?: string[],
        _form?: string
    }
}

export default async function editCategory(prevState: EditCategoryFormState, formData: FormData): Promise<EditCategoryFormState> {

    try {

        await dbConnect();

        const name = formData.get('name') as string;
        const slug = formData.get('slug') as string;
        const id = formData.get('categoryId') as string;

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

        await CategoryModel.findByIdAndUpdate(id, {
            $set: {
                name,
                slug
            }
        });

        // update data on the front end
        revalidatePath('/admin/blog/category');
        
        return {
            status: 'success',
            message: 'The category has been updated successfully!',
            values: {
                name: '',
                slug: ''
            },
            errors: {}
        }

    } catch(error: unknown) {

        const name: string = formData.get('name') as string;
        const slug: string = formData.get('slug') as string;
        const responseError: EditCategoryFormState = {
            status: 'error',
            values: {
                name,
                slug,
            },
            errors: {
                _form: 'Something went wrong.',
            },
            message: 'There\'s error sending data.'
        };

        if(error instanceof mongoose.mongo.MongoServerError) {
            // duplicate slug or name validation error
            if(error.code === 11000) {

                return {
                    ...responseError, 
                    errors: {
                        _form: 'The category either name or slug already exist, please use unique name or slug.'
                    }
                }
            }
        }

        if(error instanceof Error) {

            return {
                ...responseError,
                message: error.message
            }
        }
        

        return responseError;
    }
}