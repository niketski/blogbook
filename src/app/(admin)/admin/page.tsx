import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Link from "next/link";

export default async function UserAdminPage() {

    return (
        <div className="flex flex-col gap-10">
            <h1 className="font-bold text-4xl">Dashboard</h1>
            <div className="lg:flex flex-wrap -m-2">
                <div className="w-full xl:w-[calc(100%/3)] lg:w-1/2 p-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Blogs</CardTitle>
                            <CardDescription>Total number of blog published.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-bold text-[42px]">45</h3>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full xl:w-[calc(100%/3)] lg:w-1/2 p-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Categories</CardTitle>
                            <CardDescription>Total number of blog category.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-bold text-[42px]">10</h3>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full xl:w-[calc(100%/3)] lg:w-1/2 p-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Tags</CardTitle>
                            <CardDescription>Total number of blog tag.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-bold text-[42px]">23</h3>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <h2 className="font-bold text-2xl mb-8">Recent Posts</h2>
                <div>
                    <article className="flex items-start justify-between border-b py-3">
                        <div>
                            <h3 className="font-bold text-xl mb-1">Sample Blog</h3>
                            <p className="text-gray-500 text-sm">March 3, 2025</p>
                        </div>
                        <Link href="#" className="bg-primary text-white rounded-lg px-5 py-2 leading-none hover:bg-gray-800">View</Link>
                    </article>
                    <article className="flex items-start justify-between border-b py-3">
                        <div>
                            <h3 className="font-bold text-xl mb-1">Sample Blog</h3>
                            <p className="text-gray-500 text-sm">March 3, 2025</p>
                        </div>
                        <Link href="#" className="bg-primary text-white rounded-lg px-5 py-2 leading-none hover:bg-gray-800">View</Link>
                    </article>
                    <article className="flex items-start justify-between border-b py-3">
                        <div>
                            <h3 className="font-bold text-xl mb-1">Sample Blog</h3>
                            <p className="text-gray-500 text-sm">March 3, 2025</p>
                        </div>
                        <Link href="#" className="bg-primary text-white rounded-lg px-5 py-2 leading-none hover:bg-gray-800">View</Link>
                    </article>
                </div>
            </div>
        </div>
    );
}