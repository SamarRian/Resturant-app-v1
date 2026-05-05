import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function PosLineItem({
  item,
  onQtyChange,
  onRemove,
}: {
  item: OrderItem;
  onQtyChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm">
      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {item.name}
        </p>
        {item.description && (
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>

      {/* Price + controls */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-sm font-bold text-accent">
          {(item.price * item.qty).toFixed(2)}
        </span>

        <div className="flex items-center gap-1">
          {/* Decrement */}
          <Button
            onClick={() => onQtyChange(item.id, -1)}
            className="flex h-6 w-6 items-center justify-center rounded border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            <Minus className="h-3 w-3" />
          </Button>

          {/* Qty */}
          <span className="w-6 text-center text-sm font-semibold text-foreground tabular-nums">
            {item.qty}
          </span>

          {/* Increment */}
          <Button
            onClick={() => onQtyChange(item.id, 1)}
            className="flex h-6 w-6 items-center justify-center rounded border border-accent bg-accent/10 text-accent transition-colors hover:bg-accent/20"
          >
            <Plus className="h-3 w-3" />
          </Button>

          {/* Delete */}
          <Button
            onClick={() => onRemove(item.id)}
            className="ml-1 flex h-6 w-6 items-center justify-center rounded border border-destructive/40 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
