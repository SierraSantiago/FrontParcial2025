"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface User {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  isActive: boolean;
  daemonScore: number;
}

interface UserProps {
  user: User;
  onUpdate: (id: string, updatedUser: Partial<User>) => void;
}

export default function UserCard({ user, onUpdate }: UserProps) {
  const [localUser, setLocalUser] = useState<User>(user);

  const handleChange = (field: keyof User, value: unknown) => {
    setLocalUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm space-y-2 bg-white">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="font-medium w-32">Nombre:</td>
            <td>
              <input
                aria-label="Nombre completo"
                className="border p-1 w-full"
                value={localUser.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium">Email:</td>
            <td>{localUser.email}</td>
          </tr>
          <tr>
            <td>Id:</td>
            <td>{localUser.id}</td>
          </tr>
          <tr>
            <td className="font-medium">Roles:</td>
            <td>
              <input
                aria-label="Roles"
                className="border p-1 w-full"
                value={localUser.roles.join(", ")}
                onChange={(e) =>
                  handleChange("roles", e.target.value.split(", "))
                }
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium">Activo:</td>
            <td>
              <input
                aria-label="Activo"
                type="checkbox"
                checked={localUser.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium">Daemon Score:</td>
            <td>
              <input
                aria-label="Daemon Score"
                type="number"
                className="border p-1 w-full"
                value={localUser.daemonScore}
                onChange={(e) =>
                  handleChange("daemonScore", Number(e.target.value))
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Button
        onClick={() => {
          const { id, ...userWithoutId } = localUser;
          onUpdate(localUser.id, userWithoutId);
        }}
        className="bg-primary text-white hover:bg-secondary"
      >
        Guardar
      </Button>
    </div>
  );
}
