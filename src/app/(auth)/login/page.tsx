import LoginForm from "./_components/login-form";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LoginPage({ searchParams }: PageProps) {

    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);
    const redirectUrl = (await searchParams)?.redirect;

    if(session && !redirectUrl) {

        redirect('/admin');
    }

    return (
        <section className="pt-16">
            <div className="min-h-[80vh]">
                <h1 className="text-center font-bold text-4xl tracking-wide mb-10">Login</h1>
                <div className="mx-auto max-w-[600px]">
                    <LoginForm/>
                </div>
            </div>
        </section>
    );
}