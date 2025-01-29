import BlogModel, { IBlog } from "@/models/blog-model";
import EditBlogForm, { BlogDetails } from "./_components/edit-blog-form";
import CategoryModel from "@/models/category-model";
import TagModel, { ITag } from "@/models/tag-model";
import { ICategory } from "@/models/category-model";
import mongoose, { Types } from "mongoose";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface BlogDetailsPageProps {
    params: {
        id: string
    }
}

interface CurrentBlogResult {
    _id: Types.ObjectId,
    title: string,
    content: string,
    featuredImage: {
        url: string,
        id: string,
    },
    category: ICategory,
    tags: ITag[],
    status: 'published' | 'draft',
    metaTitle: string,
    metaDescription: string,
    slug: string
}

export default async function BlogDetailsPage({ params } : BlogDetailsPageProps) {
    const currentParams = await params;
    const blogId = currentParams.id;
    const currentBlog: CurrentBlogResult | null = await BlogModel.findById(blogId).populate(['tags', 'category']);
    const categories: null | ICategory[] = await CategoryModel.find({});
    const tags = await TagModel.find({});
    let blogData: BlogDetails | null = null;

    // format categories as select options
    const formattedCategories = categories?.map(category => {
        return { 
            value: category.slug,
            label: category.name as string
        }
    });

    // format tags as tag options
    const formattedTags = tags?.map(tag => {
        return {
            value: tag.slug,
            label: tag.name as string
        }
    });

    if(currentBlog) {

        blogData = {
            id: currentBlog._id as unknown as string,
            title: currentBlog.title,
            slug: currentBlog.slug,
            content: currentBlog.content,
            metaTitle: currentBlog.metaTitle,
            metaDescription: currentBlog.metaDescription,
            status: currentBlog.status,
            category: currentBlog.category.slug as string,
            tags: currentBlog.tags.map((tag) =>  {
                return { value: tag.slug, label: tag.name }
            }),
        }

        // include featured image if exist
        if(currentBlog.featuredImage !== undefined || typeof currentBlog.featuredImage === 'object' && Object.keys(currentBlog.featuredImage).length !== 0) {

            blogData.featuredImage = {
                id: currentBlog.featuredImage.id,
                url: currentBlog.featuredImage.url
            }

        }

    }

    return (
        <div>
            <Link className="mb-12 inline-flex items-center" href="/admin/blog"><ArrowLeft className="mr-2"/> Back to blogs</Link>
            <h1 className="font-bold text-4xl mb-10">Blog Details</h1>
            <div>

                {blogData && 
                    <EditBlogForm
                        blog={JSON.stringify(blogData)}
                        categoriesOption={formattedCategories}
                        tagsOptions={formattedTags}/>
                }
                
            </div>
        </div>
    );
}