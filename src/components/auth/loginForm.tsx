"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/common/Button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error((await response.json()).message || 'Login failed');

      const data = await response.json();
      console.log("login data =>", data);

      const meRes = await fetch("/api/auth/me", { cache: "no-store" });
      const me = await meRes.json();
      console.log("me =>", me); 


      router.push("/resistance");
      console.log(await response.json());
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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="andrei@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-accent"
          autoComplete="email"
          required
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
          autoComplete="current-password"
          required
        />
      </div>

      { error && <p className="text-red-600 text-sm text-center">{error}</p> }

      <Button type="submit" variant="primary" className="w-full">
        {loading ? "Cargando..." : "Iniciar sesión"}
      </Button>

      <p className="text-center text-sm text-accent">
        ¿No tienes cuenta?{" "}
        <span
          onClick={() => router.push("/register")}
          className="text-primary font-semibold cursor-pointer hover:underline"
        >
          Regístrate
        </span>
      </p>
    </form>
  );
}
