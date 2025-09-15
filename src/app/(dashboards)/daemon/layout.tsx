import { getMe } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

type Role = "daemons" | "andrei" | "network-admins";

export default async function DaemonLayout({ children }: { children: React.ReactNode }) {
    const me = await getMe();
    if (!me) redirect('/login');

    
    let activeRole: Role;
    if (me.roles.includes("andrei")) {
        activeRole = "andrei";
    } else if (me.roles.includes("daemons")) {
        activeRole = "daemons";
    } else {
        activeRole = "network-admins";
    }


    const allowed = me.roles.includes('daemons') || me.roles.includes('andrei');
    if (!allowed) redirect('/resistance');

    return (
    <SidebarProvider>
      <AppSidebar role={activeRole} /> 
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}