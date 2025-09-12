import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) return new NextResponse(await res.text(), { status: res.status });
    const data = await res.json();

    const response = NextResponse.json({ ok: true });
    response.cookies.set('session', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax'
    });
    return response;
}