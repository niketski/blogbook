import LoginForm from "./_components/login-form";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {

    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if(session) {

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