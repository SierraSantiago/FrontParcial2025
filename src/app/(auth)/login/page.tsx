import { LoginForm } from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[--color-background]">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-[--color-primary]">
          Bienvenido 
        </h1>
        <p className="text-[--color-accent]">Ingresa tus credenciales</p>
        <LoginForm />
      </div>
    </div>
  );
}
