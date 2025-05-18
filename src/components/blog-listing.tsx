'use client';
import { useState, useEffect } from "react";
import FeaturedBlog from "@/components/featured-blog";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { BlogResult } from "@/app/(admin)/admin/blog/_components/blog-table";
import { LoaderCircle } from "lucide-react";
import SkeletonFeaturedBlog from "./skeleton/skeleton-featured-blog";
import SkeletonBlogCard from "./skeleton/skeleton-blog-card";

export default function BlogListing() {
    const [featuredBlog, setFeaturedBlog] = useState<BlogResult | null>(null);
    const [blogs, setBlogs] = useState<BlogResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = page === 1 ? 5 : 4;
    const defaultImage = 'https://res.cloudinary.com/dndtvwfvg/image/upload/v1738577422/blogbook/download_iszr5d.jpg';
    
    const fetchBlogs = async () => {

        setLoading(true);
        const skip = page === 1 ? (page - 1) * limit : 5 + ((page - 2) * 4);
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
            setTotalPages(metaData.pages);

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

        fetchBlogs();   

    }, [page]);

    console.log(blogs.length, loading);
    return (
        <div>
            {/* Featured Blog */}
            {(!featuredBlog && loading) ? 

                <div className="mb-5 lg:mb-10 mx-auto max-w-[475px] lg:max-w-[1640px]">
                    <SkeletonFeaturedBlog/>
                </div> : 
                
                featuredBlog ? 
                    (
                        <div className="mb-5 lg:mb-10 mx-auto max-w-[475px] lg:max-w-[1640px]">
                            <FeaturedBlog
                                title={featuredBlog.title}
                                date={new Intl.DateTimeFormat('en-US').format(new Date(featuredBlog.createdAt))}
                                category={featuredBlog.categoryData[0] ? featuredBlog.categoryData[0].name : 'Uncategorized'}
                                imageUrl={featuredBlog.featuredImage ? featuredBlog.featuredImage.url : defaultImage}
                                link={`/${featuredBlog._id}`}
                                excerpt={featuredBlog.content}/>
                        </div>
                    ) : null
                }
            

            {/* Blog List */}
            {!blogs.length && loading ? <SkeletonBlogList/> : (
                <div className="mx-auto xl:max-w-[1170px] lg:max-w-[950px]">
                    <div className="lg:flex md:flex-wrap">
                        {blogs.map(blog => {
                            return (
                                <div key={blog._id as string} className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
                                    <BlogCard
                                        title={blog.title}
                                        date={new Intl.DateTimeFormat('en-US').format(new Date(blog.createdAt))}
                                        category={blog.categoryData.length ? blog.categoryData[0].name : 'Uncategorized'}
                                        imageUrl={blog.featuredImage ? blog.featuredImage.url : defaultImage}
                                        link={`/${blog._id}`}
                                        excerpt={blog.content}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            

            {/* Load more button */}
            {(blogs.length > 0 && page < totalPages) && 
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