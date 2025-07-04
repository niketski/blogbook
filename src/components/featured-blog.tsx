import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FeaturedBlogProps {
    title: string;
    date: string;
    category?: string;
    excerpt: string;
    imageUrl?: string;
    link: string;
}

export default function FeaturedBlog({ 
    title,
    date,
    category,
    excerpt,
    imageUrl = 'https://res.cloudinary.com/dndtvwfvg/image/upload/v1738577422/blogbook/download_iszr5d.jpg',
    link
 }: FeaturedBlogProps) {
    
    return (
        <div className="lg:flex border border-gray-300 rounded-lg overflow-hidden">
          <div className="lg:w-1/2">
            <Link href={link} className="block  relative">
              <canvas width="564" height="400" className="w-full"></canvas>
              <Image
                src={imageUrl}
                alt={title}
                width="564" 
                height="400"
                className="absolute top-0 left-0 w-full h-full object-cover object-center grayscale transition duration-300 ease-in-out hover:grayscale-0"
                />
            </Link>
          </div>
          <div className="lg:w-1/2 p-6 lg:p-10">
            <Badge className="mb-3">{category}</Badge>
            <h2 className="font-bold text-2xl mb-2">{title}</h2>
            <span className="text-gray-500 text-sm mb-5 block">{date}</span>
            <div>
              <p>{excerpt}</p>
            </div>
            <Button asChild className="mt-5">
              <Link href={link}>Read more</Link>
            </Button>
          </div>
        </div>
    );
}