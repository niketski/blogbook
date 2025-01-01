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

export default async function BlogsPage() {
    const blogs: IBlog[] | null = await BlogModel.find({});

    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Blogs</h1>
            <Link className={buttonVariants()} href="/admin/blog/create"><Plus/> Create Blog</Link>
            <div className="max-w-[350px] lg:ml-auto mb-7 lg:mb-0">
                <form>
                    <div className="flex items-center">
                        <Label htmlFor="search" className="hidden">Seach by keyword</Label>
                        <Input
                            placeholder="Search by keyword"
                            id="search"/>
                        <Button 
                            variant="outline"
                            className="ml-3"
                            type="submit">Search</Button>
                    </div>
                </form>
            </div>
            <div className="pt-[30px] mb-[60px] hidden lg:block">
                <AdminBlogFilters/>
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
                            <AdminBlogFilters/>
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
                                    <TableHead>
                                        <span className="sr-only">Action Column</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.map(item => {
                                    const id = (item._id as string).toString();

                                    return (
                                        <TableRow key={id}>
                                            <TableCell><span className="font-bold">Sample Blog</span></TableCell>
                                            <TableCell>Category 1</TableCell>
                                            <TableCell>tag 1</TableCell>
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
                                    );
                                })}
                                
                                <TableRow>
                                    <TableCell><span className="font-bold">Sample Blog 2</span></TableCell>
                                    <TableCell>Category 2</TableCell>
                                    <TableCell>tag 2</TableCell>
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
                                    <TableCell><span className="font-bold">Sample Blog 3</span></TableCell>
                                    <TableCell>Category 3</TableCell>
                                    <TableCell>tag 3</TableCell>
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