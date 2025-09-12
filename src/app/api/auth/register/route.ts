import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body =  await req.json();
    const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullName: body.fullName,
            email: body.email,
            password: body.password
        }),
    });

    if (!res.ok) return new NextResponse(await res.text(), { status: res.status });

    const data = await res.json();
    if (!data.token) return new NextResponse("No se recibió token", { status: 500 });

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