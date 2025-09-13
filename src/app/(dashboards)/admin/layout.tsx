import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    const role = "Andrei"; // Aquí puedes obtener el rol del usuario autenticado
  return (
    <SidebarProvider>
      <AppSidebar role={role}/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}