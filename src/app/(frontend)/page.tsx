import FeaturedBlog from "@/components/featured-blog";
import BlogCard from "@/components/blog-card";

export default function Home() {
  return (
    <div className="py-[80px]">
      <div className="mx-auto max-w-[1170px] px-5">
        <h1 className="text-center font-bold text-4xl mb-10">Latest Blogs</h1>
        <div className="p-2">
          <FeaturedBlog
            title="Lorem ipsum"
            date="9/3/2025"
            category="Category"
            imageUrl="https://res.cloudinary.com/dndtvwfvg/image/upload/v1738101686/blogbook/iisuwbpvzcsuya56lxru.jpg"
            link="#"
            excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol..."/>
        </div>
        <div className="md:flex md:flex-wrap">
          <div className="md:w-1/2 p-2">
            <BlogCard
              title="Lorem ipsum"
              date="9/3/2025"
              category="Category"
              imageUrl="https://res.cloudinary.com/dndtvwfvg/image/upload/v1738101686/blogbook/iisuwbpvzcsuya56lxru.jpg"
              link="#"
              excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol..."/>
          </div>
          <div className="md:w-1/2 p-2">
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
    </div>
  );
}
