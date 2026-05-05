import type { Category, OrderItem, Product } from "./Types/Postypes";

export const CATEGORIES: Category[] = [
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
];

export const PRODUCTS: Product[] = [
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
    name: "Special Bihari",
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
    name: "Special Bihari",
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
    name: "Special Bihari",
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
    name: "Crispy Burger",
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
    name: "Double Crispy",
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
    name: "Steak Burger",
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
  {
    id: 19,
    name: "Chicken Shawarma",
    price: 400,
    category: "shawarma",
    imageUrl:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200&q=80",
  },
  {
    id: 20,
    name: "Paratha Roll",
    price: 280,
    category: "paratha",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80",
  },
];

export const INITIAL_ORDER_ITEMS: OrderItem[] = [
  {
    id: 1,
    name: "[DEAL] Teacher Deal",
    description: "Soft Drink (H-Liter +120), Arabic Broast Half (+1100)",
    price: 999,
    qty: 1,
  },
  {
    id: 2,
    name: "Chicken Fajita",
    description: "Size: Medium (+1050.00)",
    price: 1050,
    qty: 1,
  },
  {
    id: 3,
    name: "Soft Drink",
    description: "Size: 350ML (+100.00)",
    price: 100,
    qty: 1,
  },
];
