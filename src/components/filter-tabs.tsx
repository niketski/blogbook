'use client'

import { Button } from "@/components/ui/button";

interface FilterTabsProps {
    activeTab: string | null,
    filters: { id: string, label: string }[],
    handleTabClick: (value: string) => void
}

export default function FilterTabs({ activeTab, filters, handleTabClick } : FilterTabsProps) {

    return (
        <>
            <Button 
                className="mr-3"
                key="all"
                variant={`${activeTab === '' ? 'default' : 'outline'}`}
                onClick={() => { handleTabClick('') }}>All</Button>

            {filters.map((item) => {
                return (
                    <Button
                        className="mr-3"
                        key={item.id}
                        variant={`${item.id === activeTab ? 'default' : 'outline'}`}
                        onClick={() => { handleTabClick(item.id) }}>
                            {item.label}
                    </Button>
                )
            })}
        </>
    );
}