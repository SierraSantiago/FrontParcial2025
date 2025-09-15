import { NextRequest, NextResponse } from "next/server";

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
  context: { params: Promise<{ id: string }> } 
) {
  try {
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
    console.error("Error en /api/reports/[id] PATCH:", error);
    return NextResponse.json(
      { message: "Error al actualizar reporte" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params; 

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/report/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al eliminar reporte: ${errorText}`);
    }

    const deletedReport = await res.json();
    return NextResponse.json(deletedReport);
  } catch (error) {
    console.error("Error en /api/reports/[id] DELETE:", error);
    return NextResponse.json(
      { error: "Error al eliminar reporte" },
      { status: 500 }
    );
  }
}
