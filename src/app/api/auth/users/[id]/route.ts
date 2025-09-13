import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  
  const { id } = await params;
  const body = await req.json();

  const res = await fetch(`${process.env.BACKEND_URL}/auth/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Error en backend" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}