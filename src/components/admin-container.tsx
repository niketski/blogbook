'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin-sidebar";
import { useState } from "react";

export default function AdminContainer (
    {
        children
    } : {
        children: React.ReactNode
    }
) {

    const [isCollapsed, setIsCollapsed] = useState(true);

    console.log(isCollapsed);

    return (
        <SidebarProvider>
          <AdminSidebar/>
          <main className={`py-[60px] px-[30px] relative ${ isCollapsed ? 'md:w-[calc(100%-256px)]' : 'w-full' }`}>
            <SidebarTrigger className="absolute top-0 left-0" onClick={() => { setIsCollapsed(prevState => !prevState) }}/>
            {children}
          </main>
        </SidebarProvider>
    );
}