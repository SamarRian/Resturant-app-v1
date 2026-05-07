import {
  Plus,
  Minus,
  Trash2,
  UtensilsCrossed,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { OrderItem, OrderType } from "../../../../DevData/Types/Postypes";

interface PosOrderPanelProps {
  orderNo: number;
  orderType: OrderType;
  customer: string;
  items: OrderItem[];
  onOrderTypeChange: (type: OrderType) => void;
  onCustomerChange: (value: string) => void;
  onQtyChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onNewOrder: () => void;
}

export function PosOrderPanel({
  orderNo,
  orderType,
  customer,
  items,
  onOrderTypeChange,
  onCustomerChange,
  onQtyChange,
  onRemove,
  onNewOrder,
}: PosOrderPanelProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card md:w-85 md:shrink-0 lg:w-95">
      {/* ── Order header ── */}
      <div className="shrink-0 space-y-2 border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">
              Order #: {orderNo}
            </span>
            <Badge className="bg-amber-400 text-[10px] text-amber-950 hover:bg-amber-400">
              Pending
            </Badge>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-xs"
            onClick={onNewOrder}
          >
            <Plus className="h-3 w-3" />
            New Order
          </Button>
        </div>

        {/* Order type tabs */}
        <Tabs
          value={orderType}
          onValueChange={(v) => onOrderTypeChange(v as OrderType)}
        >
          <TabsList className="h-8 w-full">
            <TabsTrigger
              value="dine-in"
              className="flex-1 rounded-sm text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Dine-in
            </TabsTrigger>
            <TabsTrigger
              value="takeaway"
              className="flex-1 rounded-sm text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Take Away
            </TabsTrigger>
            <TabsTrigger
              value="delivery"
              className="flex-1 rounded-sm text-xs data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Delivery
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* ── Customer input ── */}
      <div className="shrink-0 border-b border-border px-3 py-2">
        <div className="relative">
          <Input
            value={customer}
            onChange={(e) => onCustomerChange(e.target.value)}
            className="h-8 pr-8 text-sm"
            placeholder="Walk-in Customer"
          />
          <button className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Scrollable order items ── */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-2 p-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <UtensilsCrossed className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No items yet</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-2 rounded-lg border border-border bg-background p-2.5 transition-shadow hover:shadow-sm"
              >
                {/* Item info */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-tight font-semibold text-foreground">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Price + controls */}
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-xs font-bold text-accent tabular-nums">
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onQtyChange(item._id, -1)}
                      className="flex h-5 w-5 items-center justify-center rounded border border-border bg-background text-foreground transition-colors hover:bg-muted"
                    >
                      <Minus className="h-2.5 w-2.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onQtyChange(item._id, 1)}
                      className="flex h-5 w-5 items-center justify-center rounded border border-accent/50 bg-accent/10 text-accent transition-colors hover:bg-accent/20"
                    >
                      <Plus className="h-2.5 w-2.5" />
                    </button>
                    <button
                      onClick={() => onRemove(item._id)}
                      className="ml-0.5 flex h-5 w-5 items-center justify-center rounded border border-destructive/40 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
