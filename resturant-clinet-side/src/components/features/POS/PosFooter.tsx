import { Receipt, Printer, Tag, Percent, CreditCard, Bike } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePosContext } from "@/hooks/usePosContext";
import { KotPrint, UnpaidBillPrint, type KotPrintData } from "@/lib/helper";
import { useGetSingleOrder } from "@/hooks/QueryHooks/PosSession/PosOrder/useGetSingleOrder";
import { usePosOrderContext } from "@/hooks/usePosOrderContext";

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

  { label: "Discount", icon: Tag, color: "bg-violet-600" },
  { label: "Service", icon: Percent, color: "bg-slate-600" },
  { label: "Tax", icon: Percent, color: "bg-slate-500" },
  { label: "Delivery", icon: Bike, color: "bg-yellow-500" },
  { label: "Payment", icon: CreditCard, color: "bg-cyan-500" },
];

const blockedActions = new Set(["Payment", "Print KOT", "Unpaid", "Delivery"]);

export function PosFooter({
  subtotal,
  discount,
  service,
  tax,
  total,
}: PosFooterProps) {
  const {
    handleCalculationType,
    togglePosCalculationDialog,
    togglePosPaymentDialog,
    togglePosDeliveryDialog,
    orderType,
  } = usePosContext();
  const { emptyOrderID, viewedOrderId } = usePosOrderContext();
  const { refetch } = useGetSingleOrder(
    viewedOrderId ? viewedOrderId : emptyOrderID
  );

  async function handleDialogs(label) {
    if (!blockedActions.has(label)) {
      handleCalculationType(label);
      togglePosCalculationDialog();
      return;
    }

    if (label === "Payment") return togglePosPaymentDialog();
    if (label === "Delivery") return togglePosDeliveryDialog();

    if (label === "Print KOT" || label === "Unpaid") {
      const result = await refetch();
      const freshBillData = result.data?.data;

      if (!freshBillData) {
        console.error("No order data available to print");
        return;
      }

      if (label === "Print KOT") KotPrint(freshBillData);
      else UnpaidBillPrint(freshBillData);
    }
  }
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
                  {value ? Number(value).toFixed(2) : "0.00"}
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
              hidden={orderType !== "delivery" && label === "Delivery"}
              onClick={() => {
                handleDialogs(label);
              }}
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
