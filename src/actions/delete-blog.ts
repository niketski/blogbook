'use server'

import cloudinaryHelper from "@/classes/cloudinary-helper";
import BlogModel, { IBlog } from "@/models/blog-model";
import { revalidatePath } from "next/cache";

export default async function DeleteBlog(id: string){
    
    try {

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