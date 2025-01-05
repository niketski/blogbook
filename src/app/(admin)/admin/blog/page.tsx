import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Ellipsis, Plus } from 'lucide-react';
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { 
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
 } from "@/components/ui/pagination";
 import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
  import AdminBlogFilters from "@/components/admin/admin-blog-filters";
  import { SlidersHorizontal } from 'lucide-react';
import BlogModel, { IBlog } from "@/models/blog-model";
import { ICategory } from "@/models/category-model";
import { ITag } from "@/models/tag-model";
import { PipelineStage } from "mongoose";

interface BlogsPageProps {
    searchParams: {
        [key: string] : string | undefined
    }
}

interface QueryParams {
    [key: string]: string | object | undefined
}

interface IBlogResult extends IBlog {
    categoryData: ICategory[],
    tagsData: ITag[]
}

export default async function BlogsPage({ searchParams } : BlogsPageProps) {
    const search = await searchParams;
    const query: QueryParams = {};

    for(let key in search) {
        

        if(search[key] !== undefined && search[key] !== '' && search[key] !== 'default') {

            if(key === 'category') {

                query['categoryData'] = {
                    $elemMatch: { slug: search[key] }
                }
            
            } else if(key === 'tags') {

                query['tagsData'] = {
                    $elemMatch: { slug: search[key] }
                }
            
            } else if(key === 'search') {

                query['title'] = {
                    $regex: search[key],
                    $options: 'i'
                }

            }else {

                query[key] = search[key]

            }

        }
    }

    const aggregateQuery: PipelineStage[] = [
        // left join categories data
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categoryData'
            }
        },
        // left join tags data
        {
            $lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: 'tagsData'
            }
        }
    ];

    // if it has filters include the filters to the pipeline stage
    if(Object.keys(query).length) {

        aggregateQuery.push({ $match: query });

    } 

    // apply aggragation if there's no search query
    const blogs: IBlogResult[] | null = await BlogModel.aggregate(aggregateQuery);

    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Blogs</h1>
            <Link className={buttonVariants()} href="/admin/blog/create"><Plus/> Create Blog</Link>
            <div className="max-w-[350px] lg:ml-auto mb-7 lg:mb-0">
                <form>
                    <div className="flex items-center"> 
                        <Input
                            placeholder="Search by keyword"
                            name="search"
                            id="search"
                            defaultValue={
                                search['search'] ? search['search'] : ''
                            }/>
                        <Button 
                            variant="outline"
                            className="ml-3"
                            type="submit">Search</Button>
                    </div>
                </form>
            </div>
            <div className="pt-[30px] mb-[60px] hidden lg:block">
                <AdminBlogFilters currentFilters={{
                    status: search['status'],
                    category: search['category'],
                    tags: search['tags']
                }}/>
            </div>
            <div className="lg:hidden mb-7 flex justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <SlidersHorizontal/> Filters
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[calc(100%-30px)]">
                        <DialogHeader className="mb-7">
                            <DialogTitle>Filters</DialogTitle>
                        </DialogHeader>
                        <div>
                            <AdminBlogFilters currentFilters={{
                                 status: search['status'],
                                 category: search['category'],
                                 tags: search['tags']
                            }}/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <div className="w-full overflow-auto">
                    {blogs &&
                        <Table className="min-w-[800px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Tag</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Action Column</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.map(item => {
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
                                            <TableCell><span className="font-bold">{item.title}</span></TableCell>
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
                    }
                </div>
                <Pagination className="justify-start mt-9">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#"/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#"/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}