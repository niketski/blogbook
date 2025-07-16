'use client'

import { Label } from "@/components/ui/label";  
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ComboBox from "@/components/ui/combo-box";
import { useState, useRef, useEffect, useActionState } from "react";
import { IComboBoxOption } from "@/components/ui/combo-box";
import Image from "next/image";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import EditBlog from "@/actions/edit-blog";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Eye } from "lucide-react";
import RichTextEditor from "@/components/rich-text-editor";

interface EditBlogFormProps {
    blog: string,
    categoriesOption: IComboBoxOption[],
    tagsOptions: IComboBoxOption[]
}

export interface BlogDetails {
    id: string,
    title: string,
    excerpt: string,
    slug: string,
    status: string,
    metaTitle: string,
    content: string,
    metaDescription: string,
    featuredImage?: {
        id: string,
        url: string
    },
    category?: string,
    tags: IComboBoxOption[]
    
}

export default function EditBlogForm({ blog, categoriesOption, tagsOptions } : EditBlogFormProps) {
    const { toast } = useToast();
    const currentBlog: BlogDetails = JSON.parse(blog);
    const [tags, setTags] = useState<IComboBoxOption[]>(currentBlog.tags);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [blogContent, setBlogContent] = useState(currentBlog.content);
    const [isFileExceeded, setIsFileExceeded] = useState(false);
    const [formState, formAction, isPending] = useActionState(EditBlog, {
        status: 'idle',
        message: '',
        values: {
            title: currentBlog.title,
            slug: currentBlog.slug ? currentBlog.slug : currentBlog.id,
            excerpt: currentBlog.excerpt,
            status: currentBlog.status,
            metaTitle: currentBlog.metaTitle,
            metaDescription: currentBlog.metaDescription,
            featuredImage: '',
            featuredImageId: currentBlog.featuredImage?.id,
            featuredImageUrl: currentBlog.featuredImage?.url,
            content: currentBlog.content,
            category: currentBlog.category,
            tags: ''
        },
        errors: {}
    });
    const [originUrl, setOriginUrl] = useState<null | string>(null);
    const currentFeaturedImageUrl = formState.values.featuredImageUrl ? formState.values.featuredImageUrl : currentBlog.featuredImage?.url;
    
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
                
                console.log('read image url', reader.result as string)
                setImagePreview(reader.result as string);

            };

            reader.readAsDataURL(blob);
        

            return blob;
        
        } catch(error) {

            return 'Error: ' + error;
        }

    };

    useEffect(() => {

        // check if has image
        if(currentBlog.featuredImage && Object.keys(currentBlog.featuredImage).length) {

            const imageUrl = formState.values.featuredImageUrl ? formState.values.featuredImageUrl : currentBlog.featuredImage.url;
           
            readImageUrl(imageUrl);
        } 
        
        // initialize base url for slug
        if(window.location.origin) {
            
            setOriginUrl(window.location.origin);

        }

    }, [currentFeaturedImageUrl]);

    useEffect(() => {
        
        // clear some of the data after successfull submition
        if(formState.status === 'success') {

            // setTags([]);

            toast({
                title: 'Success',
                description: 'The blog has been updated successfully!'
            });
        }

    }, [formState.status, toast]);

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

                        <Input
                            type="hidden"
                            name="blogId"
                            defaultValue={currentBlog.id}
                            className="hidden"/>

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

                        <div className="mb-5">
                            <Label
                                htmlFor="slug"
                                className="mb-2 block font-bold">Slug</Label>
                            <div className="flex items-center">
                                {originUrl && <span className="text-sm">{`${originUrl}/`}</span>}
                                <Input
                                    className={`${formState.errors.slug ? 'border-red-500' : ''}`}
                                    id="slug"
                                    name="slug"
                                    defaultValue={formState.values.slug}/>
                            </div>

                            {formState.errors.slug &&
                                <p className="text-sm text-red-500 mt-4">{formState.errors.slug.join(', ')}</p>
                            }
                        </div>

                        <div className="mb-5">
                            <Label 
                                htmlFor="excerpt"
                                className="mb-2 block font-bold">Excerpt</Label>
                            <Textarea
                                id="excerpt"
                                name="excerpt"
                                className={`min-h-[80px] ${formState.errors.excerpt ? 'border-red-500' : ''}`}
                                defaultValue={formState.values.excerpt}/>

                                
                            {formState.errors.excerpt &&
                                <p className="text-sm text-red-500 mt-4">{formState.errors.excerpt[0]}</p>
                            }
                        </div>

                        <div className="mb-10">
                            <Label
                                htmlFor="content"
                                className="mb-2 block font-bold">Content</Label>
                            <RichTextEditor 
                                value={blogContent} 
                                onChange={setBlogContent}/>
                            <input 
                                type="hidden" 
                                name="content" 
                                value={blogContent}/>
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

                                        {isPending ? 'Processing...' : 'Update'}
                                        
                                        {isPending ? <LoaderCircle className="animate-spin"/> : ''}

                            </Button>

                            <div className="mb-5">
                                <Link 
                                    href={`/${formState.values.slug}`} 
                                    className="inline-flex items-center" target="_blank">
                                        <Eye className="mr-1"/> View
                                </Link>
                            </div>


                            <div className="mb-5">
                                <Label 
                                    htmlFor="status"
                                    className="mb-2 block font-bold">Status</Label>
                                <Select name="status" defaultValue={formState.values.status}>
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

                                <RadioGroup defaultValue={formState.values.category ? formState.values.category : 'uncategorized'} name="category">
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
                                        defaultValue={`${tags && tags.map(item => item.value)}`}/>

                                        <ComboBox
                                            options={tagsOptions}
                                            selectedOptions={tags}
                                            setComboBoxState={setTags}
                                            placeholder="Click to select tags..."/>
                                            
                                </div>
                        
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

                                    
                                    <Input
                                        type="hidden"
                                        name="featuredImageUrl"
                                        defaultValue={formState.values.featuredImageUrl}
                                        className="hidden"/>

                                    <Input
                                        type="hidden"
                                        name="featuredImageId"
                                        defaultValue={formState.values.featuredImageId}
                                        className="hidden"/>

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