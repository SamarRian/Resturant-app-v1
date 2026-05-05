import { useState } from "react";
import { Plus, UserSearch, ChevronDown, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import PosOrderTypeButton from "./PosOrderTypeButton";
import PosLineItem from "./PosLineItem";

// ─── Types ───────────────────────────────────────────────────────────────────

type OrderType = "dine-in" | "takeaway" | "delivery";

interface OrderItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  qty: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_ITEMS: OrderItem[] = [
  {
    id: 1,
    name: "[DEAL] Teacher Deal",
    description:
      "Deal includes: Soft Drink (H-Liter (+120.00)), Arabic Broast (Half (+1100.00))",
    price: 999,
    qty: 1,
  },
  {
    id: 2,
    name: "Chicken Fajita",
    description: "Size: Medium (+1050.00)",
    price: 1050,
    qty: 1,
  },
  {
    id: 3,
    name: "Soft Drink",
    description: "Size: 350ML (+100.00)",
    price: 100,
    qty: 1,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

// ─── Main Component ───────────────────────────────────────────────────────────

export function PosOrderPanel() {
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [customer, setCustomer] = useState("Walk-in Customer");
  const [waiter, setWaiter] = useState("");
  const [items, setItems] = useState<OrderItem[]>(INITIAL_ITEMS);
  const [orderNo] = useState(14);

  const handleQtyChange = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const disc = 0;
  const svc = 0;
  const tax = 0;
  const total = subtotal - disc + svc + tax;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-foreground">
            Order #: {orderNo}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Status:</span>
            <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400">
              Pending
            </Badge>
          </div>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          New Order
        </Button>
      </div>

      {/* ── Order Type ── */}
      <div className="flex gap-2 border-b border-border bg-card px-4 py-3">
        <PosOrderTypeButton
          label="Dine-in"
          active={orderType === "dine-in"}
          color="blue"
          onClick={() => setOrderType("dine-in")}
        />
        <PosOrderTypeButton
          label="Take Away"
          active={orderType === "takeaway"}
          color="blue"
          onClick={() => setOrderType("takeaway")}
        />
        <PosOrderTypeButton
          label="Delivery"
          active={orderType === "delivery"}
          color="purple"
          onClick={() => setOrderType("delivery")}
        />
      </div>

      {/* ── Customer & Waiter ── */}
      <div className="flex flex-col gap-2 border-b border-border bg-card px-4 py-3">
        <div className="relative">
          <UserSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="pr-9 pl-9 text-sm"
            placeholder="Walk-in Customer"
          />
          <button className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-muted p-0.5 text-muted-foreground hover:text-foreground">
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
        <Input
          value={waiter}
          onChange={(e) => setWaiter(e.target.value)}
          className="text-sm"
          placeholder="Waiter / Table name"
        />
      </div>

      {/* ── Order Items (scrollable) ── */}
      <ScrollArea className="flex-1 px-4 py-3">
        <div className="flex flex-col gap-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <UtensilsCrossed className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No items added yet
              </p>
            </div>
          ) : (
            items.map((item) => (
              <PosLineItem
                key={item.id}
                item={item}
                onQtyChange={handleQtyChange}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>
      </ScrollArea>

      {/* ── Totals ── */}
      <div className="border-t border-border bg-card">
        <div className="flex items-center justify-between bg-accent px-4 py-2.5">
          <span className="text-sm font-bold tracking-wider text-accent-foreground uppercase">
            Total
          </span>
          <span className="text-lg font-extrabold text-accent-foreground tabular-nums">
            {total.toFixed(2)}
          </span>
        </div>
        <Separator />
        <div className="grid grid-cols-4 px-4 py-2.5">
          {[
            { label: "SUB", value: subtotal },
            { label: "DISC", value: disc },
            { label: "SVC", value: svc },
            { label: "TAX", value: tax },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {label}
              </span>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PosOrderPanel;
