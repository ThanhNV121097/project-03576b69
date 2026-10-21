import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import Price from "./Price";
import type { Product } from "../lib/catalogue";

/**
 * One product: the picture on its lit panel, the name, the price. The whole
 * card is the link. The picture is a cut-out on --product-ground, so it keeps
 * its shading on a dark card.
 */
export default function ProductCard({ product, testid, eager = false }: {
  product: Product;
  testid?: string;
  eager?: boolean;
}) {
  return (
    <Link
      to={`/product/${product.id}`}
      data-record={`products:${product.id}`}
      data-testid={testid ?? `product-${product.id}`}
      className="group flex flex-col gap-4 border border-line bg-surface p-4 transition-colors duration-[var(--duration-fast)] hover:border-accent"
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        aspect="1/1"
        slot={`/images/products/${product.id}.png`}
        caption={product.name}
        eager={eager}
        className="transition-transform duration-[var(--duration-fast)] group-hover:scale-[1.02]"
      />
      {/* Name over price on a phone, where two columns squeeze both; side by
          side on one baseline from 640px. */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="font-display">{product.name}</h3>
        <Price amount={product.price} was={product.oldPrice} className="shrink-0 text-accent sm:text-right" />
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{product.summary}</p>
    </Link>
  );
}
