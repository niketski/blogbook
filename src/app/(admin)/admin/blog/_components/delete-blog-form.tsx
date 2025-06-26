import { Button } from "@/components/ui/button";
import DeleteBlogAction from "@/actions/delete-blog";

interface DeleteBlogFormProps {
    blogId: string
}

export default function DeleteBlogForm({ blogId } : DeleteBlogFormProps) {
   
    return (
        <form action={DeleteBlogAction} className="mr-3">
            <input type="text" name="blogId" defaultValue={blogId} className="hidden"/>
            <Button type="submit" variant="destructive">Yes</Button>
        </form>
    );
}