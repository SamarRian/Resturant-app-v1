import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "../../../../DevData/PosData";
import type { Product } from "../../../../DevData/Types/Postypes";
import { PosCustomDialoge } from "./PosCustomDialoge";
import { useGetAllProducts } from "@/hooks/QueryHooks/Product/useGetAllProducts";
import { useGetDeals } from "@/hooks/QueryHooks/Deals/useGetDeals";
import { PosDealsDialog } from "./PosDealsDialoge";
import { usePosContext } from "@/hooks/usePosContext";
import { PosCalculationsDialog } from "./PosCalculationsDialog";
import PosPaymentDialog from "./PosPaymentDialog";
import PosProductDialog from "./PosProductDialog";
import PosDeliveryDialog from "./PosDeliveryDialog";
import PosCustomerDetailsDialog from "./PosCustomerDetallsDialog";
import { EndPosSessionDialog } from "./PosEndSessionDialog";
import PosRunningOrdersDialog from "./PosRunningOrdersDialog";
import PosSessionReportDialog from "./PosSessionRepostDialog";
import PosSelectTableDialog from "./PosSelectTableDialog";
import { usePosOrderContext } from "@/hooks/usePosOrderContext";

interface PosMenuPanelProps {
  customer: string;
  selectedIds: Set<number>;
  onCustomerChange: (value: string) => void;
  onProductClick: (product: Product) => void;
}

export function PosMenuPanel({
  selectedIds,

  onProductClick,
  setItems,
  items,
  subtotal,

  discount,

  service,

  tax,

  total,
}: PosMenuPanelProps) {
  // DATA FETCHING
  const { isProductsLoading, productsData: Products } = useGetAllProducts();
  const { dealsData, isDealLoading } = useGetDeals();

  // POS CONTEXT
  const {
    IsPosDealDialogOpen,
    setPosDealDialog,
    togglePosDealDialog,
    handleCurrentDealProduct,
    togglePosProductDialog,
    togglePosCustomerDetailDialog,
  } = usePosContext();

  const { submitOrderData } = usePosOrderContext();

  // DATA RENAMING
  const renamedDealData = dealsData?.map((deal, index) => {
    return {
      name: deal.dealName,
      cost: deal.dealCost,
      price: deal.dealPrice,
      _id: deal._id,
      status: deal.status,
      image: deal.image,
      description: `Deal with ${deal.variantsIncluded.length} variations`,
      isDeal: true,
      dealVariations: deal.variantsIncluded,
      regularPrice: deal.regularPrice,
    };
  });

  const updatedProducts = Products?.map((product) => ({
    ...product,
    isDeal: false,
  }));

  const combinedData = [...(renamedDealData ?? []), ...(updatedProducts ?? [])];

  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState("Walk-in Customer");

  const [customDialogOpen, setCustomDialog] = useState(false);
  const filteredProducts = combinedData?.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleCustomDialog() {
    setCustomDialog((prev) => !prev);
  }

  function checkCurrentProduct(product) {
    if (product.isDeal === true) {
      handleCurrentDealProduct(product);
      togglePosDealDialog();
    } else if (product.isDeal === false && product.variations.length !== 0) {
      handleCurrentDealProduct(product);
      togglePosProductDialog();
    } else {
      onProductClick(product);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      submitOrderData("customerId", customer);
    }, 800);
    return () => clearTimeout(timer);
  }, [customer]);
  return (
    <div className="flex-col overflow-hidden rounded-xl border border-border bg-card md:flex md:flex-1">
      {/* ── Category pills (horizontally scrollable) ── */}
      <div className="flex shrink-0 items-center gap-1 border-b border-border px-2 py-2">
        <button className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
        </button>

        <ScrollArea orientation="horizontal" className="flex-1">
          <div className="flex gap-1.5 pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all",
                  activeCategory === cat.id
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollArea>

        <button className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* ── Customer + Search row ── */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border px-3 py-2">
        <div className="relative min-w-40 flex-1">
          <Input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="h-8 pr-8 text-sm"
            placeholder="Walk-in Customer"
          />
          <button
            onClick={togglePosCustomerDetailDialog}
            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-accent hover:text-accent/80"
          >
            <UserPlus className="h-3.5 w-3.5" />
          </button>
        </div>

        <Button
          onClick={handleCustomDialog}
          size="sm"
          className="h-8 gap-1.5 bg-accent text-xs text-accent-foreground hover:bg-accent/90"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Custom
        </Button>

        <div className="relative min-w-45 flex-1">
          <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-sm"
            placeholder="Search Product..."
          />
        </div>
      </div>

      {/* ── Scrollable product grid ── */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="grid grid-cols-3 gap-2.5 p-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {filteredProducts?.length === 0 ? (
            <div className="col-span-full flex flex-col items-center gap-2 py-16">
              <Search className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No products found</p>
            </div>
          ) : (
            filteredProducts?.map((product) => {
              const isSelected = selectedIds.has(product._id);
              return (
                <button
                  key={product._id}
                  onClick={() => {
                    checkCurrentProduct(product);
                  }}
                  className={cn(
                    "group flex flex-col overflow-hidden rounded-xl border bg-background text-left transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95",
                    isSelected
                      ? "border-accent ring-2 ring-accent/30"
                      : "border-border hover:border-accent/40"
                  )}
                >
                  {/* Product image */}
                  <div className="relative w-full overflow-hidden bg-muted/40 pt-[72%]">
                    {product.image ? (
                      <img
                        src={`http://localhost:5000/images/${product.image}`}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingBag className="h-7 w-7 text-muted-foreground/20" />
                      </div>
                    )}
                  </div>

                  {/* Product name + price */}
                  <div className="w-full px-1.5 py-1.5">
                    <p className="truncate text-center text-[11px] leading-tight font-semibold text-foreground">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-center text-[10px] font-bold text-accent">
                      {product.price}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* DIALOGS */}
      <PosCustomDialoge
        items={items}
        setItems={setItems}
        open={customDialogOpen}
        onOpenChange={setCustomDialog}
        onProductClicks={onProductClick}
      />
      <PosDealsDialog
        open={IsPosDealDialogOpen}
        onOpenChange={setPosDealDialog}
        onProductClicks={onProductClick}
      />
      <PosCalculationsDialog />
      <PosPaymentDialog
        tax={tax}
        total={total}
        subtotal={subtotal}
        service={service}
        discount={discount}
        items={items}
      />

      <PosProductDialog onProductClicks={onProductClick} />
      <PosDeliveryDialog />

      <PosCustomerDetailsDialog />
      <EndPosSessionDialog />

      <PosRunningOrdersDialog />

      <PosSessionReportDialog />

      <PosSelectTableDialog />
    </div>
  );
}
