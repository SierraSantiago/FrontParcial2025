"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  isActive: boolean;
  daemonScore: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const userRole = "Andrei"; // ⚠️ Cambiar cuando tengas login real

  useEffect(() => {
    if (userRole !== "Andrei") {
      router.push("/login");
    } else {
      fetch("/api/auth/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error cargando usuarios:", err);
          setLoading(false);
        });
    }
  }, [userRole, router]);

  const handleUpdate = async (id: string, updatedUser: Partial<User>) => {
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
    } else {
      console.error("Error al actualizar usuario");
    }
  };

  if (loading) return <p className="p-8">Cargando usuarios...</p>;

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Bienvenido Andrei. Aquí puedes administrar los usuarios.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u.id}
            className="border rounded-lg p-4 shadow-sm space-y-2 bg-white"
          >
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="font-medium w-32">Nombre:</td>
                  <td>
                    <input
                      id={`name-${u.id}`}
                      aria-label="Nombre completo"
                      className="border p-1 w-full"
                      value={u.fullName}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr.id === u.id
                              ? { ...usr, fullName: e.target.value }
                              : usr
                          )
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Email:</td>
                  <td>{u.email}</td>
                </tr>
                <tr>
                  <td>Id:</td>
                  <td>{u.id}</td>
                </tr>
                <tr>
                  <td className="font-medium">Roles:</td>
                  <td>
                    <input
                      id={`roles-${u.id}`}
                      aria-label="Roles del usuario"
                      className="border p-1 w-full"
                      value={u.roles.join(", ")}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr.id === u.id
                              ? { ...usr, roles: e.target.value.split(",") }
                              : usr
                          )
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Activo:</td>
                  <td>
                    <input
                      id={`active-${u.id}`}
                      aria-label="Usuario activo"
                      type="checkbox"
                      checked={u.isActive}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr.id === u.id
                              ? { ...usr, isActive: e.target.checked }
                              : usr
                          )
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Daemon Score:</td>
                  <td>
                    <input
                      id={`daemon-${u.id}`}
                      aria-label="Puntaje Daemon"
                      type="number"
                      className="border p-1 w-full"
                      value={u.daemonScore}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr.id === u.id
                              ? { ...usr, daemonScore: Number(e.target.value) }
                              : usr
                          )
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              onClick={() => handleUpdate(u.id, u)}
              className="bg-primary text-white hover:bg-secondary"
            >
              Guardar
            </Button>
          </div>
        ))}
      </section>
    </main>
  );
}
