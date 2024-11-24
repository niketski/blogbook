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

export default function AdminCreateBlogForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

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

    return (
        <div>
            <form>

                <div className="flex">
                    <div className="w-3/4">
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
                                    name="meta-title"/>
                            </div>

                            <div className="mb-5">
                                <Label 
                                    htmlFor="meta-description"
                                    className="mb-2 block font-bold">Meta description</Label>
                                <Textarea
                                    id="meta-description"
                                    name="meta-description"
                                    className="min-h-[150px]"/>
                            </div>

                            
                        </div>
                    </div>

                    <div className="w-1/4 pl-8">
                        <div className="rounded-[6px] shadow p-8">
                            <Button 
                                type="submit"
                                className="mb-5">Save</Button>

                            <div className="mb-5">
                                <Label 
                                    htmlFor="status"
                                    className="mb-2 block font-bold">Status</Label>
                                <Select>
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
                                <div className="flex items-center mb-2">
                                    <Checkbox 
                                        name="tags" 
                                        value="Tag 1"
                                        id="tag-1"/>

                                    <Label htmlFor="tag-1" className="ml-[10px]">Tag 1</Label>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Checkbox 
                                        name="tags" 
                                        value="Tag 2"
                                        id="tag-2"/>

                                    <Label htmlFor="tag-2" className="ml-[10px]">Tag 2</Label>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Checkbox 
                                        name="tags" 
                                        value="Tag 3"
                                        id="tag-3"/>

                                    <Label htmlFor="tag-3" className="ml-[10px]">Tag 3</Label>
                                </div>
                                
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="featured-image" className="mb-2 block font-bold">Featured Image</Label>
                                <div className="relative">
                                    <Input
                                        type="file"
                                        name="featured-image"
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
                                            
                                            <div className="w-[300px] h-[180px] bg-gray-100 rounded"></div>
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