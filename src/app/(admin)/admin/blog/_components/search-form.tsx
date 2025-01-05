import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function SearchForm({ search } : { search: string | undefined }) {
    
    return (
        <form>
            <div className="flex items-center"> 
                <Input
                    placeholder="Search by keyword"
                    name="search"
                    id="search"
                    defaultValue={
                        search ? search : ''
                    }/>
                <Button 
                    variant="outline"
                    className="ml-3"
                    type="submit">Search</Button>
            </div>
        </form>
    );
}