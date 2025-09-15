import { getMe } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { getActiveRole, hasAccess, Role } from "@/lib/roles";

export default async function DaemonLayout({ children }: { children: React.ReactNode }) {
  const me = await getMe();
  if (!me) redirect("/login");

  const activeRole: Role = getActiveRole(me.roles);

  console.log("Roles completos:", me.roles);

  if (!hasAccess(me.roles, ["daemons", "andrei"])) {
    redirect("/resistance");
  }

  return (
    <SidebarProvider>
      <AppSidebar role={activeRole} />
      <main className="flex-1 px-6 py-10">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
