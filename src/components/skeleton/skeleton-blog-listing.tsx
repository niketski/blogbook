import SkeletonFeaturedBlog from "./skeleton-featured-blog";

export default function SkeletonBlogListing() {
    return (
         <div className="mb-5 lg:mb-10 mx-auto max-w-[475px] lg:max-w-[1640px]">
            <SkeletonFeaturedBlog/>
            Loading
        </div>
    );
}