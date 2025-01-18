import AdminCreateBlogForm from "@/components/admin/admin-create-blog-form";
import CategoryModel, { ICategory } from "@/models/category-model";
import TagModel from "@/models/tag-model";

export default async function CreateBlogPage() {
    const categories: null | ICategory[] = await CategoryModel.find({});
    const tags = await TagModel.find({});

    // format categories as select options
    const formattedCategories = categories?.map(category => {
        return {
            value: category.slug,
            label: category.name as string
        }
    });

    // format tags as tag options
    const formattedTags = tags?.map(tag => {
        return {
            value: tag.slug,
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