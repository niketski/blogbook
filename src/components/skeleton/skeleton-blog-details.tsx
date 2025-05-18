import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonBlogDetails() {
    return (
        <div className="py-[80px]">
            <div className="px-5">
                <div className="mx-auto max-w-[1170px] min-h-[1500px]">
                    <div className="mb-8">
                        <Skeleton className="w-[120px] h-[50px]"/>
                    </div>
                    <div className="mb-10">
                        <Skeleton className="rounded-lg h-[430px] w-full object-cover"/>
                    </div>
                    <div className="mb-10">
                        <Skeleton className="h-[50px] w-[200px] rounded-full mb-10"/>
                        <Skeleton className="h-[100px] w-1/2 mb-10"/>
                        <Skeleton className="h-[25px] mb-2"/>
                        <Skeleton className="h-[25px] mb-2"/>
                        <Skeleton className="h-[25px] mb-2"/>
                        <Skeleton className="h-[25px] mb-2"/>
                        <Skeleton className="h-[25px] mb-2 w-1/3"/>
                    </div>
                    <div className="flex item-center">
                        <Skeleton className="h-[25px] w-[100px] mr-2"/>
                        <Skeleton className="h-[25px] w-[100px] mr-2"/>
                        <Skeleton className="h-[25px] w-[100px] mr-2"/>
                    </div>
                </div>
            </div>
        </div>
    );
}