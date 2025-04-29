'use server'

import TagModel from '@/models/tag-model';
import z from 'zod';
import { revalidatePath } from 'next/cache';

interface EditTagFormState {
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

export default async function editTag(prevState: EditTagFormState, formData: FormData): Promise<EditTagFormState> {

    try {

        const name = formData.get('name') as string;
        const slug = formData.get('slug') as string;
        const id = formData.get('tagId') as string;

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

        await TagModel.findByIdAndUpdate(id, {
            $set: {
                name,
                slug
            }
        });

        // update data on the front end
        revalidatePath('/admin/blog/tag');
        
        return {
            status: 'success',
            message: 'The tag has been updated successfully!',
            values: {
                name: '',
                slug: ''
            },
            errors: {}
        }

    } catch(error: any) {

        const name: string = formData.get('name') as string;
        const slug: string = formData.get('slug') as string;
        const responseError: EditTagFormState = {
            status: 'error',
            values: {
                name,
                slug,
            },
            errors: {
                _form: error.message,
            },
            message: 'There\'s error sending data.'
        };

        // duplicate slug or name validation error
        if(error.code === 11000) {

            return {
                ...responseError, 
                errors: {
                    _form: 'The tag either name or slug already exist, please use unique name or slug.'
                }
            }
        }

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