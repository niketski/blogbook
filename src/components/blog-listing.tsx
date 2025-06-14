'use client';
import { useState, useEffect } from "react";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { BlogResult } from "@/app/(admin)/admin/blog/_components/blog-table";
import { LoaderCircle } from "lucide-react";
import SkeletonBlogCard from "./skeleton/skeleton-blog-card";

interface BlogListingProps {
    page: number,
    limit: number,
    totalPages: number,
    blogs: BlogResult[] | null,
}

export default function BlogListing(props : BlogListingProps) {
    const [featuredBlog, setFeaturedBlog] = useState<BlogResult | null>(null);
    const [blogs, setBlogs] = useState<BlogResult[]>(props.blogs ? props.blogs : []);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(props.page);
    const [totalPages, setTotalPages] = useState(props.totalPages ? props.totalPages : 0);
    const limit = props.limit ? props.limit : 4;
    const defaultImage = 'https://res.cloudinary.com/dndtvwfvg/image/upload/v1738577422/blogbook/download_iszr5d.jpg';
    
    const fetchBlogs = async () => {

        setLoading(true);

        const skip = (page - 1) * limit;
        const response = await fetch(`/api/blogs?limit=${limit}&page=${page}&skip=${skip}`, {
            cache: 'no-store',
        });

        const data = await response.json();

        try {

            if(!response.ok) {
                throw new Error(data.message || 'Error fetching data.');
            }

            const blogResult = data.data as BlogResult[];
            const metaData = data.metaData as { page: number, pages: number, total: number };

            if(page === 1) {

                setFeaturedBlog(blogResult[0]);
                setBlogs(blogResult.slice(1, limit));

            } else {

                setBlogs(prevBlogs => [...prevBlogs, ...blogResult]);

            }

            setLoading(false);
            setPage(metaData.page)

            if(totalPages === 0) {
                setTotalPages(metaData.pages);
            }

        } catch (error) {
            
            console.log(error);

        }
       

        setLoading(false);
        
    };

    const handleLoadMore = () => {

        setPage(prevPage => prevPage + 1);

    };

    const SkeletonBlogList = () => {
        return (
            <div className="mx-auto xl:max-w-[1170px] lg:max-w-[950px]">
                <div className="lg:flex md:flex-wrap">
                    <div className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
                        <SkeletonBlogCard/>
                    </div>
                    <div className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
                        <SkeletonBlogCard/>
                    </div>
                    <div className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
                        <SkeletonBlogCard/>
                    </div>
                    <div className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
                        <SkeletonBlogCard/>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        
        if(page > 1) {
            fetchBlogs();   
        }

    }, [page]);

    return (
        <div>
           
            
            {/* Blog List */}
            {!blogs.length && loading ? <SkeletonBlogList/> : (
                <div className="mx-auto xl:max-w-[1170px] lg:max-w-[950px]">
                    <div className="lg:flex md:flex-wrap md:-mx-[8px]">
                        {blogs.map((blog, index) => {
                            return (
                                <div key={index.toString()} className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
                                    <BlogCard
                                        title={blog.title}
                                        date={new Intl.DateTimeFormat('en-US').format(new Date(blog.createdAt))}
                                        category={blog.categoryData.length ? blog.categoryData[0].name : 'Uncategorized'}
                                        imageUrl={blog.featuredImage ? blog.featuredImage.url : defaultImage}
                                        link={`/${blog.slug}`}
                                        excerpt={featuredBlog?.excerpt}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            

            {/* Load more button */}
            {(blogs.length > 0 && page < totalPages || loading) && 
                <div className="text-center mt-10">
                    <Button 
                        onClick={handleLoadMore}
                        variant="outline" 
                        className="transition hover:shadow-lg">
                        {loading ? <>Loading <LoaderCircle className="animate-spin"/></> : 'Load more'}
                    </Button>
                </div>
            }

        </div>
    );
}