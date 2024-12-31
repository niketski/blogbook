import { Button } from "@/components/ui/button";
import { Plus, Ellipsis } from "lucide-react";
import CreateTagForm from "./_components/create-tag-form";
import TagModel from "@/models/tag-model";
import TagTableRow from "./_components/tag-table-row";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export default async function BlogTagPage() {
    const tags = await TagModel.find({});

    return (
        <div>
            <div>
            <h1 className="font-bold text-4xl mb-10">Tags</h1>

            {/* create tag form */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button><Plus/> Create Tag</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Tag</DialogTitle>
                        <DialogDescription>
                            Create a new blog tag.
                        </DialogDescription>
                        <div className="pt-4">
                            <CreateTagForm/>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* tag table */}
            <div className="pt-[60px]">
                {tags &&

                    <div className="w-full overflow-auto">
                        <Table className="min-w-[800px]">
                            <TableHeader> 
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Action Column</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tags.map(data => {
                                    const date = new Intl.DateTimeFormat('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })
                                        .format(new Date(data.createdAt.toString()));
                                        
                                    return (
                                        
                                        <TagTableRow
                                            key={data._id.toString()}
                                            id={data._id.toString()}
                                            name={data.name}
                                            slug={data.slug}
                                            date={date}/>

                                    ); 
                                })}
                            </TableBody>
                        </Table>
                    </div>
                }
            </div>
        </div>
        </div>
    );
}