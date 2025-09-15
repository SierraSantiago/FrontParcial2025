import { NextResponse } from "next/server";

interface ReportUpdate {
  content?: string;
  status?: "resistance" | "intel" | "incident";
  anonymous?: boolean;
  attachments?: string[];
  reportUserId?: string;
  victimId?: string;
}

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // ⚠️ Desestructuramos id de forma asíncrona
    const { id } = await context.params;

    const body: ReportUpdate = await request.json();

    const res = await fetch(`${process.env.BACKEND_URL}/report/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al actualizar reporte: ${errorText}`);
    }

    const updatedReport = await res.json();
    return NextResponse.json(updatedReport);
  } catch (error: unknown) {
    console.error("Error en /api/reports/[id]:", error);
    return NextResponse.json(
      { message: "Error al actualizar reporte" },
      { status: 500 }
    );
  }
}
