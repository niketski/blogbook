'use server'

import { title } from 'process';
import z from 'zod';

interface CreateBlogFormState {
    message: string,
    values: {
        title: string,
        content: string,
        status: string,
        category: string,
        tags: string,
        featuredImage: File | undefined,
        metaTitle: string,
        metaDescription: string,
    },
    errors: {
        title?: string[],
        content?: string[],
        status?: string[],
        category?: string[],
        tags?: string[],
        featuredImage?: string[],
        metaTitle?: string[],
        metaDescription?: string[],
        _form?: string
    }
}

interface InputFile {
    size: number,
    type: string,
    name: string,
    lastModified: number
}

export default async function createBlog(prevState: CreateBlogFormState, formData: FormData): Promise<CreateBlogFormState> {

    try {

        const acceptedImages = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const formSchema = z.object({
            title: z.string().min(1, { message: 'Title is required.' }),
            content: z.string().min(1, { message: 'Content is required.' }),
            status: z.enum(['published', 'draft']),
            category: z.string(),
            tags: z.string(),
            featuredImage: z.custom<File>((file) => file instanceof File && file.size > 0, { message: 'Featured image is required.' })
                .refine(file => acceptedImages.includes(file.type), { message: 'Please use a valid image file.' }),
            metaTitle: z.string().optional(),
            metaDescription: z.string().optional()
        });
        
        const data = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            status: formData.get('status') as string,
            category: formData.get('category') as string,
            tags: formData.get('tags') as string,
            featuredImage: formData.get('featured_image') as File,
            metaTitle: formData.get('meta_title') as string,
            metaDescription: formData.get('meta_description') as string
        };

        const result = formSchema.safeParse(data);

        if(!result.success) {

            const currentErrors = result.error.flatten().fieldErrors;
            console.log(currentErrors);
            return {
                values: {...data},
                message: 'Please make sure all of the fields are valid.',
                errors: currentErrors
            }
        }
        

        return {
            values: {...data},
            message: 'A blog has been created successfully!',
            errors: {}
        }

    } catch(error: any) {

        console.log(error);

        const data = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            status: formData.get('status') as string,
            category: formData.get('category') as string,
            tags: formData.get('tags') as string,
            featuredImage: formData.get('featured_image') as File,
            metaTitle: formData.get('meta_title') as string,
            metaDescription: formData.get('meta_description') as string
        };

        return {
            values: {...data},
            errors: {
                _form: 'Something went wrong.'
            },
            message: 'There\'s error sending data.'
        }

    }

}