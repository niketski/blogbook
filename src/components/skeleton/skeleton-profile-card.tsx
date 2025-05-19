import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

export default async function SkeletonProfileCard() {
    

    return (
         <Card>
            <CardHeader>
                <Skeleton className="w-1/3 h-4 mb-2"/>
                <Skeleton className="w-full h-4"/>
            </CardHeader>
            <CardContent>
                <div className="md:flex mb-3">
                    <div className="w-full">
                        <Skeleton className="w-[120px] h-4 mb-2 block"/>
                        <Skeleton className="w-1/2 h-4 mb-2"/>
                    </div>
                </div>
                <div className="md:flex">
                    <div className="md:w-1/2 mb-3">
                        <Skeleton className="w-[120px] h-4 mb-2 block"/>
                        <Skeleton className="w-1/2 h-4 mb-2"/>
                    </div>
                    <div className="md:w-1/2 mb-3">
                        <Skeleton className="w-[120px] h-4 mb-2 block"/>
                        <Skeleton className="w-1/2 h-4 mb-2"/>
                    </div>
                </div>
                <div>
                    <Skeleton className="w-[120px] h-4 mb-2 block"/>
                    <Skeleton className="w-1/2 h-4 mb-2"/>
                </div>
            </CardContent>
        </Card>
    );
}