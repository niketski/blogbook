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
import CategoryModel, { ICategory } from "@/models/category-model";
import TagModel, { ITag } from "@/models/tag-model";
import { PipelineStage } from "mongoose";
import SearchForm from "./_components/search-form";
import Filters, { FilterField, FilterOption } from "./_components/filters";
import BlogTable from "./_components/blog-table";
import NoBlogResult from "./_components/no-blog-result";
import { Suspense } from "react";

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
    const categories = await CategoryModel.find<ICategory>({});
    const categoryOptions = categories.map<FilterOption>(item => { return { label: item.name, value: item.slug } });
    const categoryField: FilterField = {
        name: 'category',
        placeholder: 'Category',
        options: [
            {
                label: 'Category',
                value: 'default'
            },
            ...categoryOptions
        ]
    }
    const tags = await TagModel.find<ITag>({});
    const tagsOptions = tags.map<FilterOption>(item => { return { label: item.name, value: item.slug } });
    const tagField: FilterField =  {
        name: 'tag',
        placeholder: 'Tag',
        options: [
            {
                label: 'Tag',
                value: 'default'
            },
            ...tagsOptions
        ]
    };
    const statusField: FilterField = {
        name: 'status',
        placeholder: 'Status',
        options: [
            {
                label: 'Status',
                value: 'default'
            },
            {
                label: 'Published',
                value: 'published'
            },
            {
                label: 'Draft',
                value: 'draft'
            }
        ]
    };

    const filterFields: FilterField[] = [
        statusField,
        categoryField,
        tagField
    ];


    for(const key in search) {
        

        if(search[key] !== undefined && search[key] !== '' && search[key] !== 'default') {

            if(key === 'category') { // checks if there's category filter

                // filter documents that has the same category slug on the given filter
                query['categoryData'] = {
                    $elemMatch: { slug: search[key] }
                }
            
            } else if(key === 'tag') { // checks if there's tag filter

                // filter document by tags and checks if the document contains the given filter tag
                query['tagsData'] = {
                    $elemMatch: { slug: search[key] }
                }
            
            } else if(key === 'search') {

                // filter document by title
                query['title'] = {
                    $regex: search[key],
                    $options: 'i'
                }

            } else {

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
        },
        {
            $sort: { createdAt: -1 } // Sort by createdAt in descending order (latest first)
        }
    ];

    // if it has filters include the filters to the pipeline stage
    if(Object.keys(query).length) {

        aggregateQuery.push({ $match: query });

    } 
    
    const blogs: IBlogResult[] | null = await BlogModel.aggregate(aggregateQuery);

    console.log(search);

    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">Blogs</h1>
            <Link className={buttonVariants()} href="/admin/blog/create"><Plus/> Create Blog</Link>
            <div className="max-w-[350px] lg:ml-auto mb-7 lg:mb-0">

                <SearchForm search={search['search']}/>

            </div>
            <div className="pt-[30px] mb-[60px] hidden lg:block">

                <Filters 
                    fields={filterFields}
                    currentFilters={{
                        status: search['status'],
                        category: search['category'],
                        tag: search['tag']
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

                            <Filters
                                fields={filterFields}
                                currentFilters={{
                                status: search['status'],
                                category: search['category'],
                                tag: search['tag']
                            }}/>

                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div>

                {blogs.length > 0  &&
                    <>
                        <div className="w-full overflow-auto">
                            <Suspense fallback={<p>Loading ...</p>}>
                                <BlogTable data={blogs}/>
                            </Suspense>
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
                    </>
                }

                {blogs.length === 0 && <NoBlogResult/>}
            </div>
        </div>
    );
}