import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AdminBlogFilters() {
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
                <div className="mb-3 w-full lg:mr-3 lg:w-auto">
                    <Select name="category">
                        <SelectTrigger className="w-full lg:w-[120px]">
                            <SelectValue placeholder="Category"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="category-1">Category 1</SelectItem>
                            <SelectItem value="category-2">Category 2</SelectItem>
                            <SelectItem value="category-3">Category 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-3 w-full lg:mr-3 lg:w-auto">
                    <Select name="tag">
                        <SelectTrigger className="w-full lg:w-[120px]">
                            <SelectValue placeholder="Tag" className="text-ellipsis"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tag-1">Tag 1</SelectItem>
                            <SelectItem value="tag-2">Tag 2</SelectItem>
                            <SelectItem value="tag-3">Tag 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end pt-5 lg:inline-block lg:pt-0">
                    <Button type="submit" variant="outline">Apply filters</Button>
                </div>
            </div>
        </form>
    );
}