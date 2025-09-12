"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const mismatch = 
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) return setError("El nombre es obligatorio.");
    if (!email.trim()) return setError("El email es obligatorio.");
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (mismatch) return setError("Las contraseñas no coinciden.");

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!response.ok) throw new Error((await response.json()).message || 'Registration failed');

      router.push("/daemon");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-neutral"
    >
      

      <div className="space-y-2">
        <Label htmlFor="fullName">Nombre</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Andrei Ivanov"
          value={fullName}
          onChange={(e) => setName(e.target.value)}
          className="border-accent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="andrei@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-accent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-accent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-accent"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        {loading ? "Creando cuenta..." : "Registrarse"}
      </Button>

      <p className="text-center text-sm text-accent">
        ¿Ya tienes cuenta?{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-primary font-semibold cursor-pointer hover:underline"
        >
          Inicia sesión
        </span>
      </p>
    </form>
  );
}
