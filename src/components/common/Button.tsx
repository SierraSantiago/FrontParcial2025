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
      ? "bg-primary hover:bg-secondary text-white hover:text-black"
      : variant === "secondary"
      ? "bg-secondary hover:bg-primary text-black hover:text-white"
      : "bg-accent hover:bg-neutral text-balck";

  return (
    <ShadButton
      className={cn(`${baseStyles} transition rounded-lg`, className)}
      {...props}
    >
      {children}
    </ShadButton>
  );
}
