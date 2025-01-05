import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import Link from "next/link";
import { 
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { SlidersHorizontal } from 'lucide-react';
import BlogModel, { IBlog } from "@/models/blog-model";
import { ICategory } from "@/models/category-model";
import { ITag } from "@/models/tag-model";
import { PipelineStage } from "mongoose";
import SearchForm from "./_components/search-form";
import Filters from "./_components/filters";
import BlogTable from "./_components/blog-table";

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
    
    const blogs: IBlogResult[] | null = await BlogModel.aggregate(aggregateQuery);

    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Blogs</h1>
            <Link className={buttonVariants()} href="/admin/blog/create"><Plus/> Create Blog</Link>
            <div className="max-w-[350px] lg:ml-auto mb-7 lg:mb-0">

                <SearchForm search={search['search']}/>

            </div>
            <div className="pt-[30px] mb-[60px] hidden lg:block">

                <Filters currentFilters={{
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

                            <Filters currentFilters={{
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

                        <BlogTable data={blogs}/>
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