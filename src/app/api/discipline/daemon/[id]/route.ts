import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

type IdParams = { id: string };

export async function GET(_req: NextRequest, { params }: { params: IdParams | Promise<IdParams> }) {

  const { id } = await Promise.resolve(params);

  const token = (await cookies()).get("session")?.value;
  if (!token) return new NextResponse("Unauthorized", { status: 401 });

  const r = await fetch(
    `${process.env.BACKEND_URL}/discipline/daemon/${id}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  );

  return new NextResponse(await r.text(), { status: r.status });
}
