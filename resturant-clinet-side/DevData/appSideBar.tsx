import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Settings,
  HandCoins,
} from "lucide-react";

// Data top Items
export const topItems: NavItems[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "POS", url: "/pos", icon: ShoppingCart },
];

// Data dropdown items
export const dropdownItems: dropdownItemsTypes[] = [
  {
    title: "Master Data",
    icon: Users,
    children: [
      { title: "Tables", url: "/table" },
      { title: "Vehical", url: "/vehical" },
      { title: "Staff", url: "/staff" },
      { title: "Category", url: "/category" },
    ],
  },

  {
    title: "Products",
    icon: Package,
    children: [
      { title: "All Products", url: "/products" },
      { title: "Add Product", url: "/products/add" },
      { title: "Categories", url: "/products/categories" },
    ],
  },
  {
    title: "Deals",
    icon: HandCoins,
    children: [
      { title: "All Deals", url: "/deals" },
      { title: "Add Deals", url: "/deals/add" },
    ],
  },

  {
    title: "Settings",
    icon: Settings,
    children: [{ title: "General", url: "/settings" }],
  },
];

// Typescript code
export interface NavItems {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface topItemTypes {
  dropItems: NavItems[];
}

export interface SubMenuItem {
  title: string;
  url: string;
}

export interface dropdownItemsTypes {
  title: string;
  icon: LucideIcon;
  children: SubMenuItem[];
}
