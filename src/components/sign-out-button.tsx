import { logOut } from "@/actions/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
    return (
        <form action={logOut}>
            <Button 
                type="submit"
                variant="ghost">
                    <LogOut/> Signout
                </Button>
        </form>
    );
}