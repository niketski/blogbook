import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
    title: string;
    date: string;
    category?: string;
    excerpt: string;
    imageUrl: string;
    link: string;
}

export default function BlogCard({ 
    title,
    date,
    category,
    excerpt,
    imageUrl,
    link
 }: BlogCardProps) {
    
    return (
        <div className="border-gray-300 border rounded-lg overflow-hidden">
          <div className="w-full">
            <Link href="#" className="block  relative">
              <canvas width="549" height="300" className="w-full"></canvas>
              <img src={imageUrl} alt={title} className="absolute top-0 left-0 w-full h-full object-cover object-center grayscale transition duration-300 ease-in-out hover:grayscale-0"/>
            </Link>
          </div>
          <div className="w-full p-6 lg:p-10">
            {category && <Badge className="mb-3">{category}</Badge>}
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