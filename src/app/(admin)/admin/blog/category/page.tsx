'use client'

import CategoryModel from "@/models/category-model";
import { Button } from "@/components/ui/button";
import { Plus, Ellipsis } from "lucide-react";
import AdminCreateCategoryForm from "@/components/admin/admin-create-category-form";
import { ICategory } from "@/models/category-model";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

export default function BlogCategoryPage() {
    const categories: any[] = [];

    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Category</h1>

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
                                        .format(new Date(data.createdAt.toISOString()));
                                        
                                    return (
                                        <TableRow key={data._id}>
                                            <TableCell><span className="font-bold">{data.name}</span></TableCell>
                                            <TableCell>{data.slug}</TableCell>
                                            <TableCell>{date}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="link"><Ellipsis/></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Button 
                                                                variant="ghost" 
                                                                className="px-0 block w-full hover:no-underline justify-start cursor-pointer text-left"
                                                                type="submit">Edit</Button>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {/* <TableRow>
                                    <TableCell><span className="font-bold">Category 1</span></TableCell>
                                    <TableCell>category-1</TableCell>
                                    <TableCell>11/11/2024</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="link"><Ellipsis/></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><span className="font-bold">Category 2</span></TableCell>
                                    <TableCell>category-2</TableCell>
                                    <TableCell>11/11/2024</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="link"><Ellipsis/></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><span className="font-bold">Category 3</span></TableCell>
                                    <TableCell>category-3</TableCell>
                                    <TableCell>11/11/2024</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="link"><Ellipsis/></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </div>
                }
            </div>
        </div>
    );
}