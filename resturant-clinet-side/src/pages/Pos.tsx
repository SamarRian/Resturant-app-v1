import { useEffect, useState } from "react";
import { PosHeader } from "@/components/features/POS/PosHeader";
import { PosOrderPanel } from "../components/features/POS/PosOrderPanel";
import { PosMenuPanel } from "../components/features/POS/PosMenuPanel";
import { PosFooter } from "../components/features/POS/PosFooter";
import type { OrderItem, Product } from "../../DevData/Types/Postypes";
import { usePosContext } from "@/hooks/usePosContext";
import { StartPosSessionDialog } from "@/components/features/POS/StartPosSessionDialog";
import PosRunningOrdersButton from "@/components/features/POS/PosRunningOrdersButton";
import { useGetSingleSession } from "@/hooks/QueryHooks/PosSession/useGetSingleSession";

import { usePosOrderContext } from "@/hooks/usePosOrderContext";
import { useUpdateOrder } from "@/hooks/QueryHooks/PosSession/PosOrder/useUpdateOrder";
import { toast } from "sonner";
import { useGenerateEmptyOrder } from "@/hooks/QueryHooks/PosSession/PosOrder/useGenerateEmptyOrder";
import { useAddOrderItems } from "@/hooks/QueryHooks/PosSession/PosOrder/useAddOrderItems";

export default function PosPage() {
  // Pos context
  const {
    calculatePosDiscount,
    calculatePosService,
    calculatePosTax,
    sessinId,

    setStartPosSessionDialog,
  } = usePosContext();

  const {
    orderData,
    submitOrderData,
    getPlainOrderData,
    handleViewedOrderId,
    emptyOrderID,
    handleEmptyOrderID,
    viewedOrderId,
  } = usePosOrderContext();

  // DATA FETCHING
  const { addOrderItemsFN } = useAddOrderItems();
  const { generateEmptyOrderFN } = useGenerateEmptyOrder();
  const { data, isLoading, isError } = useGetSingleSession(sessinId);

  const { updateOrderFN } = useUpdateOrder();

  // ── Order state ──────────────────────────────────────────────────────────

  const [items, setItems] = useState<OrderItem[]>([]);

  // ── Menu state ───────────────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (items.length > 0 && emptyOrderID && sessinId) {
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
  }, []);

  useEffect(() => {
    if (isLoading) {
      setStartPosSessionDialog(false);
      return;
    }

    // Case 1: No session ID exists
    if (!sessinId) {
      setStartPosSessionDialog(true);
      return;
    }

    if (isError) {
      setStartPosSessionDialog(true);
      localStorage.removeItem("sessionId"); // Clean invalid session
      return;
    }
    if (data?.success === false) {
      setStartPosSessionDialog(true);
    }
    // Case 3: Session ID exists and data received
    if (data) {
      const isActive = data?.data?.status === "active";

      if (isActive) {
        setStartPosSessionDialog(false);
      }
    }
  }, [sessinId, data, isLoading, isError, setStartPosSessionDialog]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleQtyChange = (id: string, delta: number, variationId?: string) => {
    setItems((prev) =>
      prev
        .map((it) => {
          const isMatch = variationId
            ? it._id === id && it.selectedProductVariaton?._id === variationId
            : it._id === id;

          if (!isMatch) return it;

          return { ...it, quantity: it.quantity + delta };
        })
        .filter((it) => it.quantity > 0)
    );
  };

  // ✅ Remove handler
  const handleRemove = (id: string, variationId?: string) => {
    setItems((prev) =>
      prev.filter((it) => {
        const isMatch = variationId
          ? it._id === id && it.selectedProductVariaton?._id === variationId
          : it._id === id;

        return !isMatch;
      })
    );
  };

  const handleNewOrder = () => {
    setItems([]);
    setSelectedIds(new Set());
  };

  const handleProductClick = (product: Product) => {
    console.log("PRODUCTS CLICKS", product);

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(product._id)) next.delete(product._id);
      else next.add(product._id);
      return next;
    });

    // ✅ Update items state
    setItems((prevItems) => {
      const existing = prevItems.find((it) => {
        if (!product.variant) return it._id === product._id;
        return (
          it._id === product._id &&
          it.selectedProductVariaton?._id ===
            product.selectedProductVariaton?._id
        );
      });

      if (existing) {
        return prevItems.map((it) => {
          if (!product.variant) {
            return it._id === product._id
              ? { ...it, quantity: it.quantity + 1 }
              : it;
          }
          return it._id === product._id &&
            it.selectedProductVariaton?._id ===
              product.selectedProductVariaton?._id
            ? { ...it, quantity: it.quantity + 1 }
            : it;
        });
      }

      return [
        ...prevItems,
        {
          _id: product._id,
          productId: product._id,
          name: product.name,
          unitPrice:
            product?.price || product?.selectedProductVariaton?.price || 0,
          quantity: 1,
          description: product?.description || "",
          isDeal: product?.isDeal || false,
          isVariant: product?.variant || false,
          selectedProductVariaton: product?.isDeal
            ? product?.dealVariations
            : product?.selectedProductVariaton,
          specialInstructions: product?.specialInstructions || "",
          isCustom: product?.isCustom || false,
        },
      ];
    });
  };

  useEffect(() => {
    if (!emptyOrderID || !sessinId) return;

    const formattedItems = items.map((item) => ({
      productId: item.isCustom ? null : item.productId || item._id,
      name: item.name,
      unitPrice: item.unitPrice || item.price || 0,
      quantity: item.quantity,
      description: item?.description || "",
      isDeal: item.isDeal || false,
      isVariant: item?.isVariant,
      selectedProductVariaton: item?.selectedProductVariaton,
      specialInstructions: item.specialInstructions || "",
      isCustom: item.isCustom || false,
    }));
    const timer = setTimeout(() => {
      addOrderItemsFN({
        orderID: viewedOrderId ? viewedOrderId : emptyOrderID,
        orderItems: formattedItems,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [items, emptyOrderID]);

  useEffect(() => {
    if (!emptyOrderID || !sessinId) return;
    const plainOrderData = getPlainOrderData();
    const timer = setTimeout(() => {
      updateOrderFN({
        orderId: viewedOrderId ? viewedOrderId : emptyOrderID,
        orderData: plainOrderData,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [orderData, emptyOrderID]);

  const subtotal = items.reduce((s, it) => {
    const price = it.isVariant
      ? (it.selectedProductVariaton?.price ?? 0)
      : (it.unitPrice ?? 0);
    return s + price * it.quantity;
  }, 0);

  const discount =
    calculatePosDiscount.type === "percentage"
      ? (subtotal * (calculatePosDiscount.amount || 0)) / 100
      : calculatePosDiscount.amount || 0;

  const service =
    calculatePosService.type === "percentage"
      ? (subtotal * (calculatePosService.amount || 0)) / 100
      : calculatePosService.amount || 0;

  const tax =
    calculatePosTax.type === "percentage"
      ? calculatePosTax.taxtype === "inclusive"
        ? subtotal - subtotal / (1 + calculatePosTax.amount / 100) // inclusive
        : (subtotal * calculatePosTax.amount) / 100 // exclusive
      : calculatePosTax.amount || 0; // fixed
  const total = subtotal + service + tax - discount;

  useEffect(() => {
    submitOrderData("subTotal", subtotal);
    submitOrderData("discountAmount", discount);
    submitOrderData("serviceChargeAmount", service);
    submitOrderData("taxAmount", tax);
    submitOrderData("totalAmount", total);
  }, [subtotal, discount, service, tax, total]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <PosHeader balance={0} sales={subtotal} orders={items.length} />

      <main className="flex min-h-0 flex-1 gap-2 p-2">
        <PosOrderPanel
          setItems={setItems}
          items={items}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
          onNewOrder={handleNewOrder}
        />

        <PosMenuPanel
          items={items}
          selectedIds={selectedIds}
          onProductClick={handleProductClick}
          setItems={setItems}
          subtotal={subtotal}
          discount={discount}
          service={service}
          tax={tax}
          total={total}
        />
      </main>

      <PosFooter
        subtotal={subtotal}
        discount={discount}
        service={service}
        tax={tax}
        total={total}
      />

      <StartPosSessionDialog setItems={setItems} />
      <PosRunningOrdersButton />
    </div>
  );
}
