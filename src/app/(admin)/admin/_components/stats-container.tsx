import BlogModel, { IBlog } from "@/models/blog-model";
import CategoryModel, { ICategory } from "@/models/category-model";
import TagModel, { ITag } from "@/models/tag-model";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import dbConnect from "@/lib/db-connect";

interface StatItem {
    title: string,
    description: string,
    total: number
}

export default async function StatsContainer() {
    await dbConnect();
    
    const blogs = BlogModel.find<IBlog[]>({});
    const categories = CategoryModel.find<ICategory[]>({});
    const tags = TagModel.find<ITag[]>();
    const [blogResult, categoryResult, tagResult] = await Promise.all([blogs, categories, tags]);
    const results: StatItem[] = [
        {
            title: 'Total Blogs',
            description: 'Total number of blog published.',
            total: blogResult.length
        },
        {
            title: 'Total Categories',
            description: 'Total number of blog category.',
            total: categoryResult.length
        },
        {
            title: 'Total Tags',
            description: 'Total number of blog tag.',
            total: tagResult.length
        }
    ];

    return (
        <div className="lg:flex flex-wrap -m-2">
            {results &&
                results.map((item, index) => {
                    return (
                        <div key={index} className="w-full xl:w-[calc(100%/3)] lg:w-1/2 p-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="font-bold text-[42px]">{item.total}</h3>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })
            }
        </div>
    );
}