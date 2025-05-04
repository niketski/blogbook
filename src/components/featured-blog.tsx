import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedBlogProps {
    title: string;
    date: string;
    category?: string;
    excerpt: string;
    imageUrl: string;
    link: string;
}

export default function FeaturedBlog({ 
    title,
    date,
    category,
    excerpt,
    imageUrl,
    link
 }: FeaturedBlogProps) {
    
    return (
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <div className="w-1/2">
            <Link href="#" className="block  relative">
              <canvas width="564" height="400" className="w-full"></canvas>
              <img src={imageUrl} alt={title} className="absolute top-0 left-0 w-full h-full"/>
            </Link>
          </div>
          <div className="w-1/2 p-10">
            <Badge className="mb-3">{category}</Badge>
            <h2 className="font-bold text-2xl mb-2">{title}</h2>
            <span className="text-gray-500 text-sm mb-5 block">{date}</span>
            <div>
              <p>{excerpt}</p>
            </div>
            <Button asChild className="mt-5" variant={'outline'}>
              <Link href={link}>Read more</Link>
            </Button>
          </div>
        </div>
    );
}