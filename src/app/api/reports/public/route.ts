import { NextResponse } from "next/server";

function ensureApiBase(b: string) {
  const x = b.replace(/\/+$/, "");
  return /\/api(\/v\d+)?$/.test(x) ? x : `${x}/api`;
}

export async function POST(req: Request) {
  const body = await req.json();
  const base = ensureApiBase(process.env.BACKEND_URL!);
  const r = await fetch(`${base}/report/public`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return new NextResponse(await r.text(), { status: r.status });
}
