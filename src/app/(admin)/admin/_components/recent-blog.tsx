import Link from "next/link";

interface RecentBlog {
    title: string,
    date: string,
    link: string
}

export default function RecentBlog({ title, date, link = '#' } : RecentBlog) {
    return (
        <article className="flex items-start justify-between border-b py-3">
            <div>
                <h3 className="font-bold text-xl mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{date}</p>
            </div>
            <Link 
                href={link} 
                target="_blank"
                className="bg-primary text-white rounded-lg px-5 py-2 leading-none hover:bg-gray-800">View</Link>
        </article>
    );
}