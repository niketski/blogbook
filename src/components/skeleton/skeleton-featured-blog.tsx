import { Skeleton } from "../ui/skeleton";

export default function SkeletonFeaturedBlog() {
    return (
        <div className="lg:flex border border-gray-300 rounded-lg overflow-hidden">
            <div className="lg:w-1/2">
                <Skeleton className="w-full h-[400px]"/>
            </div>
          <div className="lg:w-1/2 p-6 lg:p-10">
            <Skeleton className="w-[120px] h-[25px] rounded-full"/>
            <Skeleton className="w-1/2 h-[30px]"/>
            <Skeleton className="w-1/3 h-[25px]"/>
            <div>
              <Skeleton className="w-full h-[15px]"/>
              <Skeleton className="w-full h-[15px]"/>
              <Skeleton className="w-1/3 h-[15px]"/>
            </div>
            <Skeleton className="w-[200px] h-[50px]"/>
          </div>
        </div>
    );
}