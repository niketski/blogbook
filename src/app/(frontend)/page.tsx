import FeaturedBlog from "@/components/featured-blog";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="py-[80px]">
      <div className="px-5">
        <h1 className="text-center font-bold text-4xl mb-10">Latest Blogs</h1>

        {/* Featured Blog */}
        <div className="mb-5 lg:mb-10 mx-auto max-w-[475px] lg:max-w-[1640px]">
          <FeaturedBlog
            title="Lorem ipsum"
            date="9/3/2025"
            category="Category"
            imageUrl="https://res.cloudinary.com/dndtvwfvg/image/upload/v1738101686/blogbook/iisuwbpvzcsuya56lxru.jpg"
            link="#"
            excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol..."/>
        </div>
      
        {/* Blog List */}
        <div className="mx-auto xl:max-w-[1170px] lg:max-w-[950px]">
          <div className="lg:flex md:flex-wrap">
            <div className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
              <BlogCard
                title="Lorem ipsum"
                date="9/3/2025"
                category="Category"
                imageUrl="https://res.cloudinary.com/dndtvwfvg/image/upload/v1738101686/blogbook/iisuwbpvzcsuya56lxru.jpg"
                link="#"
                excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol..."/>
            </div>
            <div className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
              <BlogCard
                title="Lorem ipsum"
                date="9/3/2025"
                category="Category"
                imageUrl="https://res.cloudinary.com/dndtvwfvg/image/upload/v1738101686/blogbook/iisuwbpvzcsuya56lxru.jpg"
                link="#"
                excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol..."/>
            </div>
            <div className="lg:w-1/2 pb-5 lg:p-2 max-w-[475px] mx-auto lg:max-w-full lg:mx-0">
              <BlogCard
                title="Lorem ipsum"
                date="9/3/2025"
                category="Category"
                imageUrl="https://res.cloudinary.com/dndtvwfvg/image/upload/v1738101686/blogbook/iisuwbpvzcsuya56lxru.jpg"
                link="#"
                excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol..."/>
            </div>
          </div>
        </div>

        {/* Load more button */}
        <div className="text-center mt-10">
          <Button variant="outline" className="transition hover:shadow-lg">Load more</Button>
        </div>
      </div>
    </div>
  );
}
