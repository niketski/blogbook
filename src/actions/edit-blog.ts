'use server'
import z from 'zod';
import cloudinary from '@/lib/cloudinary';
import { isExceededTheFileLimit } from '@/lib/cloudinary';

export interface EditBlogFormState {
    status: 'error' | 'success' | 'idle',
    message: string,
    values: {
        title: string,
        slug: string,
        content: string,
        metaTitle: string,
        metaDescription: string,
        status: string,
        tags: string,
        category: string,
        featuredImage: string,
    },
    errors: {
        title?: string[],
        slug?: string[],
        content?: string[],
        metaTitle?: string[],
        metaDescription?: string[],
        status?: string[],
        tags?: string[],
        category?: string[],
        featuredImage?: string[],
        _form?: string
    }
}

export default async function EditBlog(prevState: EditBlogFormState, formData: FormData): Promise<EditBlogFormState> {

    try {

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const content = formData.get('content') as string;
        const metaTitle =  formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const status = formData.get('status') as string;
        const tags = formData.get('tags') as string;
        const category = formData.get('category') as string;
        const featuredImage = formData.get('featuredImage') as string;
        const megabytes = 1;
        const MAX_FILE_SIZE = megabytes * 1024 * 1024; 

        const formSchema = z.object({
            title: z.string().min(1, { message: 'Title is required.' }),
            content: z.string().min(1, { message: 'Content is required.' }),
            slug: z.string().min(1, { message: 'Slug is required.' }),
            status: z.enum(['published', 'draft']),
            category: z.string(),
            tags: z.string(),
            featuredImage: z.string()
                            .refine(file => isExceededTheFileLimit(file), { message: 'Please use image less than 5 MB.' }),
            metaTitle: z.string().optional(),
            metaDescription: z.string().optional()
        });

        const result = formSchema.safeParse({
            title,
            content,
            status,
            category,
            tags,
            featuredImage,
            metaTitle,
            metaDescription
        });


        if(!result.success) {

            const currentErrors = result.error.flatten().fieldErrors;
            
            return {
                status: 'error',
                values: {
                    slug,
                    title,
                    content,
                    status,
                    category,
                    tags,
                    featuredImage,
                    metaTitle,
                    metaDescription
                },
                message: 'Please make sure all of the fields are valid.',
                errors: currentErrors
            }
        }
        
        console.log('result: ' + result);
        console.log(result.success);
        console.log({title,
            slug,
            content,
            metaTitle,
            metaDescription,
            status,
            tags,
            category,
            featuredImage});

        return {
            status: 'success',
            message: 'Blog has been updated successfully!',
            values: {
                title: '',
                slug: '',
                content: '',
                metaTitle: '',
                metaDescription: '',
                status: 'draft',
                tags: '',
                category: '',
                featuredImage: '',
            },
            errors: {}
        }

    } catch(error: any) {

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const content = formData.get('content') as string;
        const metaTitle =  formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const status = formData.get('status') as string;
        const tags = formData.get('tags') as string;
        const category = formData.get('category') as string;
        const featuredImage = formData.get('featuredImage') as string;

        return  {
            status: 'error',
            message: 'There\'s error sending data.',
            values: {
                title,
                slug,
                content,
                metaTitle,
                metaDescription,
                status,
                tags,
                category,
                featuredImage
            },
            errors: {
                _form: 'Something went wrong.'
            },
        }
    }


};