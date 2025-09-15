import { getMe } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { getActiveRole, hasAccess, Role } from "@/lib/roles";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const me = await getMe();
  if (!me) redirect("/login");

  const activeRole: Role = getActiveRole(me.roles);

  console.log("Roles completos:", me.roles);

  if (!hasAccess(me.roles, ["andrei"])) {
    redirect("/resistance");
  }

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
