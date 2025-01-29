'use server'
import z from 'zod';
import cloudinary from '@/lib/cloudinary';
import { isExceededTheFileLimit } from '@/lib/cloudinary';
import CategoryModel, { ICategory } from '@/models/category-model';
import TagModel, { ITag } from '@/models/tag-model';
import BlogModel, { IBlog } from '@/models/blog-model';
import { BlogDocumentData } from './create-blog';
import mongoose from 'mongoose';
import { UploadApiResponse } from 'cloudinary';

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
        featuredImage?: string,
        featuredImageUrl?: string,
        featuredImageId?: string
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
        featuredImageUrl?: string[],
        featuredImageId?: string[],
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
        const featuredImageUrl = formData.get('featuredImageUrl') as string;
        const featuredImageId = formData.get('featuredImageId') as string;
        const blogId = formData.get('blogId') as string;
        const existingBlog = await BlogModel.findOne<IBlog>({ _id: blogId });

        const formSchema = z.object({
            title: z.string().min(1, { message: 'Title is required.' }),
            content: z.string().min(1, { message: 'Content is required.' }),
            slug: z.string().min(1, { message: 'Slug is required.' }),
            status: z.enum(['published', 'draft']),
            category: z.string(),
            tags: z.string(),
            featuredImage: z.string().refine(file => !isExceededTheFileLimit(file), { message: 'Please use image less than 5 MB.' }),
            // featuredImageUrl: z.string().optional(),
            // featuredImageId: z.string().optional(),
            metaTitle: z.string().optional(),
            metaDescription: z.string().optional()
        });


        const result = formSchema.safeParse({
            title,
            slug,
            content,
            status,
            category,
            tags,
            featuredImage,
            // featuredImageUrl,
            // featuredImageId,
            metaTitle,
            metaDescription
        });


        if(!result.success) {

            const currentErrors = result.error.flatten().fieldErrors;

            console.log(currentErrors);
            
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
                    featuredImageUrl,
                    featuredImageId,
                    metaTitle,
                    metaDescription
                },
                message: 'Please make sure all of the fields are valid.',
                errors: currentErrors
            }
        }

        // get the category document to get the id property
        const selectedCategory = await CategoryModel.findOne<ICategory>({ slug: category});

        // get the selected tags document to get the id properties
        const selectedTags = await TagModel.find<ITag>({
            slug: {
                $in: tags.split(',')
            }
        });

        const updatedBlogData: BlogDocumentData = {
            slug,
            title,
            content,
            status,
            category: selectedCategory?._id as mongoose.Types.ObjectId,
            tags: selectedTags ? selectedTags.map(item => item._id) as mongoose.Types.ObjectId[] : [],
            metaTitle,
            metaDescription
        }

        // upload the updated image to cloudinary
         if(featuredImage && featuredImageId) {
        
            // upload image as base64 URI to cloudinary
            // const cloudinaryImage: UploadApiResponse = await cloudinary.uploader.upload(
            //     featuredImage, 
            //     { 
            //         public_id: featuredImageId, 
            //         folder: 'blogbook' 
            //     }
            // ); 

            // updatedBlogData.featuredImage = {
            //     url: cloudinaryImage.secure_url,
            //     id: cloudinaryImage.public_id
            // };
        }

        console.log('updated data: ', updatedBlogData);
        console.log('featured image: ', featuredImage);
        console.log('featured image id: ', featuredImageId);
        console.log('exiting blog: ', existingBlog);

        // const updatedBlog = await BlogModel.findOneAndUpdate(
        //     {
        //        _id: blogId
        //     },
        //     {
        //         $set: updatedBlogData
        //     },
        //     { new: true }
        // );

        return {
            status: 'success',
            message: 'Blog has been updated successfully!!!',
            values: {
                slug,
                title,
                content,
                status,
                category,
                tags,
                featuredImage: '',
                featuredImageUrl,
                featuredImageId,
                metaTitle,
                metaDescription
            },
            errors: {}
        }

    } catch(error: any) {
        console.log(error);
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const content = formData.get('content') as string;
        const metaTitle =  formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const status = formData.get('status') as string;
        const tags = formData.get('tags') as string;
        const category = formData.get('category') as string;
        const featuredImage = formData.get('featuredImage') as string;
        const featuredImageUrl = formData.get('featuredImageUrl') as string;
        const featuredImageId = formData.get('featuredImageId') as string;

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
                featuredImage,
                featuredImageUrl,
                featuredImageId,
            },
            errors: {
                _form: 'Something went wrong.'
            },
        }
    }


};