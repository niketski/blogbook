import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ICategory } from "@/models/category-model";
import { ITag } from "@/models/tag-model";
import { IBlog } from "@/models/blog-model";
import BlogTableRow from "./blog-table-row";

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
                        <BlogTableRow
                            key={id}
                            id={id}
                            title={item.title}
                            category={category ? category.name : 'Uncategorized'}
                            tags={ tags ? (tags.map(item => item.name)).join(', ') : '' }
                            date={date}
                            status={item.status}/>
                    );
                })}
                
            </TableBody>
        </Table>
    );
}