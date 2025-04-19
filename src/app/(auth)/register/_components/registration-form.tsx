'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import register from "@/actions/register";
import { useActionState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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


   useEffect(() => {

        console.log(status);
        console.log(status === 'success');
        
        if(status === 'success') {
            
            toast({
                title: 'Success!',
                description: formState.message
            });
        }

   }, [status]);

   console.log(formState);

    return (
        <form action={formAction}>
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