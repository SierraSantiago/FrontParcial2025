// src/app/api/reports/all/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/report`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error(`Error al obtener reportes: ${res.statusText}`);
    }

    const reports = await res.json();
    return NextResponse.json(reports);
  } catch (error: unknown) {
    console.error("Error en /api/reports/all:", error);
    return NextResponse.json(
      { message: "Error al obtener reportes"},
      { status: 500 }
    );
  }
}
