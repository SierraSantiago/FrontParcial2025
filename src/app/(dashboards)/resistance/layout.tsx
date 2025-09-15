import { getMe } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

type Role = "daemons" | "andrei" | "network-admins";

export default async function ResistanceLayout({ children }: { children: React.ReactNode }) {
  const me = await getMe();
  if (!me) redirect("/login");

  let activeRole: Role;
  if (me.roles.includes("andrei")) {
    activeRole = "andrei";
  } else if (me.roles.includes("daemons")) {
    activeRole = "daemons";
  } else {
    activeRole = "network-admins";
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
