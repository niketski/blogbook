'use server'
import z from 'zod';
import cloudinaryHelper from '@/classes/cloudinary-helper';
import CategoryModel, { ICategory } from '@/models/category-model';
import TagModel, { ITag } from '@/models/tag-model';
import BlogModel, { IBlog } from '@/models/blog-model';
import { BlogDocumentData } from './create-blog';
import mongoose, { UpdateQuery } from 'mongoose';
import { UploadApiResponse } from 'cloudinary';
import dbConnect from '@/lib/db-connect';

export interface EditBlogFormState {
    status: 'error' | 'success' | 'idle',
    message: string,
    values: {
        title: string,
        excerpt: string,
        slug: string,
        content: string,
        metaTitle: string,
        metaDescription: string,
        status: string,
        tags: string,
        category?: string,
        featuredImage?: string,
        featuredImageUrl?: string,
        featuredImageId?: string
    },
    errors: {
        title?: string[],
        excerpt?: string[],
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

        await dbConnect();
        
        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
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
            excerpt: z.string().optional(),
            content: z.string().min(1, { message: 'Content is required.' }),
            slug: z.string().min(1, { message: 'Slug is required.' }),
            status: z.enum(['published', 'draft']),
            category: z.string(),
            tags: z.string(),
            featuredImage: z.string().refine(file => !cloudinaryHelper.isExceededTheFileLimit(file), { message: 'Please use image less than 5 MB.' }),
            metaTitle: z.string().optional(),
            metaDescription: z.string().optional()
        });


        const result = formSchema.safeParse({
            title,
            excerpt,
            slug,
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

            console.log(currentErrors);
            
            return {
                status: 'error',
                values: {
                    slug,
                    title,
                    excerpt,
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
            excerpt,
            content,
            status,
            category: selectedCategory?._id as mongoose.Types.ObjectId,
            tags: selectedTags ? selectedTags.map(item => item._id) as mongoose.Types.ObjectId[] : [],
            metaTitle,
            metaDescription
        }

        let isImageRemoved = false;

        if(existingBlog && existingBlog.featuredImage) {

            // update image if there's existing image and the user uploaded a new image
            if(featuredImage) {

                const updatedImage: UploadApiResponse = await cloudinaryHelper.update(featuredImage, featuredImageId);

                updatedBlogData.featuredImage = {
                    id: updatedImage.public_id,
                    url: updatedImage.secure_url
                };

            } else {

                // remove image if the user doesn't upload a new image and there's an existing image on the database
                await cloudinaryHelper.remove(featuredImageId);

                isImageRemoved = true;

                updatedBlogData.featuredImage = undefined;

            }

        } else if(featuredImage) {

            // add and upload image if there's no existing image
            const uploadedImage: UploadApiResponse = await cloudinaryHelper.add(featuredImage);

            updatedBlogData.featuredImage = {
                id: uploadedImage.public_id,
                url: uploadedImage.secure_url
            };
            
        }

        const query: UpdateQuery<IBlog> = {
            $set: updatedBlogData
        };
        
        if(isImageRemoved) {

            query['$unset'] = {
                featuredImage: 1
            };
        }

        await BlogModel.findOneAndUpdate(
            {
               _id: blogId
            },
            query,
            { new: true }
        );

        return {
            status: 'success',
            message: 'Blog has been updated successfully!!!',
            values: {
                slug: updatedBlogData.slug,
                title: updatedBlogData.title,
                excerpt: updatedBlogData.excerpt,
                content: updatedBlogData.content,
                status: updatedBlogData.status,
                category: category,
                tags: tags,
                featuredImage: '',
                featuredImageUrl: updatedBlogData.featuredImage ? updatedBlogData.featuredImage.url : '',
                featuredImageId: updatedBlogData.featuredImage ? updatedBlogData.featuredImage.id : '',
                metaTitle,
                metaDescription
            },
            errors: {}
        }

    } catch(error: unknown) {
        
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const excerpt = formData.get('excerpt') as string;
        const content = formData.get('content') as string;
        const metaTitle =  formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const status = formData.get('status') as string;
        const tags = formData.get('tags') as string;
        const category = formData.get('category') as string;
        const featuredImage = formData.get('featuredImage') as string;
        const featuredImageUrl = formData.get('featuredImageUrl') as string;
        const featuredImageId = formData.get('featuredImageId') as string;
        const errorResponse: EditBlogFormState = {
            status: 'error',
            message: 'There\'s error sending data.',
            values: {
                title,
                slug,
                excerpt,
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

        if(error instanceof Error) {

            return  {
                ...errorResponse,
                message: error.message
            }
        }

        return  errorResponse;
    }


};