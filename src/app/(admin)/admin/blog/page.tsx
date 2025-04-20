import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { SlidersHorizontal } from 'lucide-react';
import CategoryModel, { ICategory } from "@/models/category-model";
import TagModel, { ITag } from "@/models/tag-model";
import SearchForm from "./_components/search-form";
import Filters, { FilterField, FilterOption } from "./_components/filters";
import BlogTable from "./_components/blog-table";
import NoBlogResult from "./_components/no-blog-result";
import { Suspense } from "react";
import BlogPagination from "./_components/blog-pagination";
import { BlogGetResponse } from "@/app/api/blogs/route";

interface BlogsPageProps {
    searchParams: {
        [key: string] : string | undefined
    }
}

export default async function BlogsPage({ searchParams } : BlogsPageProps) {
    const search = await searchParams;
    const queryString = new URLSearchParams(search as Record<string, string>).toString();
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

    const result = await fetch(`http://localhost:8000/api/blogs?${queryString}`);
    const response: BlogGetResponse = await result.json();

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

                {response.data  &&
                   <div className="w-full overflow-auto">
                        <Suspense fallback={<p>Loading ...</p>}>
                            <BlogTable data={response.data}/>
                        </Suspense>
                    </div>
                }

                {
                    (response.metaData && response.metaData.pages > 1) &&

                        <BlogPagination
                                totalPages={response.metaData?.pages}
                                currentPage={response.metaData?.page}/>
                }

                {response.data?.length === 0 && <NoBlogResult/>}
            </div>
        </div>
    );
}