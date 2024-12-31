'use server'

import TagModel from "@/models/tag-model";
import { revalidatePath } from "next/cache";

export default async function deleteTag(id: string){

    try {

        // delete tag
        await TagModel.findByIdAndDelete(id);

        // update data on the front end
        revalidatePath('/admin/blog/tag');

        return true;

    } catch(error: any) {


        return {
            message: error.message
        }

    }


}