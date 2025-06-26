import SkeletonProfileCard from "@/components/skeleton/skeleton-profile-card";

export default function ProfilePageLoading() {
    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">User</h1>
            <SkeletonProfileCard/>
        </div>
    );
}