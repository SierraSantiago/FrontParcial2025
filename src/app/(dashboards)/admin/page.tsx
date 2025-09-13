"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// --- Interfaces ---
interface User {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  isActive: boolean;
  daemonScore: number;
}

interface Victim {
  id: string;
  name: string;
  alias: string | null;
  org: string | null;
  contact: number;
  status: "FREE" | "CAPTURED" | "DEAD";
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
}

// --- Componente principal ---
export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [victims, setVictims] = useState<Victim[]>([]);
  const [loading, setLoading] = useState(true);

  const userRole = "andrei";
  

  // --- Cargar usuarios y víctimas ---
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
  }, [userRole, router]);

  // --- Update usuario ---
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
    } else {
      console.error("Error al actualizar usuario:", await res.text());
    }
  };

  // --- Update víctima ---
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
    } else {
      console.error("Error al actualizar víctima:", await res.text());
    }
  };

  if (loading) return <p className="p-8">Cargando datos...</p>;

  return (
    <main className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Bienvenido Andrei. Aquí puedes administrar los usuarios y las víctimas.
      </p>

      {/* --- Usuarios --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <div key={u.id} className="border rounded-lg p-4 shadow-sm space-y-2 bg-white">
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
                              usr.id === u.id ? { ...usr, fullName: e.target.value } : usr
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
                              usr.id === u.id ? { ...usr, roles: e.target.value.split(", ") } : usr
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
                              usr.id === u.id ? { ...usr, isActive: e.target.checked } : usr
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
                              usr.id === u.id ? { ...usr, daemonScore: Number(e.target.value) } : usr
                            )
                          )
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button
                onClick={() => {
                  const { id, ...userWithoutId } = u;
                  handleUpdateUser(u.id, userWithoutId);
                }}
                className="bg-primary text-white hover:bg-secondary"
              >
                Guardar
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* --- Víctimas --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Víctimas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {victims.map((v) => (
            <div key={v.id} className="border rounded-lg p-4 shadow-sm space-y-2 bg-white">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="font-medium w-32">Nombre:</td>
                    <td>
                      <input
                        id={`name-${v.id}`}
                        aria-label="Nombre de la víctima"
                        className="border p-1 w-full"
                        value={v.name}
                        onChange={(e) =>
                          setVictims((prev) =>
                            prev.map((vic) => (vic.id === v.id ? { ...vic, name: e.target.value } : vic))
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Alias:</td>
                    <td>
                      <input
                        id={`alias-${v.id}`}
                        aria-label="Alias de la víctima"
                        className="border p-1 w-full"
                        value={v.alias ?? ""}
                        onChange={(e) =>
                          setVictims((prev) =>
                            prev.map((vic) => (vic.id === v.id ? { ...vic, alias: e.target.value } : vic))
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Org:</td>
                    <td>
                      <input
                        id={`org-${v.id}`}
                        aria-label="Organización"
                        className="border p-1 w-full"
                        value={v.org ?? ""}
                        onChange={(e) =>
                          setVictims((prev) =>
                            prev.map((vic) => (vic.id === v.id ? { ...vic, org: e.target.value } : vic))
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Contacto:</td>
                    <td>
                      <input
                        id={`contact-${v.id}`}
                        aria-label="Contacto de la víctima"
                        type="number"
                        className="border p-1 w-full"
                        value={v.contact}
                        onChange={(e) =>
                          setVictims((prev) =>
                            prev.map((vic) => (vic.id === v.id ? { ...vic, contact: Number(e.target.value) } : vic))
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Status:</td>
                    <td>
                      <select
                        id={`status-${v.id}`}
                        aria-label="Estado de la víctima"
                        className="border p-1 w-full"
                        value={v.status}
                        onChange={(e) =>
                          setVictims((prev) =>
                            prev.map((vic) => (vic.id === v.id ? { ...vic, status: e.target.value as Victim["status"] } : vic))
                          )
                        }
                      >
                        <option value="FREE">FREE</option>
                        <option value="CAPTURED">CAPTURED</option>
                        <option value="DEAD">DEAD</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Riesgo:</td>
                    <td>
                      <select
                        id={`risk-${v.id}`}
                        aria-label="Nivel de riesgo"
                        className="border p-1 w-full"
                        value={v.riskLevel}
                        onChange={(e) =>
                          setVictims((prev) =>
                            prev.map((vic) => (vic.id === v.id ? { ...vic, riskLevel: e.target.value as Victim["riskLevel"] } : vic))
                          )
                        }
                      >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button
                onClick={() => {
                  // Enviar solo los campos que el backend acepta (sin createdAt, updatedAt, reports)
                  const cleanVictim = {
                    name: v.name,
                    alias: v.alias,
                    org: v.org,
                    contact: v.contact,
                    status: v.status,
                    riskLevel: v.riskLevel
                  };
                  handleUpdateVictim(v.id, cleanVictim);
                }}
                className="bg-primary text-white hover:bg-secondary"
              >
                Guardar
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
