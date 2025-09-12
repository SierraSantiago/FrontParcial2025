import { AppSidebar } from "@/components/layout/AppSidebar";

export default function AdminPage() {
    const role = "admin";
    return (
        <div className="flex min-h-screen ">
            <AppSidebar role={role} />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4 text-primary">Panel de Administración</h1>
                <p className="text-accent">Aquí puedes gestionar la aplicación.</p>
            </main>
        </div>
    );
}