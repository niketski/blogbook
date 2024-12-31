'use client'

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import EditTagForm from "./edit-tag-form";
import deleteTag from "@/actions/delete-tag";

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
  } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";


interface TagTableRowProps {
    id: string,
    name: string,
    slug: string,
    date: string
}
export default function TagTableRow({ id, name, slug, date} : TagTableRowProps) {
    const { toast } = useToast();
    const [isEditFormActive, setIsEditFormActive] = useState(false);
    const [isDeleteCTAactive, setIsDeleteCTAactive] = useState(false);

    const handleDeleteTag = async () => {

        await deleteTag(id);

        setIsDeleteCTAactive(false);

        toast({
            title: 'Success',
            description: 'The tag has been deleted successfully!'
        });
    };

    return (
        <TableRow key={id}>
            <TableCell><span className="font-bold">{name}</span></TableCell>
            <TableCell>{slug}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>
                

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="link"><Ellipsis/></Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button 
                                    variant="ghost" 
                                    className="px-0 block w-full hover:no-underline justify-start cursor-pointer text-left"
                                    type="submit"
                                    onClick={() => { setIsEditFormActive(true) }}>Edit</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button 
                                        variant="ghost" 
                                        className="px-0 block w-full hover:no-underline justify-start cursor-pointer text-left"
                                        type="submit"
                                        onClick={() => { setIsDeleteCTAactive(true) }}>Delete</Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                        {/* edit form dialog */}
                        <Dialog open={isEditFormActive} onOpenChange={setIsEditFormActive}>
                            <DialogContent>
                                <DialogHeader>
                                        <DialogTitle>Edit Tag</DialogTitle>
                                        <EditTagForm tag={{id, name, slug}}/>
                                </DialogHeader>
                                
                            </DialogContent>
                        </Dialog>

                        {/* delete tag dialog */}
                        <Dialog open={isDeleteCTAactive} onOpenChange={setIsDeleteCTAactive}>
                            <DialogContent>
                                <DialogHeader>
                                        <DialogTitle>Delete Tag</DialogTitle>
                                        <DialogDescription>Are you sure you want to delete this tag?</DialogDescription>
                                        <div className="pt-4 flex justify-end">
                                            <Button variant="destructive" className="mr-4" onClick={() => { handleDeleteTag(); }}>Delete</Button>
                                            <Button variant="outline" onClick={() => { setIsDeleteCTAactive(false) }}>Cancel</Button>
                                        </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                    </DropdownMenu>

               
            </TableCell>
        </TableRow>
    );
}