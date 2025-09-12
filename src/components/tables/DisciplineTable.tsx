import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Props = {
  items: {
    id: string | number;
    points: number;
    reason: string;
    createdAt: string;
    issuedByUser?: { id: string; fullName: string };
  }[];
};

export default function DisciplineTable({ items }: Props) {
  if (!items?.length) {
    return <p className="text-sm text-muted-foreground">Sin disciplinas aún.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Motivo</TableHead>
          <TableHead className="w-28">Puntos</TableHead>
          <TableHead>Emitida por</TableHead>
          <TableHead className="text-right">Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((d) => (
          <TableRow key={String(d.id)}>
            <TableCell className="font-medium">{d.reason}</TableCell>
            <TableCell>
              <Badge>+{d.points}</Badge>
            </TableCell>
            <TableCell>{d.issuedByUser?.fullName ?? "—"}</TableCell>
            <TableCell className="text-right text-xs text-muted-foreground">
              {new Date(d.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
