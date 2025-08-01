import Link from "next/link";

export default function Header() {
    return (
        <header className="py-5 border-b border-gray-300 fixed top-0 left-0 w-full bg-white z-10">
            <div className="px-5">
                <h2 className="font-bold text-3xl mb-0">
                    <Link href="/">Blogbook</Link>
                </h2>
            </div>
        </header>
    );
}