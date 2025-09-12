
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function ensureApiBase(base: string) {
  const clean = base.replace(/\/+$/, "");
  if (/\/api(\/v\d+)?$/.test(clean)) return clean; 
  return `${clean}/api`;
}

export async function POST(req: Request) {
  const token = (await cookies()).get("session")?.value;
  if (!token) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const payload = {
    content: body.content ?? [body.title, body.description].filter(Boolean).join("\n\n"),
    anonymous: typeof body.anonymous === "boolean" ? body.anonymous : Boolean(body.isAnonymous),
    status: body.status,
    attachments: Array.isArray(body.attachments)
      ? body.attachments
      : typeof body.attachmentsCsv === "string"
        ? body.attachmentsCsv.split(",").map((s: string) => s.trim()).filter(Boolean)
        : undefined,
    victimId: body.victimId || undefined,
    reportUserId: body.reportUserId || undefined,
  };

  const apiBase = ensureApiBase(process.env.BACKEND_URL!);
  const url = `${apiBase}/report/create-for-user`;

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  return new NextResponse(await r.text(), { status: r.status });
}
