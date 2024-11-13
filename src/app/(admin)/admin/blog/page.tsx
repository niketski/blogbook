import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Ellipsis, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export default async function BlogsPage() {

    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Blogs</h1>
            <Button className="mb-5 font-bold"><Plus/> Create Blog</Button>
            <div className="max-w-[350px] ml-auto">
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
            <div className="pt-[30px] mb-[60px]">
                <form action="#">
                    <div className="flex ">
                        <div className="mr-3">
                            <Select name="status">
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mr-3">
                            <Select name="category">
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="category-1">Category 1</SelectItem>
                                    <SelectItem value="category-2">Category 2</SelectItem>
                                    <SelectItem value="category-3">Category 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mr-3">
                            <Select name="tag">
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Tag" className="text-ellipsis"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tag-1">Tag 1</SelectItem>
                                    <SelectItem value="tag-2">Tag 2</SelectItem>
                                    <SelectItem value="tag-3">Tag 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" variant="outline">Apply filters</Button>
                    </div>
                </form>
            </div>
            <div>
                <div className="w-full overflow-auto">
                    <Table className="min-w-[800px] lg:min-w-full">
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
                            <TableRow>
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