'use server'

import cloudinary from '@/lib/cloudinary';
import { type UploadApiResponse } from 'cloudinary';
import { title } from 'process';
import BlogModel from '@/models/blog-model';
import z from 'zod';
import { isExceededTheFileLimit } from '@/lib/cloudinary';
import { isExceededFileLimit, formatSlug } from '@/lib/utils';
import CategoryModel, { ICategory } from '@/models/category-model';
import TagModel, { ITag } from '@/models/tag-model';

interface CreateBlogFormState {
    message: string,
    status: 'error' | 'success' | 'pending',
    values: {
        title: string,
        content: string,
        status: string,
        category: string,
        tags: string,
        featuredImage: string,
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

        // form data
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const status = formData.get('status') as string;
        const category = formData.get('category') as string;
        const tags = formData.get('tags') as string;
        const featuredImage = formData.get('featuredImage') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;

        // get the category based on category slug
        const currrentCategory = await CategoryModel.findOne<ICategory>({ slug: category});

        // get the tags based on the tags slug
        const currentTags = await TagModel.find<ITag>({
            slug: {
                $in: tags.split(',')
            }
        });

        const acceptedImages = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const megabytes = 1;
        const MAX_FILE_SIZE = megabytes * 1024 * 1024; 
        const formSchema = z.object({
            title: z.string().min(1, { message: 'Title is required.' }),
            content: z.string().min(1, { message: 'Content is required.' }),
            status: z.enum(['published', 'draft']),
            category: z.string(),
            tags: z.string(),
            featuredImage: z.string()
                .refine(file => isExceededTheFileLimit(file), { message: 'Please use image less than 5 MB.' }),
            metaTitle: z.string().optional(),
            metaDescription: z.string().optional()
        });

        console.log({
            title,
            content,
            status,
            category,
            tags,
            featuredImage,
            metaTitle,
            metaDescription
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

        let cloudinaryImage = {};
        
        if(featuredImage) {
            // upload image as base64 URI to cloudinary
            cloudinaryImage = await cloudinary.uploader.upload(featuredImage, { folder: 'blogbook' });
        }

        // create slug 
        const titleSlug = formatSlug(title);
    
        // save blog to the database
        const newBlog = new BlogModel({
            title,
            slug: titleSlug,
            content,
            status,
            category: currrentCategory?._id,
            tags: currentTags?.map(item => item._id),
            featuredImage: {
                url: cloudinaryImage.secure_url,
                id: cloudinaryImage.public_id
            },
            metaTitle,
            metaDescription
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
                featuredImage: '',
                metaTitle: '',
                metaDescription: '',
            },
            message: 'A blog has been created successfully!',
            errors: {}
        }

    } catch(error: any) {

        console.log(error);

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const status = formData.get('status') as string;
        const category = formData.get('category') as string;
        const tags = formData.get('tags') as string;
        const featuredImage = formData.get('featuredImage') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        

        return {
            status: 'error',
            values: {
                title,
                content,
                status,
                category,
                tags,
                featuredImage,
                metaTitle,
                metaDescription
            },
            errors: {
                _form: 'Something went wrong.'
            },
            message: 'There\'s error sending data.'
        }

    }

}