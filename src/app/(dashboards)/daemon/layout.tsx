import { getMe } from "@/lib/server-auth";
import { redirect } from "next/navigation";


export default async function DaemonLayout({ children}: { children: React.ReactNode }) {
    const me  = await getMe();
    if (!me) redirect('/login');

    const allowed = me.roles.includes('daemons') || me.roles.includes('andrei');
    if (!allowed) redirect('/resistance');

    return <>{children}</>;
}