'use server'

import CategoryModel from "@/models/category-model"
import { revalidatePath } from "next/cache";

export default async function deleteCategory(id: string){

    try {

        // delete category
        await CategoryModel.findByIdAndDelete(id);

        // update data on the front end
        revalidatePath('/admin/blog/category');

        return true;

    } catch(error: any) {


        return {
            message: error.message
        }

    }


}