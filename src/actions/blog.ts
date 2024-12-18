'use server'

import cloudinary from '@/lib/cloudinary';
import { type UploadApiResponse } from 'cloudinary';
import { title } from 'process';
import BlogModel from '@/models/blog-model';
import z from 'zod';

interface CreateBlogFormState {
    message: string,
    status: 'error' | 'success' | 'pending',
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


export default async function createBlog(prevState: CreateBlogFormState, formData: FormData): Promise<CreateBlogFormState> {

    try {

        const acceptedImages = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const megabytes = 1;
        const MAX_FILE_SIZE = megabytes * 1024 * 1024; 
        const formSchema = z.object({
            title: z.string().min(1, { message: 'Title is required.' }),
            content: z.string().min(1, { message: 'Content is required.' }),
            status: z.enum(['published', 'draft']),
            category: z.string(),
            tags: z.string(),
            featuredImage: z.custom<File>((file) => {
                console.log(file.size);
                return file instanceof File && file.size > 0;

            }, { message: 'Featured image is required.' })
            .refine(file => acceptedImages.includes(file.type), { message: 'Please use a valid image file.' })
            .refine(file => file.size < MAX_FILE_SIZE, { message: `Please only upload images less than ${megabytes} MB.` }),
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
            metaTitle: formData.get('metaTitle') as string,
            metaDescription: formData.get('metaDescription') as string
        };

        const result = formSchema.safeParse(data);
        
        if(!result.success) {

            const currentErrors = result.error.flatten().fieldErrors;
            
            console.log({
                title: formData.get('title') as string,
                content: formData.get('content') as string,
                status: formData.get('status') as string,
                category: formData.get('category') as string,
                tags: formData.get('tags') as string,
                featuredImage: formData.get('featured_image') as File,
                metaTitle: formData.get('metaTitle') as string,
                metaDescription: formData.get('metaDescription') as string
            });

            return {
                status: 'error',
                values: {
                    title: formData.get('title') as string,
                    content: formData.get('content') as string,
                    status: formData.get('status') as string,
                    category: formData.get('category') as string,
                    tags: formData.get('tags') as string,
                    featuredImage: formData.get('featured_image') as File,
                    metaTitle: formData.get('metaTitle') as string,
                    metaDescription: formData.get('metaDescription') as string
                },
                message: 'Please make sure all of the fields are valid.',
                errors: currentErrors
            }
        }


        // upload image to cloudinary
        const file = data.featuredImage;
        
        // convert file/blob object into array buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        
        // upload array buffer via upload stream
        const uploadResult: UploadApiResponse = await new Promise((resolve, reject)  => {

            cloudinary.uploader.upload_stream({ folder: 'blogbook' }, (error, uploadResult ) => {
                
                if (error || !uploadResult) {
                    return reject(new Error('Upload failed'));
                }

                return resolve(uploadResult);
                
            }).end(buffer);
        });
        
        // save blog to the database
        const newBlog = new BlogModel({
            ...data,
            category: data.category,
            tags: data.tags,
            featuredImage: uploadResult.public_id
        });

        await newBlog.save();

        console.log(newBlog);

        return {
            status: 'success',
            values: {
                title: '',
                content: '',
                status: 'pending',
                category: '',
                tags: '',
                featuredImage: undefined,
                metaTitle: '',
                metaDescription: '',
            },
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
            metaTitle: formData.get('metaTitle') as string,
            metaDescription: formData.get('metaDescription') as string
        };

        return {
            status: 'error',
            values: {...data},
            errors: {
                _form: 'Something went wrong.'
            },
            message: 'There\'s error sending data.'
        }

    }

}