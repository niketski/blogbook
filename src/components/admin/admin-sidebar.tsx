'use client'

import { 
    Sidebar, 
    SidebarContent, 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarGroupLabel, 
    SidebarMenu, 
    SidebarMenuItem, 
    SidebarMenuButton, 
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarFooter,
    
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Newspaper, User, ChevronRight, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { CollapsibleContent } from "../ui/collapsible";

const menuData = [
    {
        url: '/admin',
        title: 'Dashboard',
        icon: LayoutDashboard
    },
    {
        url: '/admin/blog',
        title: 'Blogs',
        icon: Newspaper,
        isActive: false,
        items: [
            {
                url: '/admin/blog',
                title: 'All blogs'
            },
            {
                url: '/admin/blog/category',
                title: 'Categories'
            },
            {
                url: '/admin/blog/tag',
                title: 'Tags'
            }
        ]
    },
    {
        url: '/admin/profile',
        title: 'Profile',
        icon: User
    }
];

export default function AdminSidebar() {
    return (
       <Sidebar>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Admin</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {menuData.map(item => {
                            return (
                                <Collapsible
                                    className="group/collapsible" 
                                    key={item.title}
                                    defaultOpen={item.isActive}
                                    asChild>

                                        <SidebarMenuItem>

                                            {item.items?.length ?

                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <Link href={item.url} className="relative">
                                                            <item.icon/>
                                                            <span>{item.title}</span>
                                                            <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-3 transition-transform group-data-[state=open]/collapsible:rotate-90"/>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger> :

                                                <SidebarMenuButton asChild>
                                                    <Link href={item.url}>
                                                        <item.icon/>
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            }

                                            {item.items?.length && 
                                            
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items.map(sub => {
                                                            return (
                                                                <SidebarMenuSubItem key={sub.title}>
                                                                    <SidebarMenuSubButton asChild>
                                                                        <Link href={sub.url}>
                                                                            <span>{sub.title}</span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            );
                                                        })}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            }
                                            
                                        </SidebarMenuItem>
                                
                                </Collapsible>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <div>
                <Button variant="ghost">
                    <LogOut/> Signout
                </Button>
            </div>
        </SidebarFooter>
       </Sidebar>
    );
}