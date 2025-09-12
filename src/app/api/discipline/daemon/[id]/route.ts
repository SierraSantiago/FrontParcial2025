import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const token = (await cookies()).get("session")?.value;
  if (!token) return new NextResponse("Unauthorized", { status: 401 });

  const r = await fetch(
    `${process.env.BACKEND_URL}/discipline/daemon/${params.id}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  );

  return new NextResponse(await r.text(), { status: r.status });
}
