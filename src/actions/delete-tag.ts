'use server'

import dbConnect from "@/lib/db-connect";
import TagModel from "@/models/tag-model";
import { revalidatePath } from "next/cache";

export default async function deleteTag(id: string){

    try {

        await dbConnect();
        
        // delete tag
        await TagModel.findByIdAndDelete(id);

        // update data on the front end
        revalidatePath('/admin/blog/tag');

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