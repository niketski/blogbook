import { Skeleton } from "../ui/skeleton";

export default function SkeletonFeaturedBlog() {
    return (
        <div className="lg:flex border border-gray-300 rounded-lg overflow-hidden">
            <div className="lg:w-1/2">
                <Skeleton className="w-full h-[580px]"/>
            </div>
          <div className="lg:w-1/2 p-6 lg:p-10">
            <Skeleton className="w-[120px] h-[25px] rounded-full mb-3"/>
            <Skeleton className="w-1/2 h-[40px] mb-3"/>
            <Skeleton className="w-1/3 h-[15px] mb-3"/>
            <div className="mb-3">
              <Skeleton className="w-full h-[15px] mb-3"/>
              <Skeleton className="w-full h-[15px] mb-3"/>
              <Skeleton className="w-1/3 h-[15px]"/>
            </div>
            <Skeleton className="w-[150px] h-[30px]"/>
          </div>
        </div>
    );
}