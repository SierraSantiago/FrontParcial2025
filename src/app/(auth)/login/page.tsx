import { LoginForm } from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-primary">
          Bienvenido 
        </h1>
        <p className="text-accent">Ingresa tus credenciales</p>
        <LoginForm />
      </div>
    </div>
  );
}
