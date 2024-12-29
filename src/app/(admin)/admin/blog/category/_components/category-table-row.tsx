'use client'

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import EditCategoryForm from "./edit-category-form";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";


interface CategoryTableRowProps {
    id: string,
    name: string,
    slug: string,
    date: string
}
export default function CategoryTableRow({ id, name, slug, date} : CategoryTableRowProps) {

    return (
        <TableRow key={id}>
            <TableCell><span className="font-bold">{name}</span></TableCell>
            <TableCell>{slug}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>
                <Dialog>

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="link"><Ellipsis/></Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <DialogTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        className="px-0 block w-full hover:no-underline justify-start cursor-pointer text-left"
                                        type="submit">Edit</Button>
                                </DialogTrigger>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>

                        <DialogContent>
                            <DialogHeader>
                                    <DialogTitle>Edit Category</DialogTitle>
                                    <EditCategoryForm category={{id, name, slug}}/>
                            </DialogHeader>
                            
                        </DialogContent>

                    </DropdownMenu>
                </Dialog>
            </TableCell>
        </TableRow>
    );
}