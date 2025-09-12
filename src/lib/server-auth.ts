import { cookies } from "next/headers";


export type Me = {
    id: string;
    email: string;
    fullName: string;
    roles: string[];
    daemonScore: number;
};

export async function getMe(): Promise<Me | null> {
    const token = (await cookies()).get('session')?.value;
    if (!token) return null;

    const res = await fetch(`${process.env.BACKEND_URL}/auth/check-status`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });

    if (!res.ok) return null;
    const data = await res.json();
    return {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        roles: data.roles ?? [],
        daemonScore: data.daemonScore ?? 0
    };
}