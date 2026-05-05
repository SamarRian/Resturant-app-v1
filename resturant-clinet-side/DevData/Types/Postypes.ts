export type OrderType = "dine-in" | "takeaway" | "delivery";

export interface OrderItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  qty: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  label: string;
}
