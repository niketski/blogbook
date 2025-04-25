import LoginForm from "./_components/login-form";

export default function LoginPage() {
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