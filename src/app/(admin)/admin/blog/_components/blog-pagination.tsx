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
    const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const path = usePathname();
    const router = useRouter();

    const handlePageSelect = (page: number): void => {
        
        if(page > totalPages || page < 1) return;
        
        params.set('page', page.toString());
        router.push(`${path}?${params.toString()}`);
    
    };

    return (
        <Pagination className="justify-start mt-9">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        className={`${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={(e) => { e.preventDefault(); handlePageSelect(currentPage - 1)}}/>
                </PaginationItem>
                    {pages.map((val, index) => {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink 
                                    className={`cursor-pointer ${currentPage === index + 1 ? 'bg-primary text-white' : 'text-primary'}`}
                                    onClick={(e) => { e.preventDefault(); handlePageSelect(index + 1)}}>
                                        {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}
                <PaginationItem>
                    <PaginationNext 
                        className={`${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={(e) => { e.preventDefault(); handlePageSelect(currentPage + 1)}}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}