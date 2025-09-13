"use client"

import Link from "next/link"
import { LayoutDashboard, Activity, Shield } from "lucide-react"

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
  role: "Andrei" | "daemon" | "network-admin"
}

const menuItems = {
  Andrei: [
    { title: "Admin Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Daemon Dashboard", url: "/daemon", icon:  Activity},
    { title: "Resistance Hub", url: "/resistance", icon: Shield },
  ],
  daemon: [
    { title: "Daemon Dashboard", url: "/daemon", icon: LayoutDashboard },
    { title: "Resistance Hub", url: "/resistance", icon: Shield },
  ],
  "network-admin": [
    { title: "Resistance Hub", url: "/resistance", icon: Shield },
  ],
}

export function AppSidebar({ role }: AppSidebarProps) {
  const items = menuItems[role]

  return (
    <Sidebar>
      <SidebarContent className="bg-slate-300">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">
            {role === "Andrei"
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
