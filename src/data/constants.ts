import {
  Pizza,
  Sandwich,
  GlassWater,
  Salad,
  IceCreamCone,
  CupSoda,
  Coffee,
  Flame,
} from "lucide-react";
import type { Category, Product } from "./types";

export const STAFF = { username: "admin", password: "admin123" };

export const TAX_RATE = 0.18; // 18% GST

export interface DiscountOption {
  id: string;
  label: string;
  type: "percent" | "flat";
  value: number;
}

export const DISCOUNT_OPTIONS: DiscountOption[] = [
  { id: "none",    label: "No Discount",          type: "percent", value: 0 },
  { id: "loyal5",  label: "Loyal Customer — 5%",  type: "percent", value: 5 },
  { id: "mem10",   label: "Member Discount — 10%", type: "percent", value: 10 },
  { id: "staff15", label: "Staff Discount — 15%",  type: "percent", value: 15 },
  { id: "flat50",  label: "Flat ₹50 Off",          type: "flat",    value: 50 },
  { id: "flat100", label: "Flat ₹100 Off",         type: "flat",    value: 100 },
  { id: "flat200", label: "Flat ₹200 Off",         type: "flat",    value: 200 },
];

export const CATEGORIES: Category[] = [
  { id: "pizza",    name: "Pizza",    icon: Pizza },
  { id: "burgers",  name: "Burgers",  icon: Sandwich },
  { id: "juice",    name: "Juice",    icon: GlassWater },
  { id: "salads",   name: "Salads",   icon: Salad },
  { id: "desserts", name: "Desserts", icon: IceCreamCone },
  { id: "drinks",   name: "Drinks",   icon: CupSoda },
  { id: "coffee",   name: "Coffee",   icon: Coffee },
  { id: "tea",      name: "Tea",      icon: Flame },
];

// Images sourced from Unsplash (free to use, no API key required)
// https://unsplash.com/license
export const PRODUCTS: Product[] = [
  {
    id: "p1", cat: "pizza", name: "Margherita", price: 299, emoji: "🍕",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80&fit=crop",
    description: "Classic tomato, fresh mozzarella & basil",
  },
  {
    id: "p2", cat: "pizza", name: "Pepperoni", price: 349, emoji: "🍕",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80&fit=crop",
    description: "Loaded with crispy pepperoni slices",
  },
  {
    id: "p3", cat: "pizza", name: "Four Cheese", price: 379, emoji: "🍕",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80&fit=crop",
    description: "Mozzarella, cheddar, gouda & parmesan",
  },
  {
    id: "p4", cat: "pizza", name: "BBQ Chicken", price: 399, emoji: "🍕",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&fit=crop",
    description: "Smoky BBQ sauce with grilled chicken",
  },

  {
    id: "b1", cat: "burgers", name: "Classic Cheeseburger", price: 249, emoji: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80&fit=crop",
    description: "Beef patty, cheddar, lettuce & pickles",
  },
  {
    id: "b2", cat: "burgers", name: "Double Smash", price: 329, emoji: "🍔",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80&fit=crop",
    description: "Two smashed patties with special sauce",
  },
  {
    id: "b3", cat: "burgers", name: "Veggie Burger", price: 219, emoji: "🍔",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80&fit=crop",
    description: "Plant-based patty, avocado & sprouts",
  },
  {
    id: "b4", cat: "burgers", name: "Bacon Deluxe", price: 309, emoji: "🍔",
    image: "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=400&q=80&fit=crop",
    description: "Crispy bacon, caramelised onions & BBQ",
  },

  {
    id: "j1", cat: "juice", name: "Orange Squeeze", price: 129, emoji: "🍊",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80&fit=crop",
    description: "Freshly squeezed Valencia oranges",
  },
  {
    id: "j2", cat: "juice", name: "Watermelon Cooler", price: 149, emoji: "🍉",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80&fit=crop",
    description: "Chilled watermelon with a hint of mint",
  },
  {
    id: "j3", cat: "juice", name: "Green Detox", price: 169, emoji: "🥬",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80&fit=crop",
    description: "Spinach, cucumber, apple & ginger",
  },
  {
    id: "j4", cat: "juice", name: "Mango Blast", price: 159, emoji: "🥭",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80&fit=crop",
    description: "Tropical mango with pineapple & lime",
  },

  {
    id: "s1", cat: "salads", name: "Caesar Salad", price: 199, emoji: "🥗",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80&fit=crop",
    description: "Romaine, parmesan, croutons & dressing",
  },
  {
    id: "s2", cat: "salads", name: "Greek Salad", price: 219, emoji: "🥗",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80&fit=crop",
    description: "Tomato, cucumber, olives & feta cheese",
  },
  {
    id: "s3", cat: "salads", name: "Garden Fresh", price: 179, emoji: "🥗",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80&fit=crop",
    description: "Mixed greens, carrots, radish & vinaigrette",
  },

  {
    id: "d2", cat: "desserts", name: "Cheesecake", price: 199, emoji: "🍰",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80&fit=crop",
    description: "New York style with berry compote",
  },
  {
    id: "d3", cat: "desserts", name: "Ice Cream Sundae", price: 149, emoji: "🍨",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80&fit=crop",
    description: "Three scoops, hot fudge & whipped cream",
  },

  {
    id: "dr1", cat: "drinks", name: "Cola", price: 79, emoji: "🥤",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80&fit=crop",
    description: "Ice-cold classic cola over crushed ice",
  },
  {
    id: "dr2", cat: "drinks", name: "Iced Coffee", price: 119, emoji: "☕",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80&fit=crop",
    description: "Cold brew with milk over ice",
  },
  {
    id: "dr3", cat: "drinks", name: "Lemonade", price: 99, emoji: "🍋",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80&fit=crop",
    description: "House-made with fresh lemons & cane sugar",
  },

  // Coffee
  {
    id: "cf1", cat: "coffee", name: "Espresso", price: 99, emoji: "☕",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80&fit=crop",
    description: "Rich double-shot espresso, strong & bold",
  },
  {
    id: "cf3", cat: "coffee", name: "Latte", price: 139, emoji: "☕",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80&fit=crop",
    description: "Smooth espresso with velvety steamed milk",
  },
  {
    id: "cf4", cat: "coffee", name: "Cold Brew", price: 149, emoji: "🧋",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80&fit=crop",
    description: "12-hour cold steeped, served over ice",
  },
  {
    id: "cf5", cat: "coffee", name: "Mocha", price: 149, emoji: "☕",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80&fit=crop",
    description: "Espresso, chocolate syrup & whipped cream",
  },

  // Tea
  {
    id: "t1", cat: "tea", name: "Masala Chai", price: 69, emoji: "🍵",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80&fit=crop",
    description: "Classic spiced Indian chai with ginger",
  },
  {
    id: "t2", cat: "tea", name: "Green Tea", price: 79, emoji: "🍵",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&q=80&fit=crop",
    description: "Light & refreshing Japanese green tea",
  },
];
