'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export interface FiltersProps {
    fields: FilterField[],
    currentFilters: {
        [key: string]: string | undefined
    }  
}

export interface FilterField {
    name: string,
    placeholder: string,
    options: FilterOption[]
}

export interface FilterOption {
    value: string,
    label: string,
}

export default function Filters({ currentFilters, fields } : FiltersProps) {
    const [filters, setFilters] = useState<{[key: string]: string | undefined}>(currentFilters);
    const searchParams = useSearchParams();
    const path = usePathname();
    const router = useRouter();
    const handleSelectChange = (value: string, name: string) => {

        setFilters(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
       
    };

    const createSearchParameter = (): string => {
        const params = new URLSearchParams(searchParams.toString());

        for(const key in filters) {

            if(filters[key]) {
                params.set(key, filters[key]);
            }
            
        }

        return params.toString();

    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const queryString = createSearchParameter();

        router.push(`${path}?${queryString}`);
    };

    const handleClearFilters = () => { router.push(path) };

    
    return (
       <div className="flex items-center">
            <form onSubmit={handleSubmit}>
                <div className="lg:flex md:items-center">
                    {fields && 
                        fields.map(item => {
                            const selectedValue = item.options.find(optionItem => currentFilters[item.name] === optionItem.value);
                            const defaultValue = currentFilters[item.name] === selectedValue?.value ? selectedValue?.value : 'default';

                            console.log(defaultValue);

                            return (
                                <div className="mb-3 md:mb-0 w-full lg:mr-3 lg:w-auto" key={item.name}>
                                    <Select name={item.name} defaultValue={defaultValue} onValueChange={(value) => { handleSelectChange(value, item.name) }}>
                                        <SelectTrigger className="w-full lg:w-[120px]">
                                            <SelectValue placeholder={item.placeholder}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {item.options.map(option => { 
                                                return <SelectItem key ={option.value} value={option.value}>{option.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) 
                        })
                    }
                    
                    <div className="inline-flex items-center justify-end pt-5 lg:inline-block lg:pt-0">

                        <Button type="submit" variant="outline">Apply filters</Button>
                        
                    </div>
                </div>
            </form>

            {Object.keys(currentFilters).length > 0 &&
                <Button 
                    variant="outline" 
                    className="ml-3"
                    onClick={() => { handleClearFilters() }}>
                    <X/> Clear Filters
                </Button>
            }
       </div>
    );
}