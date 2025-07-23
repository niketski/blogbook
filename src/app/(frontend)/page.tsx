import BlogListing from "@/components/blog-listing";
import { BlogResult } from "../(admin)/admin/blog/_components/blog-table";
import FeaturedBlog from "@/components/featured-blog";
import CategoryModel, { ICategory } from "@/models/category-model";
import dbConnect from "@/lib/db-connect";

export default async function Home() {
  await dbConnect();
  
  const page = 1;
  const limit = 4;
  const skip = (page - 1) * limit;
  let blogs: BlogResult[] | null = null;
  let totalpages: number = 1;
  let featuredBlog: BlogResult | null = null;
  const categories  = await CategoryModel.find<ICategory>({});

  try {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?limit=${limit}&page=${page}&skip=${skip}&status=published`, {
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
            <div className="mb-10">
              <FeaturedBlog
                title={featuredBlog.title}
                date={new Intl.DateTimeFormat('en-US').format(new Date(featuredBlog.createdAt))}
                category={featuredBlog.categoryData.length ? featuredBlog.categoryData[0].name : 'Uncategorized'}
                excerpt={featuredBlog.excerpt}
                link={`${featuredBlog.slug}`}
                imageUrl={featuredBlog.featuredImage.url}
                />
            </div>
          }
        </div>

        {blogs && 
          <BlogListing
            blogs={blogs}
            page={page}
            limit={limit}
            categories={categories.length ? categories.map(item => { return { id: item.slug, label: item.name } }) : null}
            totalPages={totalpages}
            />
        }
      </div>
    </div>
  );
}
