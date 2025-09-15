"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface Report {
  id: string;
  content: string;
  status: "resistance" | "intel" | "incident"; // ✅ valores exactos del backend
  anonymous: boolean;
  attachments: string[];
  reportUser?: { id: string; fullName: string; email: string } | null;
  victim?: { id: string; name: string } | null;
  createdAt?: string;
  updatedAt?: string;
}

interface ReportProps {
  report: Report;
  onUpdate: (id: string, updatedReport: Partial<Report>) => void;
}

export default function ReportCard({ report, onUpdate }: ReportProps) {
  const [localReport, setLocalReport] = useState<Report>(report);

  const handleChange = (field: keyof Report, value: unknown) => {
    setLocalReport((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm space-y-2 bg-white">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="font-medium w-32">ID:</td>
            <td>{localReport.id}</td>
          </tr>
          <tr>
            <td className="font-medium">Contenido:</td>
            <td>
              <textarea
                className="border p-1 w-full"
                value={localReport.content}
                onChange={(e) => handleChange("content", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium">Estado:</td>
            <td>
              <select
                aria-label="Estado del reporte"
                className="border p-1 w-full"
                value={localReport.status}
                onChange={(e) =>
                  handleChange("status", e.target.value as Report["status"])
                }
              >
                <option value="incident">INCIDENT</option>
                <option value="intel">INTEL</option>
                <option value="resistance">RESISTANCE</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="font-medium">Anónimo:</td>
            <td>
              <input
                type="checkbox"
                checked={localReport.anonymous}
                onChange={(e) => handleChange("anonymous", e.target.checked)}
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium">Adjuntos:</td>
            <td>
              <input
                className="border p-1 w-full"
                value={localReport.attachments.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "attachments",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium">Usuario:</td>
            <td>{localReport.reportUser ? localReport.reportUser.fullName : "N/A"}</td>
          </tr>
          <tr>
            <td className="font-medium">Víctima:</td>
            <td>{localReport.victim ? localReport.victim.name : "N/A"}</td>
          </tr>
        </tbody>
      </table>

      <Button
        onClick={() => {
          const cleanReport = {
            content: localReport.content,
            status: localReport.status,
            anonymous: localReport.anonymous,
            attachments: localReport.attachments,
          };
          onUpdate(localReport.id, cleanReport);
        }}
        className="bg-primary text-white hover:bg-secondary"
      >
        Guardar
      </Button>
    </div>
  );
}
