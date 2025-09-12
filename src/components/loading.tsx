
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./common/Card";
import { CardContent, CardHeader } from "./ui/card";

export default function Loading() {
  return (
    <main className="px-6 py-8 max-w-6xl mx-auto grid gap-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0,1,2].map(i => (
          <Card key={i}>
            <CardHeader><Skeleton className="h-4 w-24" /></CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </section>
      {[0,1].map(i => (
        <Card key={i}>
          <CardContent className="p-6 space-y-3">
            {[...Array(5)].map((_, j) => <Skeleton key={j} className="h-6 w-full" />)}
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
