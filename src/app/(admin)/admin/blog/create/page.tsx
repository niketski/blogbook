import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminCreateBlogForm from "@/components/admin/admin-create-blog-form";

export default function CreateBlogPage() {
    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Create Blog</h1>
            <AdminCreateBlogForm/>
        </div>
    );
}