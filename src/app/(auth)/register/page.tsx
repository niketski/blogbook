import RegistrationForm from "./_components/registration-form";

export default function RegisterPage() {
    return (
        <section className="pt-16">
            <div className="min-h-[80vh]">
                <h1 className="text-center font-bold text-4xl tracking-wide mb-10">Register</h1>
                <div className="mx-auto max-w-[600px]">
                    <RegistrationForm/>
                </div>
            </div>
        </section>
    );
}