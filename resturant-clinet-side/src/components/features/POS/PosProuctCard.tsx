import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

export default function PosProductCard({
  product,
  onAdd,
  isSelected,
}: {
  product: Product;
  onAdd: (id: number) => void;
  isSelected: boolean;
}) {
  return (
    <button
      onClick={() => onAdd(product.id)}
      className={cn(
        "group relative flex flex-col items-center overflow-hidden rounded-xl border bg-card text-left transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95",
        isSelected
          ? "border-accent ring-2 ring-accent/40"
          : "border-border hover:border-accent/40"
      )}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-muted/50 pt-[75%]">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingCart className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}

        {/* Selected overlay */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
            <div className="rounded-full bg-accent p-1">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Name + Price */}
      <div className="w-full px-2 py-2">
        <p className="truncate text-center text-[12px] leading-tight font-semibold text-foreground">
          {product.name}
        </p>
        <p className="mt-0.5 text-center text-[11px] font-medium text-accent">
          {product.price.toFixed(0)}
        </p>
      </div>
    </button>
  );
}
