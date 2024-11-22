import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateBlogPage() {
    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Create Blog</h1>
            <div>
                <form>
                    <div>
                        <Label 
                            htmlFor="title"
                            className="mb-2 block">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Blog title"/>
                    </div>
                </form>
            </div>
        </div>
    );
}