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
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import createBlog from "@/actions/blog";
import { useActionState } from "react";
import ComboBox from "@/components/ui/combo-box";
import { IComboBoxOption } from "@/components/ui/combo-box";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isExceededFileLimit } from "@/lib/utils";

interface AdminCreateBlogFormProps {
    categoriesOptions: IComboBoxOption[],
    tagsOptions: IComboBoxOption[]
}

export default function AdminCreateBlogForm({ categoriesOptions, tagsOptions } : AdminCreateBlogFormProps) {
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isFileExceeded, setIsFileExceeded] = useState(false);
    const [formState, formAction, isPending] = useActionState(createBlog, {
        message: '',
        status: 'pending',
        values: {
            title: '',
            content: '',
            status: '',
            category: '',
            tags: '',
            featuredImage: '',
            metaTitle: '',
            metaDescription: '',
        },
        errors: {}
    });

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
        
        setImagePreview('');
        setIsFileExceeded(false);

    };

    useEffect(() => {
        
        // clear some of the data after successfull submition
        if(formState.status === 'success') {

            setImagePreview('');

            setTags([]);

            toast({
                title: 'Success',
                description: 'The blog has been created successfully!'
            });
        }

    }, [formState.status]);

    useEffect(() => {

        const result = isExceededFileLimit({
            file: imagePreview,
            maxMb: 10
        });

        if(result) {

            setIsFileExceeded(true);

        } else {
            
            setIsFileExceeded(false);

        }

    }, [imagePreview]);

    // console.log(categoriesOptions);
    // console.log(tagsOptions);
    console.log(tags);

    return (
        <div>
            <form action={formAction}>

                <div className="flex flex-col-reverse xl:flex-row">
                    <div className="xl:w-3/4">
                    {formState.errors._form && 
                        <Alert variant="destructive" className="mb-9">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                {formState.errors._form}
                            </AlertDescription>
                        </Alert>
                    }
                        <div className="mb-5">
                            <Label 
                                htmlFor="title"
                                className="mb-2 block font-bold">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={formState.values.title}
                                className={`${formState.errors.title ? 'border-red-500' : ''}`}/>

                            {formState.errors.title &&
                                <p className="text-sm text-red-500 mt-4">{formState.errors.title.join(', ')}</p>
                            }
                        </div>

                        <div className="mb-10"> 
                            <Label
                                htmlFor="content"
                                className="mb-2 block font-bold">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                className={`min-h-[300px] ${formState.errors.content ? 'border-red-500' : ''}`}
                                defaultValue={formState.values.content}/>

                            {formState.errors.content &&
                                <p className="text-sm text-red-500 mt-4">{formState.errors.content[0]}</p>
                            }
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
                                    defaultValue={formState.values.metaTitle}/>
                            </div>

                            <div className="mb-5">
                                <Label 
                                    htmlFor="meta-description"
                                    className="mb-2 block font-bold">Meta description</Label>
                                <Textarea
                                    id="meta-description"
                                    name="metaDescription"
                                    className="min-h-[150px]"
                                    defaultValue={formState.values.metaDescription}/>
                            </div>

                            
                        </div>
                    </div>

                    <div className="mb-8 lg:mb-0 xl:w-1/4 xl:pl-8">
                        <div className="rounded-[6px] shadow p-5 xl:p-8">
                            <Button 
                                type="submit"
                                className={`mb-5 ${isPending ? 'pointer-events-none' : ''}`} 
                                disabled={isPending ? true : false}>

                                    {isPending ? 'Processing...' : 'Save'}
                                    
                                    {isPending ? <LoaderCircle className="animate-spin"/> : ''}

                            </Button>

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

                            {categoriesOptions &&
                                <div className="mb-5">
                                    <Label className="mb-2 block font-bold">Category</Label>

                                    <RadioGroup defaultValue="category-2" name="category">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="uncategorized" id="uncategorized"/>
                                            <Label htmlFor="uncategorized">Uncategorized</Label>
                                        </div>

                                        {categoriesOptions.map(option => {
                                            return (
                                                <div className="flex items-center space-x-2" key={option.value}>
                                                    <RadioGroupItem value={option.value} id={option.value}/>
                                                    <Label htmlFor={option.value}>{option.label}</Label>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </div>
                            }

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
                                        name="featured_image_file"
                                        id="featured-image"
                                        accept="image/*"
                                        onChange={handleInputFileChange}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        ref={inputRef}/>

                                    <Input
                                        type="hidden"
                                        name="featuredImage"/>

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
                                                className={`rounded h-[180px] object-cover object-center ${(formState.errors.featuredImage || isFileExceeded) ? 'border border-red-500' : ''}`}/> : 
                                            
                                            <div className={`w-full h-[180px] bg-gray-100 rounded ${(formState.errors.featuredImage || isFileExceeded) ? 'border border-red-500' : ''}`}></div>
                                        }
                                </div>

                                {formState.errors.featuredImage ? <p className="text-sm text-red-500 mt-4">{formState.errors.featuredImage[0]}</p> : ''}
                                {isFileExceeded ? <p className="text-sm text-red-500 mt-4">Please use image less than 10 MB.</p> : ''}

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