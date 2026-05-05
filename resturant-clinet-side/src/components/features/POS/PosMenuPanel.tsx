import { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import PosActionBar from "./PosActionBar";
import PosProductCard from "./PosProuctCard";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  label: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  selected?: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: "all", label: "All Products" },
  { id: "pizza", label: "Pizza" },
  { id: "specialties", label: "Specialties" },
  { id: "crust", label: "Crust" },
  { id: "burger", label: "Burger" },
  { id: "wrap", label: "Wrap" },
  { id: "shawarma", label: "Shawarma" },
  { id: "paratha", label: "Paratha Roll" },
  { id: "pasta", label: "Pasta" },
  { id: "wings", label: "Grilled Wings" },
  { id: "nuggets", label: "Nuggets & Hot Wings" },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vegetarian",
    price: 850,
    category: "pizza",
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80",
  },
  {
    id: 2,
    name: "Cheesy Veesy",
    price: 950,
    category: "pizza",
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=80",
  },
  {
    id: 3,
    name: "SN Special Pizza",
    price: 1100,
    category: "specialties",
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80",
  },
  {
    id: 4,
    name: "Lyallpuri Pizza",
    price: 990,
    category: "pizza",
    imageUrl:
      "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=200&q=80",
  },
  {
    id: 5,
    name: "Afghani",
    price: 1050,
    category: "specialties",
    imageUrl:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&q=80",
  },
  {
    id: 6,
    name: "Special Bihari Ka...",
    price: 1150,
    category: "specialties",
    imageUrl:
      "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=200&q=80",
  },
  {
    id: 7,
    name: "Peri Peri",
    price: 900,
    category: "pizza",
    imageUrl:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&q=80",
  },
  {
    id: 8,
    name: "Half & Half",
    price: 1000,
    category: "pizza",
    imageUrl:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&q=80",
  },
  {
    id: 9,
    name: "Cheese Crust",
    price: 1100,
    category: "crust",
    imageUrl:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&q=80",
    selected: true,
  },
  {
    id: 10,
    name: "Royal Crust",
    price: 1200,
    category: "crust",
    imageUrl:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&q=80",
  },
  {
    id: 11,
    name: "Kabab Crust",
    price: 1150,
    category: "crust",
    imageUrl:
      "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=200&q=80",
  },
  {
    id: 12,
    name: "Zinger Burger",
    price: 450,
    category: "burger",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80",
  },
  {
    id: 13,
    name: "Crispy Petty Bur...",
    price: 380,
    category: "burger",
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=80",
  },
  {
    id: 14,
    name: "Chapli Burger",
    price: 420,
    category: "burger",
    imageUrl:
      "https://images.unsplash.com/photo-1556040220-4096d522378d?w=200&q=80",
  },
  {
    id: 15,
    name: "Double Crispy P...",
    price: 580,
    category: "burger",
    imageUrl:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200&q=80",
  },
  {
    id: 16,
    name: "Tower Burger",
    price: 650,
    category: "burger",
    imageUrl:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=200&q=80",
  },
  {
    id: 17,
    name: "Double Steak Bu...",
    price: 700,
    category: "burger",
    imageUrl:
      "https://images.unsplash.com/photo-1608767221051-2b9d18f35c2e?w=200&q=80",
  },
  {
    id: 18,
    name: "Tortilla Wrap",
    price: 350,
    category: "wrap",
    imageUrl:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&q=80",
  },
];

export function PosMenuPanel() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set([9]));
  const [customer, setCustomer] = useState("");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      {/* ── Category Tabs ── */}
      <div className="relative flex items-center gap-1 border-b border-border bg-card px-3 py-2">
        <button className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Scrollable pill row */}
        <div className="hide-scrollbar flex flex-1 gap-1.5 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                activeCategory === cat.id
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* ── Customer Row ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card px-4 py-2.5">
        <div className="min-w-45 flex-1">
          <InputGroup>
            <Input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="pr-9 text-sm"
              placeholder="Walk-in Customer"
            />
            <InputGroupAddon align={"inline-end"}>
              <Button className="bg-accent/10 p-0.5 text-accent hover:bg-accent/20">
                <UserPlus className="h-3.5 w-3.5" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <Button
          size="sm"
          className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Custom
        </Button>
      </div>

      {/* ── Search ── */}
      <div className="border-b border-border bg-card px-4 py-2.5">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm"
            placeholder="Search Product..."
          />
        </div>
      </div>

      {/* ── Product Grid ── */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-3 gap-3 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center gap-2 py-16 text-center">
              <Search className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No products found</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <PosProductCard
                key={product.id}
                product={product}
                onAdd={handleAdd}
                isSelected={selectedIds.has(product.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
      <PosActionBar />
    </div>
  );
}

export default PosMenuPanel;
