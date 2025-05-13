import FeaturedBlog from "@/components/featured-blog";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import BlogListing from "@/components/blog-listing";

export default function Home() {
  return (
    <div className="py-[80px]">
      <div className="px-5">
        <h1 className="text-center font-bold text-4xl mb-10">Latest Blogs</h1>
        <BlogListing/>
      </div>
    </div>
  );
}
