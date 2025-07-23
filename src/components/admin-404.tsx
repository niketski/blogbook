import { Button } from "./ui/button";
import Link from "next/link";

export default function AdminNotFound() {
    return (
        <div className="min-h-[50vh] flex items-center">
            <div className="text-center w-full">
                <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8">Page not found.</h1>
                <Button variant="default" asChild>
                    <Link href="/admin">Go back to Admin Dashboard.</Link>
                </Button>
            </div>
        </div>
    );
}