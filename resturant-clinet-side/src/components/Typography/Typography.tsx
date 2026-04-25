import { cn } from "@/lib/utils";

export function TypographyH2({ children, className }) {
  return (
    <h2
      className={cn(
        "scroll-m-20 py-5 text-3xl tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}
export function TypographyH3({ children, className }) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}
export function TypographyP({ children, className }) {
  return <p className={cn("leading-7", className)}>{children}</p>;
}
