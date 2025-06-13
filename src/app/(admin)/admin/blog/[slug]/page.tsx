import BlogModel from "@/models/blog-model";
import EditBlogForm, { BlogDetails } from "./_components/edit-blog-form";
import CategoryModel from "@/models/category-model";
import TagModel, { ITag } from "@/models/tag-model";
import { ICategory } from "@/models/category-model";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

interface BlogDetailsPageProps {
    params: {
        slug: string
    }
}

interface CurrentBlogResult {
    _id: mongoose.Types.ObjectId,
    title: string,
    excerpt: string,
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
    const slug = currentParams.slug;
    const currentBlog = await BlogModel.findOne<CurrentBlogResult>({ slug: slug }).populate(['tags', 'category']);
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
            excerpt: currentBlog.excerpt,
            content: currentBlog.content,
            metaTitle: currentBlog.metaTitle,
            metaDescription: currentBlog.metaDescription,
            status: currentBlog.status,
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

        if(currentBlog.category){
            blogData.category = currentBlog.category.slug;
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