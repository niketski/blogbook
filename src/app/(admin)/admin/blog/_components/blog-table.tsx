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
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { ICategory } from "@/models/category-model";
import { ITag } from "@/models/tag-model";
import { IBlog } from "@/models/blog-model";
import Link from "next/link";

interface BlogTableProps {
    data: BlogResult[]
}

export interface BlogResult extends IBlog {
    categoryData: ICategory[],
    tagsData: ITag[]

}

const TableHeading = [
    'Title',
    'Category',
    'Tag',
    'Date',
    'Status',
];

export default async function BlogTable({ data } : BlogTableProps) {
    return (
        <Table className="min-w-[800px]">
            <TableHeader>
                <TableRow>
                    {TableHeading.map((heading, index) => {
                        return (
                            <TableHead key={index}>{heading}</TableHead>
                        )
                    })}
                    <TableHead>
                        <span className="sr-only">Action Column</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(item => {
                    const id = (item._id as string).toString();
                    const category = item.categoryData[0] as unknown as ICategory;
                    const tags = item.tagsData as unknown as ITag[];
                    const date = new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })
                        .format(new Date(item.createdAt.toString()));

                    return (
                        <TableRow key={id}>
                            <TableCell>
                                <span className="font-bold">
                                    <Link href={`/admin/blog/${item._id}`}>{item.title}</Link>
                                </span>
                            </TableCell>
                            <TableCell>{category ? category.name : 'Uncategorized'}</TableCell>
                            <TableCell>
                                {tags && 
                                    (tags.map(item => item.name)).join(', ')
                                }
                            </TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell>{item.status}</TableCell>
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
                    );
                })}
                
            </TableBody>
        </Table>
    );
}