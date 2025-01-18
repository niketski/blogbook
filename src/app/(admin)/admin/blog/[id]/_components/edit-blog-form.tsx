'use client'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ComboBox from "@/components/ui/combo-box";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef, useEffect } from "react";
import { IComboBoxOption } from "@/components/ui/combo-box";
import Image from "next/image";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { IBlog } from "@/models/blog-model";

interface EditBlogFormProps {
    blog: string,
    categoriesOption: IComboBoxOption[],
    tagsOptions: IComboBoxOption[]
}

export interface BlogDetails {
    id: string,
    title: string,
    slug: string,
    status: string,
    metaTitle: string,
    content: string,
    metaDescription: string,
    featuredImage: {
        id: string,
        url: string
    },
    category: string,
    tags: IComboBoxOption[]
    
}

export default function EditBlogForm({ blog, categoriesOption, tagsOptions } : EditBlogFormProps) {
    let isPending = false;
    const currentBlog: BlogDetails = JSON.parse(blog);
    const [tags, setTags] = useState<IComboBoxOption[]>(currentBlog.tags);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isFileExceeded, setIsFileExceeded] = useState(false);
    

    const handleUpdateImageClick = () => {
        inputRef.current?.click();
    };

    const handleRemoveFeaturedImage = () => {

        if(inputRef.current) {

            inputRef.current.value = '';
            
        }
        
        setImagePreview('');
        setIsFileExceeded(false);

    };

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

    const readImageUrl = async (imageUrl: string): Promise<Blob | string> => {

        try {
            const response = await fetch(imageUrl);

            if(!response.ok) {

                throw new Error(`Failed to fetch: ${imageUrl}`);

            }

            const blob: Blob = await response.blob();
            const reader = new FileReader;

            reader.onloadend = () => {
               
                setImagePreview(reader.result as string);
                
            };

            reader.readAsDataURL(blob);
        

            return blob;
        
        } catch(error: any) {

            return 'Error: ' + error;
        }

    };

    useEffect(() => {

        readImageUrl(currentBlog.featuredImage.url);

    }, []);
    

    return (
        <div>
            <form>
                <div className="flex flex-col-reverse xl:flex-row">
                    <div className="xl:w-3/4">

                        {/* {formState.errors._form && 
                            <Alert variant="destructive" className="mb-9">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {formState.errors._form}
                                </AlertDescription>
                            </Alert>
                        } */}

                        <div className="mb-5">
                            <Label 
                                htmlFor="title"
                                className="mb-2 block font-bold">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={currentBlog.title}/>
                        </div>

                        <div className="mb-10"> 
                            <Label
                                htmlFor="content"
                                className="mb-2 block font-bold">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                className={`min-h-[300px]`}
                                defaultValue={currentBlog.content}/>
                        </div>

                        <div>
                            <h5 className="mb-8">Meta Data</h5>

                            <div className="mb-5">
                                <Label 
                                    htmlFor="meta-title"
                                    className="mb-2 block font-bold">Meta title</Label>
                                <Input
                                    id="meta-title"
                                    name="metaTitle"
                                    defaultValue={currentBlog.metaTitle}/>
                            </div>

                            <div className="mb-5">
                                <Label 
                                    htmlFor="meta-description"
                                    className="mb-2 block font-bold">Meta description</Label>
                                <Textarea
                                    id="meta-description"
                                    name="metaDescription"
                                    className="min-h-[150px]"
                                    defaultValue={currentBlog.metaDescription}/>
                            </div>

                            
                        </div>

                    </div>
                    <div className="mb-8 lg:mb-0 xl:w-1/4 xl:pl-8">
                        <div className="rounded-[6px] shadow p-5 xl:p-8">
                            <Button 
                                    type="submit"
                                    className={`mb-5 ${isPending ? 'pointer-events-none' : ''}`} 
                                    disabled={isPending ? true : false}>

                                        {isPending ? 'Processing...' : 'Update'}
                                        
                                        {isPending ? <LoaderCircle className="animate-spin"/> : ''}

                            </Button>


                            <div className="mb-5">
                                <Label 
                                    htmlFor="status"
                                    className="mb-2 block font-bold">Status</Label>
                                <Select name="status" defaultValue={currentBlog.status}>
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

                                <RadioGroup defaultValue={currentBlog.category} name="category">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="uncategorized" id="uncategorized"/>
                                        <Label htmlFor="uncategorized">Uncategorized</Label>
                                    </div>

                                    {categoriesOption.map(item => {
                                        return (
                                            <div className="flex items-center space-x-2" key={item.value}>
                                                <RadioGroupItem value={item.value} id={item.value}/>
                                                <Label htmlFor={item.value}>{item.label}</Label>
                                            </div>
                                        );
                                    })}

                                </RadioGroup>
                            </div>

                            <div className="mb-5">
                                <Label className="mb-2 block font-bold">Tags</Label>
                                <div>
                                    <Input
                                        name="tags"
                                        className="hidden" 
                                        defaultValue={``}/>

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
                                        name="featured_image_file"
                                        id="featured-image"
                                        accept="image/*"
                                        onChange={handleInputFileChange}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        ref={inputRef}/>

                                    <Input
                                        type="hidden"
                                        name="featuredImage"
                                        defaultValue={imagePreview}/>

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
                                                className={`rounded h-[180px] object-cover object-center`}/> : 
                                            
                                            <div className={`w-full h-[180px] bg-gray-100 rounded`}></div>
                                        }
                                </div>

                                {/* formState.errors.featuredImage ? <p className="text-sm text-red-500 mt-4">{formState.errors.featuredImage[0]}</p> : ''; */}

                                {/* isFileExceeded ? <p className="text-sm text-red-500 mt-4">Please use image less than 10 MB.</p> : '' */}

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