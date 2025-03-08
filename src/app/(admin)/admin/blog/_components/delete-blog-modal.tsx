'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {useState } from "react";

interface DeleteBlogModalProps {
    blogId: string,
    blogTitle: string
}

export default function DeleteBlogModal({ blogId, blogTitle } : DeleteBlogModalProps) {
    const [open, setOpen] = useState(false);
    
    return (
        <>
            <DropdownMenuItem asChild>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button 
                            type="button" 
                            variant="ghost" 
                            className="w-full text-left inline-block px-[8px]"
                            onClick={() => setOpen(true)}>Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="mb-5 leading-6">Are you sure you want to delete &quot;{blogTitle}&quot;?</DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-end">
                            {/* <Button variant="destructive" className="mr-3">Yes</Button> */}
                            <form className="mr-3">
                                <input type="text" name="blogId" defaultValue={blogId} className="hidden"/>
                                <Button type="submit" variant="destructive">Yes</Button>
                            </form>
                            <Button variant={'outline'} onClick={() => { setOpen(false) }}>No</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </DropdownMenuItem>
        </>
    )
}