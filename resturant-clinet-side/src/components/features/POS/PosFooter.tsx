import {
  Receipt,
  Printer,
  UtensilsCrossed,
  Tag,
  Percent,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PosFooterProps {
  subtotal: number;
  discount: number;
  service: number;
  tax: number;
  total: number;
  onAction?: (action: string) => void;
}

const ACTION_BUTTONS = [
  { label: "Unpaid", icon: Receipt, color: "bg-cyan-600" },
  { label: "Print KOT", icon: Printer, color: "bg-teal-600" },
  { label: "Kitchen", icon: UtensilsCrossed, color: "bg-sky-600" },
  { label: "Discount", icon: Tag, color: "bg-violet-600" },
  { label: "Service", icon: Percent, color: "bg-slate-600" },
  { label: "Tax", icon: Percent, color: "bg-slate-500" },
  { label: "Payment", icon: CreditCard, color: "bg-cyan-500" },
];

export function PosFooter({
  subtotal,
  discount,
  service,
  tax,
  total,
  onAction,
}: PosFooterProps) {
  return (
    <footer className="shrink-0 border-t border-border bg-card shadow-[0_-1px_4px_rgba(0,0,0,0.06)]">
      {/* ── Totals row ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2">
        {/* SUB / DISC / SVC / TAX */}
        <div className="flex min-w-2 items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            {[
              { label: "SUB", value: subtotal },
              { label: "DISC", value: discount },
              { label: "SVC", value: service },
              { label: "TAX", value: tax },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  {label}
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  {value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* TOTAL pill */}
          <div className="flex items-center gap-3 rounded-lg bg-accent px-4 py-1.5">
            <span className="text-xs font-bold tracking-widest text-accent-foreground uppercase">
              Total
            </span>
            <span className="text-lg font-extrabold text-accent-foreground tabular-nums">
              {total.toFixed(2)}
            </span>
          </div>
        </div>
        {/* ── Action buttons row ── */}
        <div className="flex flex-wrap gap-1.5 px-3 py-2">
          {ACTION_BUTTONS.map(({ label, icon: Icon, color }) => (
            <Button
              key={label}
              onClick={() => onAction?.(label)}
              className={cn(
                "rounded-md px-2 py-2 font-semibold text-white transition-all hover:opacity-90",
                color
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
