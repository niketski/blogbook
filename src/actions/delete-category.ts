'use server'

import dbConnect from "@/lib/db-connect";
import CategoryModel from "@/models/category-model"
import { revalidatePath } from "next/cache";

export default async function deleteCategory(id: string){

    try {

        await dbConnect();
        
        // delete category
        await CategoryModel.findByIdAndDelete(id);

        // update data on the front end
        revalidatePath('/admin/blog/category');

        return true;

    } catch(error: unknown) {

        if(error instanceof Error) {

            return {
                message: error.message
            }

        }
        
        return {
            message: 'Something went wrong.'
        }

    }


}