"use client"

import Link from "next/link"
import { LayoutDashboard, Users, Settings, Activity, Shield } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  role: "admin" | "daemon" | "network-admin"
}

const menuItems = {
  admin: [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Usuarios", url: "/admin/users", icon: Users },
    { title: "Configuración", url: "/admin/settings", icon: Settings },
  ],
  daemon: [
    { title: "Dashboard", url: "/daemon", icon: LayoutDashboard },
    { title: "Monitoreo", url: "/daemon/monitoring", icon: Activity },
  ],
  "network-admin": [
    { title: "Resistance Hub", url: "/resistance", icon: Shield },
    { title: "Usuarios", url: "/resistance/users", icon: Users },
  ],
}

export function AppSidebar({ role }: AppSidebarProps) {
  const items = menuItems[role]

  return (
    <Sidebar>
      <SidebarContent className="bg-slate-300">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">
            {role === "admin"
              ? "Admin Panel"
              : role === "daemon"
              ? "Daemon Panel"
              : "Resistance Network"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2 ">
                      <item.icon className="h-5 w-5 text-accent]" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
