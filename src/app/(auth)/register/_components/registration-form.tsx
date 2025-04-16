import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegistrationForm() {
    return (
        <form>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="name" className="font-bold">Name</Label>
                <Input type="text" id="name" placeholder="Name" />
                {/* <p className="text-xs text-red-500">error message.</p> */}
            </div>
            <div className="flex gap-4">
                <div className="grid w-1/2 items-center gap-1.5 mb-4">
                    <Label htmlFor="username" className="font-bold">Username</Label>
                    <Input type="text" id="username" placeholder="Username" />
                    {/* <p className="text-xs text-red-500">error message.</p> */}
                </div>
                <div className="grid w-1/2 items-center gap-1.5 mb-4">
                    <Label htmlFor="email" className="font-bold">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                    {/* <p className="text-xs text-red-500">error message.</p> */}
                </div>
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="address" className="font-bold">Address</Label>
                <Input type="text" id="address" placeholder="Addresss" />
                {/* <p className="text-xs text-red-500">error message.</p> */}
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="password" className="font-bold">Password</Label>
                <Input type="password" id="password" placeholder="Password" />
                {/* <p className="text-xs text-red-500">error message.</p> */}
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
}