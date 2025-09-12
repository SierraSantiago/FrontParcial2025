import { RegisterForm } from "@/components/auth/registerForm";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center space-y-6 w-full flex flex-col items-center">
                <h1 className="text-3xl font-bold text-primary">
                    Crea tu cuenta
                </h1>
                <p className="text-accent">Regístrate para comenzar</p>
                <RegisterForm />
            </div>
        </div>
    );
}
