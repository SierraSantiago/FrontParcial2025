// app/resistance/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnonymousReportForm from "@/components/forms/AnonymousReportForm";
import Image from "next/image";

const tips = [
  "No ejecutes binarios desconocidos. Verifica hashes.",
  "Usa MFA y rotación de claves. Nada de contraseñas compartidas.",
  "Segmenta la red. Menos blast radius.",
  "Backups offline. Prueba restores.",
];

const memes = [
  "https://i.imgflip.com/30b1gx.jpg",
  "https://i.imgflip.com/1otk96.jpg",
  "https://i.imgflip.com/26am.jpg",
];

export default function ResistancePage() {
  return (
    <main className="px-6 py-10 max-w-6xl mx-auto grid gap-8">
      <section className="grid gap-3">
        <h1 className="text-3xl font-bold">Public Resistance</h1>
        <p className="text-muted-foreground">
          Consejos de supervivencia, memes y un canal anónimo para reportar actividad sospechosa.
        </p>
        <div className="text-sm">
          ¿Eres daemon?{" "}
          <Link className="underline" href="/daemon">Ir a tu dashboard</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Tips rápidos</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {tips.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <Badge variant="secondary">{i + 1}</Badge>
                <p>{t}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Memes</CardTitle></CardHeader>
           <CardContent className="grid grid-cols-2 gap-3">
            {memes.map((src, i) => (
              <Image key={i} src={src} alt={`meme-${i}`} width={320} height={160} className="rounded-lg border object-cover w-full h-40" />
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader><CardTitle>Enviar reporte anónimo</CardTitle></CardHeader>
          <CardContent>
            <AnonymousReportForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
