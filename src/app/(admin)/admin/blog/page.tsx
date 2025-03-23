import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import Link from "next/link";
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
import { Suspense, useEffect } from "react";
import BlogPagination from "./_components/blog-pagination";

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

interface AggregationResult {
    data: IBlogResult[],
    metaData: [{ page: number, pages: number, total: number }]
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
    const page = search['page'] ? parseInt(search['page']) : 1;
    const documentLimit = 5;
    const skip = (page - 1) * documentLimit;

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

                // don't include to the match query if the key params is equal to page
                if(key !== 'page') {

                    query[key] = search[key];

                }

            }

        }
    }

    let queryKeys = Object.keys(query);
    let matchPipeline: object = {};

    // remove page from the query 
    queryKeys = queryKeys.filter(key => key !== 'page');
    
    // if it has filters include the filters to the pipeline stage
    if(queryKeys.length) {

        matchPipeline = query;

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
            $match: matchPipeline
        },
        {
            $facet: {
                metaData: [
                    { $count: 'total' },
                    { 
                        $addFields: {
                            page: page,
                            pages: {
                                $ceil: { $divide: ['$total', documentLimit] }
                            }
                        }
                    }
                ],
                data: [
                    { $sort: { createdAt: -1 } },
                    { $skip: skip },
                    { $limit: documentLimit },
                ]
            }
        }
    ];

    const blogs: AggregationResult[] | null = await BlogModel.aggregate(aggregateQuery);
    
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

                {blogs[0]?.data  &&
                    <>
                        <div className="w-full overflow-auto">
                            <Suspense fallback={<p>Loading ...</p>}>
                                <BlogTable data={blogs[0].data}/>
                            </Suspense>
                        </div>
                        <BlogPagination
                            totalPages={blogs[0].metaData[0].pages}
                            currentPage={blogs[0].metaData[0].page}/>
                    </>
                }

                {blogs[0]?.data.length === 0 && <NoBlogResult/>}
            </div>
        </div>
    );
}