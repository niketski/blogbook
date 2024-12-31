import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminCreateBlogForm from "@/components/admin/admin-create-blog-form";
import CategoryModel, { ICategory } from "@/models/category-model";
import TagModel from "@/models/tag-model";

export default async function CreateBlogPage() {
    const categories: null | ICategory[] = await CategoryModel.find({});
    const tags = await TagModel.find({});

    // format categories as select options
    const formattedCategories = categories?.map(category => {
        const id = (category._id as string).toString();

        return {
            value: id,
            label: category.name as string
        }
    });

    // format tags as tag options
    const formattedTags = tags?.map(tag => {
        const id = (tag._id as string).toString();

        return {
            value: id,
            label: tag.name as string
        }
    });
     
    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Create Blog</h1>
            <AdminCreateBlogForm
                categoriesOptions={formattedCategories}
                tagsOptions={formattedTags}/>
        </div>
    );
}