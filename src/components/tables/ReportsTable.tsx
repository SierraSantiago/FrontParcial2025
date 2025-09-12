import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Item = {
  id: string;
  content: string;
  status: "RESISTANCE" | "INTEL" | "INCIDENT" | string; // tolerante
};

type Props = { items: Item[] };

const STATUS_VARIANTS: Record<string, "secondary" | "default" | "destructive"> = {
  INCIDENT: "secondary",
  RESISTANCE: "default",
  INTEL: "destructive",
};

const STATUS_LABELS: Record<string, string> = {
  INCIDENT: "Incident",
  RESISTANCE: "Resistance",
  INTEL: "Intel",
};

function contentPreview(content: string, max = 120) {
  const text = (content ?? "").trim();
  if (!text) return "(sin contenido)";
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export default function ReportsTable({ items }: Props) {
  if (!items?.length) {
    return <p className="text-sm text-muted-foreground">Aún no has enviado reportes.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contenido</TableHead>
          <TableHead className="w-40 text-center">Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((r) => {
          const key = String(r.status).toUpperCase();
          const variant = STATUS_VARIANTS[key] ?? "secondary";
          const label = STATUS_LABELS[key] ?? r.status;

          return (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{contentPreview(r.content)}</TableCell>
              <TableCell className="text-center">
                <Badge variant={variant} className="capitalize">
                  {label}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
