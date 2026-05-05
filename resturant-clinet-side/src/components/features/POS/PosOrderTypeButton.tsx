import { cn } from "@/lib/utils";

export default function PosOrderTypeButton({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color: "blue" | "purple";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 rounded-md py-2 text-sm font-semibold transition-all",
        active
          ? color === "blue"
            ? "bg-blue-600 text-white shadow-sm"
            : "bg-purple-600 text-white shadow-sm"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      )}
    >
      {label}
    </button>
  );
}
