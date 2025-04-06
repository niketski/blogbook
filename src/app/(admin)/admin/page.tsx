
  import Link from "next/link";
  import StatsContainer from "./_components/stats-container";
  import { Suspense } from "react";

export default async function UserAdminPage() {

    return (
        <div className="flex flex-col gap-10">
            <h1 className="font-bold text-4xl">Dashboard</h1>

            {/* dashboard stats */}
            <Suspense fallback={<p>Loading stats...</p>}>
                <StatsContainer/>
            </Suspense>

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