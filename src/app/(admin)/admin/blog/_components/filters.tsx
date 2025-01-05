import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CategoryModel, { ICategory } from "@/models/category-model";
import TagModel, { ITag } from "@/models/tag-model";
import Link from "next/link";

interface FiltersProps {
    currentFilters: {
        status: string | undefined,
        category: string | undefined,
        tags: string | undefined
    }
}

export default async function Filters({ currentFilters } : FiltersProps) {
    const categories: ICategory[] | null = await CategoryModel.find({});
    const tags: ITag[] | null = await TagModel.find({});
    let hasFilters = false;

    Object.entries(currentFilters).forEach(item => {

        if(item[1] !== undefined && item[1] !== 'default') {
            hasFilters = true;
        }

    });
    
    return (
        <form action="#">
            <div className="lg:flex">
                <div className="mb-3 w-full lg:mr-3 lg:w-auto">
                    <Select name="status" defaultValue={currentFilters.status ? currentFilters.status : 'default'}>
                        <SelectTrigger className="w-full lg:w-[120px]">
                            <SelectValue placeholder="Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Status</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {categories &&
                    <div className="mb-3 w-full lg:mr-3 lg:w-auto">
                    <Select name="category" defaultValue={currentFilters.category ? currentFilters.category : 'default'}>
                        <SelectTrigger className="w-full lg:w-[120px]">
                            <SelectValue placeholder="Category"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Category</SelectItem>
                            {categories.map(item => {
                                return (
                                    <SelectItem 
                                        key={(item._id as string).toString()}
                                        value={(item.slug).toString()}>{item.name}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
                }
                {tags &&
                    <div className="mb-3 w-full lg:mr-3 lg:w-auto">
                        <Select name="tags" defaultValue={currentFilters.tags ? currentFilters.tags : 'default'}>
                            <SelectTrigger className="w-full lg:w-[120px]">
                                <SelectValue placeholder="Tag" className="text-ellipsis"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="default">Tag</SelectItem>
                                {tags.map(item => {
                                    const id = item._id as string;

                                    return (
                                        <SelectItem 
                                            key={id.toString()} 
                                            value={item.slug}>{item.name}</SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                }
                
                <div className="flex justify-end pt-5 lg:inline-block lg:pt-0">
                    <Button type="submit" variant="outline">Apply filters</Button>
                    {hasFilters && <Button variant="outline" className="ml-3" asChild><Link href="/admin/blog">Clear Filters</Link></Button>}
                    
                </div>
            </div>
        </form>
    );
}