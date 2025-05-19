import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

export default function SkeletonStatsContainer() {
    return (
        <div className="lg:flex flex-wrap -m-2">
            <div className="w-full xl:w-[calc(100%/3)] lg:w-1/2 p-2">
                <Card>
                    <div className="p-6">
                        <Skeleton className="h-[16px] w-1/3 mb-[16px]" />
                        <Skeleton className="h-[20px] w-1/3" />
                        <Skeleton className="h-[50px] w-1/2 mt-[24px]" />
                    </div>
                </Card>
            </div>
            <div className="w-full xl:w-[calc(100%/3)] lg:w-1/2 p-2">
                <Card>
                    <div className="p-6">
                        <Skeleton className="h-[16px] w-1/3 mb-[16px]" />
                        <Skeleton className="h-[20px] w-1/3" />
                        <Skeleton className="h-[50px] w-1/2 mt-[24px]" />
                    </div>
                </Card>
            </div>
            <div className="w-full xl:w-[calc(100%/3)] lg:w-1/2 p-2">
                <Card>
                    <div className="p-6">
                        <Skeleton className="h-[16px] w-1/3 mb-[16px]" />
                        <Skeleton className="h-[20px] w-1/3" />
                        <Skeleton className="h-[50px] w-1/2 mt-[24px]" />
                    </div>
                </Card>
            </div>
        </div>
    );
}