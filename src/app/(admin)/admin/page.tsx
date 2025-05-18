
 
import StatsContainer from "./_components/stats-container";
import RecentBlogsList from "./_components/recent-blogs-list";
import { Suspense } from "react";
import SkeletonStatsContainer from "@/components/skeleton/skeleton-stats";

export default async function UserAdminPage() {

    return (
        <div className="flex flex-col gap-10">
            <h1 className="font-bold text-4xl">Dashboard</h1>

            {/* dashboard stats */}
            <Suspense fallback={<SkeletonStatsContainer/>}>
                <StatsContainer/>
            </Suspense>

            <div>
                <h2 className="font-bold text-2xl mb-8">Recent Posts</h2>
                <RecentBlogsList/>
            </div>
        </div>
    );
}