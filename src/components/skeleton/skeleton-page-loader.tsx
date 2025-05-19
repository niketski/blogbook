import { LoaderCircle } from 'lucide-react';

export default function SkeletonPageLoader() {
    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="inline-flex items-center">
                <span className="ml-2 text-lg font-semibold mr-5">Loading</span> <LoaderCircle className="animate-spin text-primary" size={40} />
            </div>
        </div>
    );
};