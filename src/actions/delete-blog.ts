'use server'

import cloudinaryHelper from "@/classes/cloudinary-helper";
import dbConnect from "@/lib/db-connect";
import BlogModel, { IBlog } from "@/models/blog-model";
import { revalidatePath } from "next/cache";

export default async function DeleteBlogAction(data: FormData){
    
    try {

        await dbConnect();
        
        const id = data.get('blogId') as string;
        const currentBlog = await BlogModel.findById<IBlog>(id);

        // delete featured image from cloudinary
        if(currentBlog && currentBlog.featuredImage) {
            const featuredImageId = currentBlog.featuredImage.id;
            
            await cloudinaryHelper.remove(featuredImageId);
        }
        
        // delete blog
        await BlogModel.findByIdAndDelete(id);

        // refresh blogs data on front end
        revalidatePath('/admin/blog');

        
    } catch(error: unknown) {

        if(error instanceof Error) {

            console.log(error.message);

        }
    }
}

export const deleteBlog = async (id: string) => {

 try {

        await dbConnect();

        const currentBlog = await BlogModel.findById<IBlog>(id);

        // delete featured image from cloudinary
        if(currentBlog && currentBlog.featuredImage) {
            const featuredImageId = currentBlog.featuredImage.id;
            
            await cloudinaryHelper.remove(featuredImageId);
        }
        
        // delete blog
        await BlogModel.findByIdAndDelete(id);

        // refresh blogs data on front end
        revalidatePath('/admin/blog');

        
    } catch(error: unknown) {

        if(error instanceof Error) {

            console.log(error.message);

        }
    }
};