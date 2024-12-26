'use server'

import z from 'zod';
import CategoryModel from '@/models/category-model';

interface CreateCategoryFormState {
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

export default async function createCategory(prevState: CreateCategoryFormState, formData: FormData ): Promise<CreateCategoryFormState> {

    try {

        const name: string = formData.get('name') as string;
        const slug: string = formData.get('slug') as string;
        const formSchema = z.object({
            name: z.string().min(1, { message: 'Name is required.' }),
            slug: z.string().min(1, { message: 'Slug is required.' }).refine(slug => /^[a-zA-Z0-9_-]*$/.test(slug), { message: 'Please don\'t include special characters.' })
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

        const newCategory = new CategoryModel({
            name,
            slug,
        });

        await newCategory.save();

        console.log(newCategory);

        return {
            message: 'Category has been created successfully!',
            status: 'success',
            values: {
                name: '',
                slug: '',
            },
            errors: {}
        }

    } catch(error: any) {

        const name: string = formData.get('name') as string;
        const slug: string = formData.get('slug') as string;

        console.log(error.message);

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
}