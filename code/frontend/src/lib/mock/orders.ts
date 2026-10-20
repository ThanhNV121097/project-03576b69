import type { CartLine } from "./cart";

/**
 * Paying, in the browser. The backend story replaces this with Stripe and
 * the orders API; no card number is kept, nothing is charged, and the
 * confirmation is a real page with a real number on it.
 */

export interface PaidOrder {
  id: string;
  placed: string;
  status: string;
  total: number;
  items: string;
}

const KEY = "loopaudio:orders";

function read(): PaidOrder[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as PaidOrder[]) : [];
  } catch {
    return [];
  }
}

/** Every order paid for in this browser, newest first. */
export function paidOrders(): PaidOrder[] {
  return read();
}

/** One order by its number, from this browser. */
export function paidOrder(id: string): PaidOrder | undefined {
  return read().find((o) => o.id === id);
}

function nextNumber(): string {
  // A shop's order numbers run on: the highest seen, plus one.
  const highest = read().reduce((max, o) => Math.max(max, Number(o.id.replace(/\D/g, "")) || 0), 2417);
  return `la-${highest + 1}`;
}

/** Takes the payment — no charge, a short wait — and writes the order. */
export async function pay(lines: CartLine[], total: number): Promise<PaidOrder> {
  await new Promise((r) => setTimeout(r, 700));
  const order: PaidOrder = {
    id: nextNumber(),
    placed: new Date().toISOString().slice(0, 10),
    status: "Paid",
    total,
    items: lines.map((l) => `${l.name} \u00d7 ${l.quantity}`).join(", "),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify([order, ...read()]));
  } catch {
    /* storage refused — the confirmation still shows this order */
  }
  return order;
}
