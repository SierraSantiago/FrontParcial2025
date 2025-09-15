"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard, { User } from "@/components/admin/user";
import VictimCard, { Victim } from "@/components/admin/victim";

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [victims, setVictims] = useState<Victim[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch inicial ---
  useEffect(() => {
    Promise.all([fetch("/api/auth/users"), fetch("/api/victims")])
      .then(async ([resUsers, resVictims]) => {
        const usersData = await resUsers.json();
        const victimsData = await resVictims.json();
        setUsers(usersData);
        setVictims(victimsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando datos:", err);
        setLoading(false);
      });
  }, [router]);

  // --- Update handlers ---
  const handleUpdateUser = async (id: string, updatedUser: Partial<User>) => {
    const res = await fetch(`/api/auth/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    if (res.ok) {
      const newUser = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...newUser } : u))
      );
    }
  };

  const handleUpdateVictim = async (id: string, updatedVictim: Partial<Victim>) => {
    const res = await fetch(`/api/victims/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVictim),
    });

    if (res.ok) {
      const newVictim = await res.json();
      setVictims((prev) =>
        prev.map((v) => (v.id === id ? { ...v, ...newVictim } : v))
      );
    }
  };

  if (loading) return <p className="p-8">Cargando datos...</p>;

  return (
    <main className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Bienvenido Andrei. Aquí puedes administrar los usuarios y las víctimas.
      </p>

      {/* Usuarios */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <UserCard key={u.id} user={u} onUpdate={handleUpdateUser} />
          ))}
        </div>
      </section>

      {/* Víctimas */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Víctimas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {victims.map((v) => (
            <VictimCard key={v.id} victim={v} onUpdate={handleUpdateVictim} />
          ))}
        </div>
      </section>
    </main>
  );
}
