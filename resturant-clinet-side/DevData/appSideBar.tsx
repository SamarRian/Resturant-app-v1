import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  ShoppingCart,
  ArrowRightLeft,
  Tag,
  Users,
  BarChart2,
  Package,
  ShoppingBag,
  Receipt,
  UserCheck,
  Settings,
  FileText,
  HandCoins,
} from "lucide-react";

// Data top Items
export const topItems: NavItems[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "POS", url: "/pos", icon: ShoppingCart },
  { title: "Transfer Stock", url: "/transfer-stock", icon: ArrowRightLeft },
  { title: "Deals", url: "/deals", icon: Tag },
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
    title: "Manage Users",
    icon: Users,
    children: [
      { title: "All Users", url: "/users" },
      { title: "Add User", url: "/users/add" },
      { title: "Roles", url: "/users/roles" },
    ],
  },
  {
    title: "Sales",
    icon: BarChart2,
    children: [
      { title: "Sales List", url: "/sales" },
      { title: "New Sale", url: "/sales/new" },
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
    title: "Manage Purchase",
    icon: ShoppingBag,
    children: [
      { title: "Purchases", url: "/purchases" },
      { title: "New Purchase", url: "/purchases/new" },
    ],
  },
  {
    title: "Expenses",
    icon: Receipt,
    children: [
      { title: "All Expenses", url: "/expenses" },
      { title: "Add Expense", url: "/expenses/add" },
    ],
  },
  {
    title: "Employees",
    icon: UserCheck,
    children: [
      { title: "All Employees", url: "/employees" },
      { title: "Add Employee", url: "/employees/add" },
      { title: "Attendance", url: "/employees/attendance" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", url: "/settings" },
      { title: "Profile", url: "/settings/profile" },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    children: [
      { title: "Sales Report", url: "/reports/sales" },
      { title: "Stock Report", url: "/reports/stock" },
      { title: "Expense Report", url: "/reports/expenses" },
    ],
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
