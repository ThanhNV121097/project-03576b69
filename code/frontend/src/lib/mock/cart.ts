import { useSyncExternalStore } from "react";

/**
 * The cart, in the browser. The backend story replaces this module with the
 * real API; nothing else in the site knows where a line comes from.
 *
 * Kept in localStorage per browser so a reload does not empty it. When the
 * visitor signs in, the cart is theirs — the design has one browser, one
 * visitor, so there is nothing to merge yet.
 */

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  quantity: number;
}

const KEY = "loopaudio:cart";

let lines: CartLine[] = load();
const listeners = new Set<() => void>();

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* storage refused — the cart lives for this page only */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Every line in the cart, re-rendering the component when one changes. */
export function useCart(): CartLine[] {
  return useSyncExternalStore(subscribe, () => lines, () => []);
}

/** Adds one product, or raises the quantity of the line already there. */
export function addLine(line: Omit<CartLine, "quantity">, quantity = 1) {
  const qty = Math.max(1, Math.floor(quantity));
  const found = lines.find((l) => l.id === line.id);
  lines = found
    ? lines.map((l) => (l.id === line.id ? { ...l, quantity: l.quantity + qty } : l))
    : [...lines, { ...line, quantity: qty }];
  save();
}

/** Sets a line's quantity; 0 or less removes the line. */
export function setQuantity(id: string, quantity: number) {
  const qty = Math.floor(quantity);
  lines = qty > 0 ? lines.map((l) => (l.id === id ? { ...l, quantity: qty } : l)) : lines.filter((l) => l.id !== id);
  save();
}

/** Takes a line out of the cart. */
export function removeLine(id: string) {
  lines = lines.filter((l) => l.id !== id);
  save();
}

/** Empties the cart — called once the order is paid for. */
export function clearCart() {
  lines = [];
  save();
}

export const FREE_SHIPPING_OVER = 75;
export const FLAT_SHIPPING = 9;

/** What the cart costs: the lines, the postage and the total. */
export function cartTotals(items: CartLine[]) {
  const subtotal = items.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : FLAT_SHIPPING;
  return { subtotal, shipping, total: subtotal + shipping, count: items.reduce((n, l) => n + l.quantity, 0) };
}

/** The three lines the Studio, the walk and the owner's preview are shown. */
export const exampleLines: CartLine[] = [
  { id: "loop-one-wireless", name: "Loop One Wireless", price: 349, image: "/images/products-loop-one-wireless.png", unit: "pair", quantity: 1 },
  { id: "harbour-mini", name: "Harbour Mini", price: 329, image: "", unit: "each", quantity: 2 },
  { id: "loop-cable-kit", name: "Loop Cable Kit", price: 59, image: "/images/product-loop-cable-kit.png", unit: "set", quantity: 1 },
];
