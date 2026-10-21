import { formatPrice } from "../lib/format";

/**
 * A price, always through src/lib/format.ts and always tabular, so a column
 * of them stacks. `was` strikes the old price beside it.
 */
export default function Price({ amount, was, size = "md", className = "" }: {
  amount: number;
  was?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const fontSize = size === "lg" ? "var(--size-price-lg)" : "var(--size-price)";
  return (
    <span className={`tabular inline-flex max-w-full flex-wrap items-baseline gap-x-2 font-display ${className}`}>
      <span style={{ fontSize }}>{formatPrice(amount)}</span>
      {was && was > amount ? (
        <s className="tabular text-sm font-normal text-ink-soft">{formatPrice(was)}</s>
      ) : null}
    </span>
  );
}
