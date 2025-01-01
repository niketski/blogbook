import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CategoryModel, { ICategory } from "@/models/category-model";
import TagModel, { ITag } from "@/models/tag-model";

export default async function AdminBlogFilters() {
    const categories: ICategory[] | null = await CategoryModel.find({});
    const tags: ITag[] | null = await TagModel.find({});


    return (
        <form action="#">
            <div className="lg:flex">
                <div className="mb-3 w-full lg:mr-3 lg:w-auto">
                    <Select name="status">
                        <SelectTrigger className="w-full lg:w-[120px]">
                            <SelectValue placeholder="Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {categories &&
                    <div className="mb-3 w-full lg:mr-3 lg:w-auto">
                    <Select name="category">
                        <SelectTrigger className="w-full lg:w-[120px]">
                            <SelectValue placeholder="Category"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="uncategorized">Uncategorized</SelectItem>
                            {categories.map(item => {
                                return (
                                    <SelectItem 
                                        key={(item._id as string).toString()}
                                        value={(item._id as string).toString()}>{item.name}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
                }
                {tags &&
                    <div className="mb-3 w-full lg:mr-3 lg:w-auto">
                        <Select name="tag">
                            <SelectTrigger className="w-full lg:w-[120px]">
                                <SelectValue placeholder="Tag" className="text-ellipsis"/>
                            </SelectTrigger>
                            <SelectContent>

                                {tags.map(item => {
                                    const id = item._id as string;

                                    return (
                                        <SelectItem 
                                            key={id.toString()} 
                                            value={id.toString()}>{item.name}</SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                }
                
                <div className="flex justify-end pt-5 lg:inline-block lg:pt-0">
                    <Button type="submit" variant="outline">Apply filters</Button>
                </div>
            </div>
        </form>
    );
}