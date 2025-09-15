"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface Victim {
    id: string;
    name: string;
    alias: string | null;
    org: string | null;
    contact: number;
    status: "free" | "captured" | "hypnotized";
    riskLevel: "low" | "medium" | "high";
    createdAt: string;
    updatedAt: string;
}

interface VictimProps {
    victim: Victim;
    onUpdate: (id: string, updatedVictim: Partial<Victim>) => void;
}

export default function VictimCard({ victim, onUpdate }: VictimProps) {
    const [localVictim, setLocalVictim] = useState<Victim>(victim);

    const handleChange = (field: keyof Victim, value: unknown) => {
        setLocalVictim((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="border rounded-lg p-4 shadow-sm space-y-2 bg-white">
            <table className="w-full border-collapse">
                <tbody>
                    <tr>
                        <td className="font-medium w-32">Nombre:</td>
                        <td>
                            <input
                                aria-label="Nombre"
                                className="border p-1 w-full"
                                value={localVictim.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="font-medium">Alias:</td>
                        <td>
                            <input
                                aria-label="Alias"
                                className="border p-1 w-full"
                                value={localVictim.alias ?? ""}
                                onChange={(e) => handleChange("alias", e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="font-medium">Org:</td>
                        <td>
                            <input
                                aria-label="Organización"
                                className="border p-1 w-full"
                                value={localVictim.org ?? ""}
                                onChange={(e) => handleChange("org", e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Id:</td>
                        <td>{localVictim.id}</td>
                    </tr>
                    <tr>
                        <td className="font-medium">Contacto:</td>
                        <td>
                            <input
                                aria-label="Contacto"
                                type="number"
                                className="border p-1 w-full"
                                value={localVictim.contact}
                                onChange={(e) =>
                                    handleChange("contact", Number(e.target.value))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="font-medium">Status:</td>
                        <td>
                            <select
                                aria-label="Status"
                                className="border p-1 w-full"
                                value={localVictim.status}
                                onChange={(e) =>
                                    handleChange("status", e.target.value as Victim["status"])
                                }
                            >
                                <option value="free">FREE</option>
                                <option value="captured">CAPTURED</option>
                                <option value="hypnotized">HYPNOTIZED</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-medium">Riesgo:</td>
                        <td>
                            <select
                                aria-label="Nivel de riesgo"
                                className="border p-1 w-full"
                                value={localVictim.riskLevel}
                                onChange={(e) =>
                                    handleChange(
                                        "riskLevel",
                                        e.target.value as Victim["riskLevel"]
                                    )
                                }
                            >
                                <option value="low">LOW</option>
                                <option value="medium">MEDIUM</option>
                                <option value="high">HIGH</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Button
                onClick={() => {
                    const cleanVictim = {
                        name: localVictim.name,
                        alias: localVictim.alias,
                        org: localVictim.org,
                        contact: localVictim.contact,
                        status: localVictim.status,
                        riskLevel: localVictim.riskLevel,
                    };
                    onUpdate(localVictim.id, cleanVictim);
                }}
                className="bg-primary text-white hover:bg-secondary"
            >
                Guardar
            </Button>
        </div>
    );
}
