'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";

export default function SearchForm({ search } : { search: string | undefined }) {
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const path = usePathname();
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        const searchValue = inputRef?.current?.value;
        const params = new URLSearchParams(searchParams.toString());

        if(searchValue != '') {

            params.set('search', searchValue as string);
            router.push(`${path}?${params.toString()}`);

        } else { // if there's no search string, clear query parameters

            router.push(path);

        }

    };

    
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center"> 
                <Input
                    ref={inputRef}
                    placeholder="Search by keyword"
                    name="search"
                    id="search"
                    defaultValue={
                        search ? search : ''
                    }/>
                <Button 
                    variant="outline"
                    className="ml-3"
                    type="submit">Search</Button>
            </div>
        </form>
    );
}