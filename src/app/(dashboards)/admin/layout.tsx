import { getMe } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const me = await getMe();
  if (!me) redirect("/login");

  const activeRole = me.roles[me.roles.length - 1] as "daemons" | "andrei" | "network-admin";
  console.log("Roles completos:", me.roles);
  console.log("Rol activo:", activeRole);

  const allowed = ["daemons","andrei"].includes(activeRole);
  if (!allowed) redirect("/resistance");

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
