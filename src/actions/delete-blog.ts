'use server'

import BlogModel from "@/models/blog-model";
import { revalidatePath } from "next/cache";

export default async function DeleteBlog(id: string){
    
    try {

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