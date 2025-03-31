import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Link from "next/link";

export default async function UserAdminPage() {

    return (
        <div className="flex flex-col gap-10">
            <h1 className="font-bold text-4xl">Dashboard</h1>
            <div className="flex flex-col md:flex-row md:gap-5 gap-y-4 md:gap-y-0">
                <div className="flex-1">
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
                <div className="flex-1">
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
                <div className="flex-1">
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
                <div className="w-1/2">
                    <ul>
                        <li className="flex justify-between mb-2 font-semibold">Sample Blog <Link href="#" className="font-normal hover:underline">View</Link></li>
                        <li className="flex justify-between mb-2 font-semibold">Lorem ipsum <Link href="#" className="font-normal hover:underline">View</Link></li>
                        <li className="flex justify-between mb-2 font-semibold">Lorem ipsum <Link href="#" className="font-normal hover:underline">View</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}