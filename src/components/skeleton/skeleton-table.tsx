import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function SkeletonTable() {
    return (
        <div className="border rounded-lg">
            <Table className="w-full">
                <TableHeader>
                <TableRow>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-7 w-full" />
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {[...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Skeleton className="h-5 w-1/2 p-4" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-1/2 p-4" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-1/2 p-4" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-1/2 p-4" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-1/2 p-4" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-1/2 p-4" />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
}