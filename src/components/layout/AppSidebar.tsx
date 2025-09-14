"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Activity, Shield, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  role: "andrei" | "daemons" | "network-admins";
}

const menuItems = {
  andrei: [
    { title: "Admin Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Daemon Dashboard", url: "/daemon", icon: Activity },
    { title: "Resistance Hub", url: "/resistance", icon: Shield },
  ],
  daemons: [
    { title: "Daemon Dashboard", url: "/daemon", icon: LayoutDashboard },
    { title: "Resistance Hub", url: "/resistance", icon: Shield },
  ],
  "network-admins": [
    { title: "Resistance Hub", url: "/resistance", icon: Shield },
  ],
};

export function AppSidebar({ role }: AppSidebarProps) {
  const router = useRouter();
  const items = menuItems[role];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-slate-300">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">
            {role === "andrei"
              ? "Admin Panel"
              : role === "daemons"
              ? "Daemon Panel"
              : "Resistance Network"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5 text-accent" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-slate-300">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 bg-slate-300"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
