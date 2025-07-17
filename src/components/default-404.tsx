import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Default404() {
    return (
        <div className="min-h-[85vh] flex justify-center items-center">
            <div className="custom-container">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Page not found.</h1>
                    <p className="mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                    <Button variant="default" asChild>
                        <Link href="/">Go back to homepage.</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}