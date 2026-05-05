import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Percent,
  Printer,
  Receipt,
  Tag,
  UtensilsCrossed,
} from "lucide-react";

function PosActionBar() {
  return (
    <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 py-2.5">
      {[
        { label: "Unpaid", icon: Receipt, color: "bg-cyan-600" },
        { label: "Print KOT", icon: Printer, color: "bg-teal-600" },
        { label: "Kitchen", icon: UtensilsCrossed, color: "bg-sky-600" },
        { label: "Discount", icon: Tag, color: "bg-violet-600" },
        { label: "Service", icon: Percent, color: "bg-slate-600" },
        { label: "Tax", icon: Percent, color: "bg-slate-500" },
        { label: "Payment", icon: CreditCard, color: "bg-cyan-500" },
      ].map(({ label, icon: Icon, color }) => (
        <Button
          key={label}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-[15px] font-semibold text-white transition-opacity hover:opacity-90",
            color
          )}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
}

export default PosActionBar;
