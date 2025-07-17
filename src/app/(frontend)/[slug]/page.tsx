import BackButton from "@/components/back-button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ITag } from "@/models/tag-model";
import BlogModel, { IBlog } from "@/models/blog-model";
import TagModel from "@/models/tag-model";
import CategoryModel from "@/models/category-model";
import { ICategory } from "@/models/category-model";
import RichTextContent from "@/components/rich-text-content";
import dbConnect from "@/lib/db-connect";
import type { Metadata } from 'next';
import { notFound } from "next/navigation";

interface BlogDetailsPageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface generateMetaDataProps {
    params: Promise<{slug: string}>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
    await dbConnect();
    
    const blogs = await BlogModel.find<IBlog>({});
    
    return blogs.map(blog => ({ slug: blog.slug }));
}

// blog meta data
export async function generateMetadata({ params }: generateMetaDataProps): Promise<Metadata>  {
    await dbConnect();

    const { slug } = await params;
    const result = await BlogModel.find<IBlog>({ slug });
    const blog = result[0];

    return {
        title: 'Blogbook | ' + blog?.metaTitle || blog?.title,
        description: blog?.metaDescription || blog?.content
    }
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
    await dbConnect();
    const { slug } = await params;
    const defaultImage = 'https://res.cloudinary.com/dndtvwfvg/image/upload/v1738577422/blogbook/download_iszr5d.jpg';
    const currentBlog = await BlogModel.findOne<IBlog>({ slug });

    if(!currentBlog) {
        
        notFound();

    }

    const featuredImage = currentBlog?.featuredImage ? currentBlog.featuredImage.url : defaultImage;
    const category = currentBlog?.category ? await CategoryModel.findById<ICategory>(currentBlog.category) : null;
    const date = currentBlog ? new Intl.DateTimeFormat('en-us').format(new Date(currentBlog.createdAt.toString())) : null;
    const tags: ITag[] = currentBlog?.tags ? await TagModel.find<ITag>({_id: currentBlog.tags}) : [];

    return (
        <div className="py-[80px]">
            <div className="px-5">
                <div className="mx-auto max-w-[1170px] min-h-[1500px]">
                    <div className="mb-8">
                        <BackButton><ChevronLeft size={30}/> Back</BackButton>
                    </div>
                    <div className="mb-10">
                        <Image
                            className="rounded-lg h-[430px] w-full object-cover"
                            src={featuredImage}
                            width={1170}
                            height={430}
                            alt={'Featured Image'}/>
                    </div>
                    <div className="mb-5">
                        <span className="border border-primary rounded-full font-bold px-3 py-2 bg-primary text-white text-sm">{category ? category.name : 'Uncategorized'}</span>
                    </div>
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-7xl mb-5">{currentBlog?.title}</h1>
                    <span className="mb-10 block text-lg">{date}</span>
                    <div className="blog-content">
                        {currentBlog?.content && (
                            <RichTextContent content={currentBlog.content}/>
                        )}
                    </div>
                    {tags.length > 0 && (
                        <div className="mb-10">
                            <ul className="flex items-center gap-2 mt-5">
                                {tags.map(tag => {
                                    return (
                                        <li key={tag._id as string}>
                                            <Badge className="bg-transparent border border-primary text-primary hover:bg-transparent">
                                                {tag.name}
                                            </Badge>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}