import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // util para concatenar clases

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
}

export function Button({
  children,
  variant = "secondary",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    variant === "primary"
      ? "bg-[--color-primary] hover:bg-[--color-secondary] text-black"
      : variant === "secondary"
      ? "bg-[--color-secondary] hover:bg-[--color-primary] text-black"
      : "bg-[--color-accent] hover:bg-[--color-neutral] text-balck";

  return (
    <ShadButton
      className={cn(`${baseStyles} transition rounded-lg`, className)}
      {...props}
    >
      {children}
    </ShadButton>
  );
}
