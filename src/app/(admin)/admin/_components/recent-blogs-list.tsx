import RecentBlog from "./recent-blog";
import BlogModel, { IBlog } from "@/models/blog-model";
import dbConnect from "@/lib/db-connect";

export default async function RecentBlogsList() {
    await dbConnect();
    
    const blogs = await BlogModel.find<IBlog>().sort({ createdAt: -1 }).limit(4);

    return (
        <div>
            {blogs &&
                blogs.map((item) => {
                    const blogDate = item.createdAt.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    return (
                        <RecentBlog
                            key={item._id as string}
                            title={item.title}
                            date={blogDate}
                            link={`/${item.slug}`}/>
                    );
                })
            }
        </div>
    );
}