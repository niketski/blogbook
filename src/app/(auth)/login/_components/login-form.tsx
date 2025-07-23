'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { login } from "@/actions/auth";

export default function LoginForm() {
    const [formState, formAction, isPending] = useActionState(login, {
        status: 'idle',
        message: '',
        values: {
            username: '',
            password: ''
        },
        errors: {}
    });
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/admin';

    useEffect(() => {

        if(formState.status === 'success' ) {
            
            router.push(redirectPath);

        }

    }, [formState.status, router, redirectPath]);

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
                </div>
            }

            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="username" className="font-bold">Username</Label>
                <Input
                    className={`${formState.errors.username?.length ? 'border-red-500' : ''}`}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    defaultValue={formState.values.username}/>
                {formState.errors.username && <p className="text-xs text-red-500">{formState.errors.username.join(', ')}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="password" className="font-bold">Password</Label>
                <Input
                    className={`${formState.errors.password?.length ? 'border-red-500' : ''}`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    defaultValue={formState.values.password}/>
                    {formState.errors.password && <p className="text-xs text-red-500">{formState.errors.password.join(', ')}</p>}
            </div>
            <Button type="submit">
            {isPending ? 
                    <>Processing <LoaderCircle className="animate-spin"/></>: 
                'Submit'}
            </Button>
        </form>
    );
}