"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { AppAlert } from "@/components/common/Alert";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(null); // limpiar error si está todo bien
    console.log("Register attempt:", { name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-neutral"
    >
      {/* Mostrar alerta si hay error */}
      {error && <AppAlert title="Error" description={error} />}

      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          type="text"
          placeholder="Andrei Ivanov"
          value={name}
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
        Registrarse
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
