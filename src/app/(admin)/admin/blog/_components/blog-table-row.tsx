'use client'

import { TableRow, TableCell } from "@/components/ui/table";
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
    DialogHeader,
    DialogTitle,
    DialogDescription
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { deleteBlog } from "@/actions/delete-blog";
import { useToast } from "@/hooks/use-toast";

interface BlogTableRowProps {
    id: string,
    title: string,
    category: string,
    tags: string,
    date: string,
    status: string,
    slug: string
}

export default function BlogTableRow({ 
    id,
    title,
    category,
    tags,
    date,
    status,
    slug
 } : BlogTableRowProps) {
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const { toast } = useToast();

    const handleDeleteBlog = async () => {

        await deleteBlog(id);

        setIsDeleteModalActive(false);

        toast({
            title: 'Success',
            description: 'The blog has been deleted successfully!'
        });

    };

    return (
        <TableRow>
            <TableCell>
                <span className="font-bold">
                    <Link href={`/admin/blog/${slug}`}>{title}</Link>
                </span>
            </TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>
                {tags}
            </TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="link"><Ellipsis/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/${slug}`} className="cursor-pointer" target="_blank">View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/blog/${slug}`} className="cursor-pointer">Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="#" className="cursor-pointer" onClick={(e) => { e.preventDefault(); setIsDeleteModalActive(true)  }}>Delete</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>

                    {/* Delete form modal */}
                    <Dialog open={isDeleteModalActive} onOpenChange={setIsDeleteModalActive}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="mb-5 leading-6">Delete &quot;{title}&quot;?</DialogTitle>
                                <DialogDescription>Are you sure you want to delete this blog?</DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end">
                                <Button type="button" variant="destructive" onClick={() => { handleDeleteBlog(); }} className="mr-3">Yes</Button>
                                <Button variant={'outline'} onClick={() => { setIsDeleteModalActive(false) }}>No</Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                </DropdownMenu>

            </TableCell>
        </TableRow>
    );
}