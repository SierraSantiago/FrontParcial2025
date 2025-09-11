import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-md border border-[--color-neutral] p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
