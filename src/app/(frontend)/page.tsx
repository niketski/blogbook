import BlogListing from "@/components/blog-listing";
import { BlogResult } from "../(admin)/admin/blog/_components/blog-table";
import FeaturedBlog from "@/components/featured-blog";

export default async function Home() {
  const page = 1;
  const limit = 4;
  const skip = (page - 1) * limit;
  let blogs: BlogResult[] | null = null;
  let totalpages: number = 1;
  let featuredBlog: BlogResult | null = null;

  try {
    
    const response = await fetch(`http://localhost:8000/api/blogs?limit=${limit}&page=${page}&skip=${skip}`, {
        cache: 'no-store',
    });

    if(!response.ok) {

      throw Error('Error fetching data.');
      
    }

    const result = await response.json();

    blogs = result.data;
    totalpages = result.metaData.pages;
    featuredBlog = result.data[0]

  } catch (error: unknown) {

    console.log(error);

  }

  return (
    <div className="py-[80px]">
      <div className="px-5">
        <div className="custom-container">
          <h1 className="font-bold text-4xl mb-10">Featured</h1>
          {featuredBlog &&
            <div className="mb-5">
              <FeaturedBlog
                title={featuredBlog.title}
                date={new Intl.DateTimeFormat('en-US').format(new Date(featuredBlog.createdAt))}
                category={featuredBlog.categoryData.length ? featuredBlog.categoryData[0].name : 'Uncategorized'}
                excerpt={featuredBlog.excerpt}
                link={`${featuredBlog.slug}`}
                />
            </div>
          }
          
        </div>

        {blogs && 
          <BlogListing
            blogs={blogs}
            page={page}
            limit={limit}
            totalPages={totalpages}
            />
        }
      </div>
    </div>
  );
}
