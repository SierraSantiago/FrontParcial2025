"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/common/Button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí va tu lógica de login con el backend
    console.log("Login attempt:", { email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-[--color-neutral]"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="andrei@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-[--color-accent]"
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
          className="border-[--color-accent]"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Iniciar sesión
      </Button>
    </form>
  );
}
