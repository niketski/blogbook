'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from '@/components/ui/checkbox';
import { useRef, useState } from "react";
import Image from "next/image";
import createBlog from "@/actions/blog";
import { useActionState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils";
import {
Command,
CommandEmpty,
CommandGroup,
CommandInput,
CommandItem,
CommandList,
} from "@/components/ui/command";
import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover";
import ComboBox from "@/components/ui/combo-box";
import { IComboBoxOption } from "@/components/ui/combo-box";


const tagsOptions: IComboBoxOption[] = [
{
    value: "tag-1",
    label: "Tag 1",
},
{
    value: "tag-2",
    label: "Tag 2",
},
{
    value: "tag-3",
    label: "Tag 3",
}
];

export default function AdminCreateBlogForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [formState, formAction, isPending] = useActionState(createBlog, {
        message: '',
        values: {
            title: '',
            content: '',
            status: '',
            category: '',
            tags: '',
            featuredImage: undefined,
            metaTitle: '',
            metaDescription: '',
        },
        errors: {}
    });
    // const [tags, setTags] = useState([]);
    const [open, setOpen] = useState(false)
    const [tags, setTags] = useState<IComboBoxOption[]>([]);

    const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if(file) {

            const reader = new FileReader();

            reader.onload = () => {
                
                setImagePreview(reader.result as string);
            }

            reader.readAsDataURL(file);
        }
    };

    const handleUpdateImageClick = () => {
        inputRef.current?.click();
    };

    const handleRemoveFeaturedImage = () => {

        if(inputRef.current) {

            inputRef.current.value = '';
            
        }
        
        setImagePreview(null);

    };

    console.log(formState);

    return (
        <div>
            <form action={formAction}>

                <div className="flex flex-col-reverse xl:flex-row">
                    <div className="xl:w-3/4">
                        <div className="mb-5">
                            <Label 
                                htmlFor="title"
                                className="mb-2 block font-bold">Title</Label>
                            <Input
                                id="title"
                                name="title"/>
                        </div>

                        <div className="mb-10">
                            <Label
                                htmlFor="content"
                                className="mb-2 block font-bold">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                className="min-h-[300px]"/>
                        </div>

                        <div>
                            <h5 className="mb-8">Meta Data</h5>

                            <div className="mb-5">
                                <Label 
                                    htmlFor="meta-title"
                                    className="mb-2 block font-bold">Meta title</Label>
                                <Input
                                    id="meta-title"
                                    name="meta_title"/>
                            </div>

                            <div className="mb-5">
                                <Label 
                                    htmlFor="meta-description"
                                    className="mb-2 block font-bold">Meta description</Label>
                                <Textarea
                                    id="meta-description"
                                    name="meta_description"
                                    className="min-h-[150px]"/>
                            </div>

                            
                        </div>
                    </div>

                    <div className="mb-8 lg:mb-0 xl:w-1/4 xl:pl-8">
                        <div className="rounded-[6px] shadow p-5 xl:p-8">
                            <Button 
                                type="submit"
                                className="mb-5">Save</Button>

                            <div className="mb-5">
                                <Label 
                                    htmlFor="status"
                                    className="mb-2 block font-bold">Status</Label>
                                <Select name="status" defaultValue="draft">
                                    <SelectTrigger>
                                       <SelectValue placeholder="Draft"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="mb-5">
                                <Label className="mb-2 block font-bold">Category</Label>

                                <RadioGroup defaultValue="category-2" name="category">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="uncategorized" id="uncategorized"/>
                                        <Label htmlFor="uncategorized">Uncategorized</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="category-1" id="category-1"/>
                                        <Label htmlFor="category-1">Category 1</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="category-2" id="category-2"/>
                                        <Label htmlFor="category-2">Category 2</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="mb-5">
                                <Label className="mb-2 block font-bold">Tags</Label>
                                <div>
                                    <Input
                                        name="tags"
                                        className="hidden" 
                                        defaultValue={`${tags && tags.map(item => item.value)}`}/>

                                        <ComboBox
                                            options={tagsOptions}
                                            selectedOptions={tags}
                                            setComboBoxState={setTags}
                                            placeholder="Click to select tags..."/>
                                            
                                </div>
                                <noscript>
                                    <div className="flex items-center mb-2">
                                        <Checkbox 
                                            name="tags[]" 
                                            value="Tag 1"
                                            id="tag-1"/>

                                        <Label htmlFor="tag-1" className="ml-[10px]">Tag 1</Label>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <Checkbox 
                                            name="tags[]" 
                                            value="Tag 2"
                                            id="tag-2"/>

                                        <Label htmlFor="tag-2" className="ml-[10px]">Tag 2</Label>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <Checkbox 
                                            name="tags[]" 
                                            value="Tag 3"
                                            id="tag-3"/>

                                        <Label htmlFor="tag-3" className="ml-[10px]">Tag 3</Label>
                                    </div>
                                </noscript>
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="featured-image" className="mb-2 block font-bold">Featured Image</Label>
                                <div className="relative max-w-[300px] xl:max-w-full">
                                    <Input
                                        type="file"
                                        name="featured_image"
                                        id="featured-image"
                                        accept="image/*"
                                        onChange={handleInputFileChange}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        ref={inputRef}/>

                                    {
                                        !imagePreview &&
                                        <p className="top-1/2 left-0 w-full text-center -translate-y-1/2 absolute text-[13px] pointer-events-none">Click here to select image.</p>
                                    }

                                    {imagePreview ? 
                                        <Image 
                                            src={imagePreview} 
                                            width="300"     
                                            height="280" 
                                            alt="Image Preview"
                                            className="rounded h-[180px] object-cover object-center"/> : 
                                            
                                            <div className="w-full h-[180px] bg-gray-100 rounded"></div>
                                        }
                                </div>

                                {imagePreview &&
                                    <div className="pt-4">
                                        <Button 
                                            onClick={handleUpdateImageClick} 
                                            variant="ghost" 
                                            type="button" 
                                            className="inline-block mr-2">Update</Button>

                                        <Button 
                                            onClick={handleRemoveFeaturedImage} 
                                            variant="destructive" 
                                            type="button" 
                                            className="inline-block">Remove</Button>
                                    </div>
                                }
                                
                                    
                            </div>

                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}