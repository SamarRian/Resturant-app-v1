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

export default function PosPage() {
  // ── Order state ──────────────────────────────────────────────────────────
  const [orderNo] = useState(14);
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [customer, setCustomer] = useState("Walk-in Customer");
  const [items, setItems] = useState<OrderItem[]>(INITIAL_ORDER_ITEMS);

  // ── Menu state ───────────────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleQtyChange = (id: number, delta: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );

  const handleRemove = (id: number) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const handleNewOrder = () => {
    setItems([]);
    setSelectedIds(new Set());
  };

  const handleProductClick = (product: Product) => {
    // Toggle selected highlight
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });

    // Add to order or increment qty
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, qty: 1 },
      ];
    });
  };

  // ── Calculations ─────────────────────────────────────────────────────────
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = 0;
  const service = 0;
  const tax = 0;
  const total = subtotal + service + tax - discount;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    // Full viewport — no page-level scroll
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Fixed top header */}
      <PosHeader
        balance={0}
        sales={subtotal}
        orders={items.length}
        onEndSession={() => console.log("Session ended")}
      />

      {/* Scrollable middle — order panel + menu panel */}
      <main className="flex min-h-0 flex-1 gap-2 p-2">
        <PosOrderPanel
          orderNo={orderNo}
          orderType={orderType}
          customer={customer}
          items={items}
          onOrderTypeChange={setOrderType}
          onCustomerChange={setCustomer}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
          onNewOrder={handleNewOrder}
        />

        <PosMenuPanel
          customer={customer}
          selectedIds={selectedIds}
          onCustomerChange={setCustomer}
          onProductClick={handleProductClick}
        />
      </main>

      {/* Fixed bottom footer */}
      <PosFooter
        subtotal={subtotal}
        discount={discount}
        service={service}
        tax={tax}
        total={total}
        onAction={(action) => console.log("Action:", action)}
      />
    </div>
  );
}
