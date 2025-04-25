'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import register from "@/actions/register";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
    const [formState, formAction, isPending] = useActionState(register, {
        status: 'idle',
        message: '',
        values: {
            name: '',
            username: '',
            email: '',
            address: '',
            password: '',
            confirmPassword: '',
        },
        errors: {}
    });
    const status = formState.status;
    const { toast } = useToast();
    const router = useRouter();

   useEffect(() => {

        if(status === 'success') {
            
            toast({
                title: 'Success!',
                description: formState.message
            });

            // redirect to login page
            setTimeout(() => {
                router.push('/login');
            }, 2000)
        }

   }, [status, formState.message, toast]);
   
    return (
        <form action={formAction}>
            {formState.errors._form && 
                <div className="mb-9">
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                            {formState.errors._form}
                        </AlertDescription>
                    </Alert>
                    <Link href="/login" className={`${buttonVariants({ variant: 'secondary' })} inline-block`}>Go to login page <ChevronRight/></Link>
                </div>
            }
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="name" className="font-bold">Name</Label>
                <Input 
                    className={`${formState.errors.name ? 'border-red-500' : ''}`}
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Name" 
                    defaultValue={formState.values.name}/>
                {formState.errors.name && <p className="text-xs text-red-500">{formState.errors.name.join(', ')}</p>}
            </div>
            <div className="flex gap-4 items-start">
                <div className="grid w-1/2 items-center gap-1.5 mb-4">
                    <Label htmlFor="username" className="font-bold">Username</Label>
                    <Input 
                        className={`${formState.errors.username ? 'border-red-500' : ''}`}
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Username" 
                        defaultValue={formState.values.username}/>
                    {formState.errors.username && <p className="text-xs text-red-500">{formState.errors.username.join(', ')}</p>}
                </div>
                <div className="grid w-1/2 items-center gap-1.5 mb-4">
                    <Label htmlFor="email" className="font-bold">Email</Label>
                    <Input 
                        className={`${formState.errors.email ? 'border-red-500' : ''}`}
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email" 
                        defaultValue={formState.values.email}/>
                    {formState.errors.email && <p className="text-xs text-red-500">{formState.errors.email.join(', ')}</p>}
                </div>
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="address" className="font-bold">Address</Label>
                <Input 
                    className={`${formState.errors.address ? 'border-red-500' : ''}`}
                    type="text" 
                    id="address" 
                    name="address" 
                    placeholder="Street / district or barangay / city" 
                    defaultValue={formState.values.address}/>
                {formState.errors.address && <p className="text-xs text-red-500">{formState.errors.address.join(', ')}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="password" className="font-bold">Password</Label>
                <Input 
                    className={`${formState.errors.password ? 'border-red-500' : ''}`}
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Password" 
                    defaultValue={formState.values.password}/>
                {formState.errors.password && <p className="text-xs text-red-500">{formState.errors.password.join(', ')}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="confirmPassword" className="font-bold">Confirm password</Label>
                <Input 
                    className={`${formState.errors.confirmPassword ? 'border-red-500' : ''}`}
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="Confirm password" 
                    defaultValue={formState.values.confirmPassword}/>
                {formState.errors.confirmPassword && <p className="text-xs text-red-500">{formState.errors.confirmPassword.join(', ')}</p>}
            </div>
                <Button type="submit">
                {isPending ? 
                     <>Processing <LoaderCircle className="animate-spin"/></>: 
                    'Submit'}
                </Button>
        </form>
    );
}