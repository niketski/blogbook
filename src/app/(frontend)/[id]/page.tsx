import BackButton from "@/components/back-button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function BlogDetailsPage() {
    const defaultImage = 'https://res.cloudinary.com/dndtvwfvg/image/upload/v1738577422/blogbook/download_iszr5d.jpg';

    return (
        <div className="py-[80px]">
            <div className="px-5">
                <div className="mx-auto max-w-[1170px] min-h-[1500px]">
                    <div className="mb-8">
                        <BackButton><ChevronLeft size={30}/> Back</BackButton>
                    </div>
                    <div className="mb-10">
                        <Image
                            className="rounded-lg h-[430px] w-full object-cover"
                            src="https://res.cloudinary.com/dndtvwfvg/image/upload/v1738577422/blogbook/download_iszr5d.jpg"
                            width={1170}
                            height={430}
                            alt={'Featured Image'}/>
                    </div>
                    <div className="mb-5">
                        <span className="border border-primary rounded-full font-bold px-3 py-2 bg-primary text-white text-sm">Uncategorized</span>
                    </div>
                    <h1 className="font-bold text-7xl mb-5">Sample Blog</h1>
                    <span className="mb-10 block text-lg">3/5/2025</span>
                    <div>
                        <p className="mb-4">orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="mb-10">
                        <ul className="flex items-center gap-2 mt-5">
                            <li><Badge className="bg-transparent border border-primary text-primary hover:bg-transparent">Tag 1</Badge></li>
                            <li><Badge className="bg-transparent border border-primary text-primary hover:bg-transparent">Tag 2</Badge></li>
                            <li><Badge className="bg-transparent border border-primary text-primary hover:bg-transparent">Tag 3</Badge></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}