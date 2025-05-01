'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';
import z from 'zod';
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{[key: string] : string[] | undefined}>({
        username: [],
        password: [],
        _form: undefined
    });
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/admin';

    const loginFormSchema = z.object({
        username: z.string().min(1, { message: 'Username is required.' }),
        password: z.string().min(1, { message: 'Password is required.' })
    });

    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        const result = loginFormSchema.safeParse({
            username,
            password
        });

        if(!result.success) {
            const currentErrors = result.error.flatten().fieldErrors;

            setErrors(currentErrors);
            setIsLoading(false);

            return;
        }

        const response = await signIn('credentials', { redirect: false, username, password });
        
        if(response.error) {

            setErrors({
                _form: ['Invalid username or password, please try again.']
            });

            setIsLoading(false);
            
            return;
        }

        setIsLoading(false);
        setErrors({});
        router.push(callbackUrl);
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors._form && 
                <div className="mb-9">
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                            {errors._form[0]}
                        </AlertDescription>
                    </Alert>
                </div>
            }

            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="username" className="font-bold">Username</Label>
                <Input
                    className={`${errors.username?.length ? 'border-red-500' : ''}`}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={e => { setUsername(e.target.value) }}/>
                {errors.username && <p className="text-xs text-red-500">{errors.username.join(', ')}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="password" className="font-bold">Password</Label>
                <Input
                    className={`${errors.password?.length ? 'border-red-500' : ''}`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => { setPassword(e.target.value) }}/>
                    {errors.password && <p className="text-xs text-red-500">{errors.password.join(', ')}</p>}
            </div>
            <Button type="submit">
            {isLoading ? 
                    <>Processing <LoaderCircle className="animate-spin"/></>: 
                'Submit'}
            </Button>
        </form>
    );
}