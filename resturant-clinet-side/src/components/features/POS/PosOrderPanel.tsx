import { Plus, Minus, Trash2, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { OrderItem, OrderType } from "../../../../DevData/Types/Postypes";
import { usePosContext } from "@/hooks/usePosContext";
import { usePosOrderContext } from "@/hooks/usePosOrderContext";
import { useGetSingleOrder } from "@/hooks/QueryHooks/PosSession/PosOrder/useGetSingleOrder";
import { useEffect } from "react";
import { useGenerateEmptyOrder } from "@/hooks/QueryHooks/PosSession/PosOrder/useGenerateEmptyOrder";
import { toast } from "sonner";

interface PosOrderPanelProps {
  orderNo: number;
  orderType: OrderType;
  customer: string;
  items: OrderItem[];
  onOrderTypeChange: (type: OrderType) => void;
  onCustomerChange: (value: string) => void;
  onQtyChange: (id: string, delta: number, variationId?: string) => void;
  onRemove: (id: string, variationId?: string) => void;
  onNewOrder: () => void;
}

export function PosOrderPanel({
  items,
  onQtyChange,
  onRemove,
  setItems,
}: PosOrderPanelProps) {
  const { togglePosSelectTableDialog, orderType, setOrderType } =
    usePosContext();
  const {
    emptyOrderID,
    handleEmptyOrderID,
    submitOrderData,
    viewedOrderId,
    handleViewedOrderId,
  } = usePosOrderContext();
  // MODE VIEW OR REGULAR
  const viewMode = viewedOrderId ? true : false;
  const { generateEmptyOrderFN } = useGenerateEmptyOrder();
  const { data } = useGetSingleOrder(viewMode ? viewedOrderId : emptyOrderID);

  const orderData = data ? data.data : {};

  console.log("ITEMS DATA", items);
  console.log("ORDER DATA", orderData);
  const mapData = viewMode
    ? [...(orderData.items ?? []), ...(items ?? [])]
    : (items ?? []);
  console.log("MAP DATA", mapData);

  useEffect(() => {
    submitOrderData("orderType", orderType);
  }, [orderType]);

  function handleGenerateEmptyOrder() {
    if (items.length > 0) {
      handleViewedOrderId("");
      generateEmptyOrderFN(undefined, {
        onSuccess: (data) => {
          handleEmptyOrderID(data?.order?._id || "");
          setItems([]);
        },
      });
    } else {
      toast.warning(`First fill the Order # ${orderData.orderNumber}`);
    }
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card md:w-85 md:shrink-0 lg:w-95">
      {/* ── Order header ── */}
      <div className="shrink-0 space-y-2 border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">
              Order #: {orderData.orderNumber}
            </span>
            <Badge className="bg-amber-400 text-[10px] text-amber-950 hover:bg-amber-400">
              {orderData.orderStatus}
            </Badge>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-xs"
            onClick={handleGenerateEmptyOrder}
          >
            <Plus className="h-3 w-3" />
            New Order
          </Button>
        </div>

        {/* Order type tabs */}
        <Tabs
          defaultValue="dine-in"
          value={orderType}
          onValueChange={setOrderType}
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
        {orderType === "dine-in" && (
          <Button
            className="w-full"
            onClick={() => {
              togglePosSelectTableDialog();
            }}
          >
            Select Table
          </Button>
        )}
      </div>

      {/* ── Scrollable order items ── */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-2 p-3">
          {mapData?.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <UtensilsCrossed className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No items yet</p>
            </div>
          ) : (
            mapData?.map((item) => (
              <div
                key={item.productId}
                className="flex items-start gap-2 rounded-lg border border-border bg-background p-2.5 transition-shadow hover:shadow-sm"
              >
                {/* Item info */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-tight font-semibold text-foreground">
                    {item?.selectedProductVariaton?.variantName
                      ? `${item.name} variant ${item?.selectedProductVariaton?.variantName}`
                      : item.name}
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
                    {item?.isVariant
                      ? (
                          item?.selectedProductVariaton?.price * item.quantity
                        ).toFixed(2)
                      : (item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        onQtyChange(
                          item.productId,
                          -1,
                          item.selectedProductVariaton?._id
                        )
                      }
                      className="flex h-5 w-5 items-center justify-center rounded border border-border bg-background text-foreground transition-colors hover:bg-muted"
                    >
                      <Minus className="h-2.5 w-2.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onQtyChange(
                          item.productId,
                          1,
                          item.selectedProductVariaton?._id
                        )
                      }
                      className="flex h-5 w-5 items-center justify-center rounded border border-accent/50 bg-accent/10 text-accent transition-colors hover:bg-accent/20"
                    >
                      <Plus className="h-2.5 w-2.5" />
                    </button>
                    <button
                      onClick={() =>
                        onRemove(
                          item.productId,
                          item.selectedProductVariaton?._id
                        )
                      }
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
