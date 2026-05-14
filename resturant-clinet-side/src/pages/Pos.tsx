import { useState } from "react";
import { PosHeader } from "@/components/features/POS/PosHeader";
import { PosOrderPanel } from "../components/features/POS/PosOrderPanel";
import { PosMenuPanel } from "../components/features/POS/PosMenuPanel";
import { PosFooter } from "../components/features/POS/PosFooter";
import { INITIAL_ORDER_ITEMS } from "../../DevData/PosData";
import type {
  OrderItem,
  OrderType,
  Product,
} from "../../DevData/Types/Postypes";
import { usePosContext } from "@/hooks/usePosContext";
import { StartPosSessionDialog } from "@/components/features/POS/StartPosSessionDialog";
import PosRunningOrdersButton from "@/components/features/POS/PosRunningOrdersButton";

export default function PosPage() {
  const [startPosSession, setStartPosSession] = useState(true);

  // Pos context
  const { calculatePosDiscount, calculatePosService, calculatePosTax } =
    usePosContext();
  // ── Order state ──────────────────────────────────────────────────────────
  const [orderNo] = useState(14);
  const [customer, setCustomer] = useState("Walk-in Customer");
  const [items, setItems] = useState<OrderItem[]>([]);

  // ── Menu state ───────────────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(product._id)) next.delete(product._id);
      else next.add(product._id);
      return next;
    });

    setItems((prev) => {
      const existing = prev.find((it) => {
        if (!product.variant) return it._id === product._id;

        return (
          it._id === product._id &&
          it.selectedProductVariaton?._id ===
            product.selectedProductVariaton?._id
        );
      });

      if (existing) {
        return prev.map((it) => {
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
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: product.price || product?.selectedProductVariaton.price,
          quantity: 1,
          description: product.description,
          isDeal: product?.isDeal,
          isVariant: product?.variant,
          selectedProductVariaton: product?.selectedProductVariaton,
        },
      ];
    });
  };

  const subtotal = items.reduce((s, it) => {
    const price = it.isVariant
      ? (it.selectedProductVariaton?.price ?? 0)
      : (it.price ?? 0);
    return s + price * it.quantity;
  }, 0);

  // ✅ Har ek independently calculate ho raha hai
  // ✅ Property names bhi sahi hain: type aur amount
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
  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <PosHeader balance={0} sales={subtotal} orders={items.length} />

      <main className="flex min-h-0 flex-1 gap-2 p-2">
        <PosOrderPanel
          orderNo={orderNo}
          customer={customer}
          items={items}
          onCustomerChange={setCustomer}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
          onNewOrder={handleNewOrder}
        />

        <PosMenuPanel
          items={items}
          customer={customer}
          selectedIds={selectedIds}
          onCustomerChange={setCustomer}
          onProductClick={handleProductClick}
          setItems={setItems}
          subtotal={subtotal}
          discount={discount}
          service={service}
          tax={tax}
          total={total}
        />
      </main>

      {/* Fixed bottom footer */}
      <PosFooter
        subtotal={subtotal}
        discount={discount}
        service={service}
        tax={tax}
        total={total}
      />

      <StartPosSessionDialog
        open={startPosSession}
        onOpenChange={setStartPosSession}
      />
      <PosRunningOrdersButton />
    </div>
  );
}
