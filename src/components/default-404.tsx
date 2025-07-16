import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Default404() {
    return (
        <div className="min-h-[85vh] flex justify-center items-center">
            <div className="custom-container">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8">Page not found.</h1>
                    <Button variant="default" asChild>
                        <Link href="/">Go back to homepage.</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}