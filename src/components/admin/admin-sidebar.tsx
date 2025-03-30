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
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isMatchedUrlPath } from "@/lib/utils";

const initialMenu: Menudata[] = [
    {
        url: '/admin',
        title: 'Dashboard',
        icon: LayoutDashboard,
        isActive: false,
    },
    {
        url: '/admin/blog',
        title: 'Blogs',
        icon: Newspaper,
        isActive: false,
        items: [
            {
                url: '/admin/blog/create',
                title: 'Create',
                isActive: false
            },
            {
                url: '/admin/blog',
                title: 'All blogs',
                isActive: false
            },
            {
                url: '/admin/blog/category',
                title: 'Categories',
                isActive: false
            },
            {
                url: '/admin/blog/tag',
                title: 'Tags',
                isActive: false
            }
        ]
    },
    {
        url: '/admin/profile',
        title: 'Profile',
        icon: User,
        isActive: false,
    }
];

interface Menudata {
    url: string,
    title: string,
    icon?: any,
    isActive?: boolean,
    items?: Menudata[]
}
export default function AdminSidebar() {
    const path = usePathname();
    const [menus, setMenus] = useState<Menudata[]>(initialMenu);

    useEffect(() => {
        
        setMenus(prevState => {

            return prevState.map(item => {
                const updatedItem = {
                    ...item,
                    isActive: isMatchedUrlPath(path, item.url.toLowerCase()),
                }

                if(item.items){
                    updatedItem.items = item.items.map(subItem => {
                        return {
                            ...subItem,
                            isActive: isMatchedUrlPath(path, subItem.url.toLowerCase())
                        }
                    })
                }

                return updatedItem;
            });

        });

    }, [path]);

    return (
       <Sidebar>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Admin</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {menus.map(item => {
                            const isParentMenuActive = item.isActive || item.items?.some(subItem => subItem.isActive) || false;

                            return (
                                <Collapsible
                                    className="group/collapsible" 
                                    key={item.title}
                                    open={isParentMenuActive}
                                    asChild>

                                        <SidebarMenuItem>

                                            {item.items?.length ?

                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton 
                                                        asChild 
                                                        isActive={isParentMenuActive}
                                                        className={`group-data-[state=open]/collapsible:bg-primary group-data-[state=open]/collapsible:text-white`}>
                                                        <Link href={item.url}>
                                                            <item.icon/>
                                                            <span>{item.title}</span>
                                                            <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-3 transition-transform group-data-[state=open]/collapsible:rotate-90"/>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger> :

                                                <SidebarMenuButton 
                                                    isActive={item.isActive}
                                                    className="group-data-[state=open]/collapsible:bg-primary group-data-[state=open]/collapsible:text-white"
                                                    asChild>
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
                                                                    <SidebarMenuSubButton 
                                                                        asChild 
                                                                        isActive={sub.isActive}
                                                                        className={`hover:bg-[#e3e3e3] transition-colors`}>
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