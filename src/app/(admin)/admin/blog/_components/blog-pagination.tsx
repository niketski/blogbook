'use client'

import { 
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface BlogPaginationProps {
    totalPages: number,
    currentPage: number
}

export default function BlogPagination({ totalPages, currentPage = 1 } : BlogPaginationProps) {
    const pages = Array(totalPages).fill(null);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const path = usePathname();
    const router = useRouter();

    const handlePageSelect = (page: number): void => {
        
        params.set('page', page.toString());
        router.push(`${path}?${params.toString()}`, undefined);
    
    };

    return (
        <Pagination className="justify-start mt-9">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageSelect(currentPage - 1)}}/>
                </PaginationItem>
                    {/* {pages.map((val, index) => {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); handlePageSelect(index + 1)}}>
                                        {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })} */}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageSelect(currentPage + 1)}}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}