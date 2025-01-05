import { FileSearch } from "lucide-react";
export default async function NoBlogResult() {
    return (
        <div className="flex flex-col items-center justify-center">
            <FileSearch size={70} className="mb-8"/>
            <h1>No Results found.</h1>
        </div>
        
    );
}