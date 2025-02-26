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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

interface BlogTableRowProps {
    id: string,
    title: string,
    category: string,
    tags: string,
    date: string,
    status: string,
}

export default function BlogTableRow({ 
    id,
    title,
    category,
    tags,
    date,
    status
 } : BlogTableRowProps) {
    return (
        <TableRow key={id}>
            <TableCell>
                <span className="font-bold">
                    <Link href={`/admin/blog/${id}`}>{title}</Link>
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
                            <Link href={`/admin/blog/${id}`} className="cursor-pointer">Edit</Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem asChild>
                            <Link href={`/admin/blog/${id}/remove`}>Delete</Link>
                        </DropdownMenuItem> */}
                        {/* <DeleteBlogModal 
                            blogId={id}
                            blogTitle={item.title}/> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}