import CategoryModel from "@/models/category-model";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdminCreateCategoryForm from "@/components/admin/admin-create-category-form";
import CategoryTableRow from "./_components/category-table-row";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import dbConnect from "@/lib/db-connect";

  

export default async function BlogCategoryPage() {
    await dbConnect();
    
    const categories = await CategoryModel.find({});

    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Categories</h1>

            {/* create category form */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button><Plus/> Create Category</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Category</DialogTitle>
                        <DialogDescription>
                            Create a new blog category.
                        </DialogDescription>
                        <div className="pt-4">
                            <AdminCreateCategoryForm/>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* category table */}
            <div className="pt-[60px]">
                {categories &&

                    <div className="w-full overflow-auto">
                        <Table className="min-w-[800px]">
                            <TableHeader> 
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Action Column</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map(data => {
                                    const date = new Intl.DateTimeFormat('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })
                                        .format(new Date(data.createdAt.toString()));
                                        
                                    return (
                                        
                                        <CategoryTableRow
                                            key={data._id.toString()}
                                            id={data._id.toString()}
                                            name={data.name}
                                            slug={data.slug}
                                            date={date}/>

                                    ); 
                                })}
                            </TableBody>
                        </Table>
                    </div>
                }
            </div>
        </div>
    );
}