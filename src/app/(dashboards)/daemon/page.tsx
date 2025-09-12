// app/daemon/page.tsx
import { cookies } from "next/headers";
import { getMe } from "@/lib/server-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import DisciplineTable from "@/components/tables/DisciplineTable";
import ReportsTable from "@/components/tables/ReportsTable";
import NewReportForm from "@/components/forms/NewReportForm";

type DisciplineItem = {
  id: string;
  points: number;
  reason: string;
  createdAt: string;
  issuedByUser?: { id: string; fullName: string };
};

type ReportItem = {
  id: string;
  title: string;
  status: "submitted" | "reviewed" | "rejected";
  createdAt: string;
};

async function apiGet<T>(path: string, token: string): Promise<T> {
  const r = await fetch(`${process.env.BACKEND_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export default async function DaemonPage() {
  const me = await getMe();
  if (!me) return null;

  const token = (await cookies()).get('session')?.value;
  if (!token) throw new Error("Authentication token is missing");

  const [disciplines, reports] = await Promise.all([
    apiGet<DisciplineItem[]>(`/disciplines/daemon/${me.id}`, token),
    apiGet<ReportItem[]>(`/report/find`, token),
  ]);

  return (
    <main className="px-6 py-8 max-w-6xl mx-auto grid gap-8">
      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Daemon Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{me.daemonScore}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {me.fullName}
            </div>
          </CardContent>
        </Card>

        <Card className="opacity-90">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">Próximamente</div>
            <Separator className="my-3" />
            <Badge variant="secondary">WIP</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Acciones
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Crea un reporte al final de la página.
          </CardContent>
        </Card>
      </section>

      {/* Listas */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mis disciplinas recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <DisciplineTable items={disciplines.slice(0, 8)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mis reportes</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportsTable
              items={reports.slice(0, 8).map(report => ({
                id: report.id,
                content: report.title,
                status: report.status.toUpperCase(),
              }))}
            />
          </CardContent>
        </Card>
      </section>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Nuevo reporte</CardTitle>
        </CardHeader>
        <CardContent>
          <NewReportForm />
        </CardContent>
      </Card>
    </main>
  );
}
