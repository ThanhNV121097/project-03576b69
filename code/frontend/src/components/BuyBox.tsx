import { useState } from "react";
import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import { addLine } from "../lib/mock/cart";
import type { Product } from "../lib/catalogue";
import Icon from "./Icon";
import Price from "./Price";

/**
 * The buying half of a product page: the price, the stock line, the stepper
 * and the add-to-cart button, together on the first screen.
 */
export default function BuyBox({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const stockLeft = useContent<string>("product.stockLeft");
  const lessLabel = useContent<string>("product.less");
  const moreLabel = useContent<string>("product.more");
  const inStock = product.available && product.stock > 0;

  function add() {
    addLine({ id: product.id, name: product.name, price: product.price, image: product.image, unit: product.unit }, quantity);
    setAdded(true);
  }

  return (
    <>
      <div className="mt-7 flex items-baseline justify-between gap-4 border-t border-line pt-5">
        <span data-testid="product-price"><Price amount={product.price} was={product.oldPrice} size="lg" className="text-accent" /></span>
        <span className="label text-ink-soft">{product.unit}</span>
      </div>

      <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
        <Icon name={inStock ? "check" : "alert"} size={16} className="text-accent" />
        {inStock
          ? <span><span className="tabular">{product.stock}</span> {stockLeft}</span>
          : <T k="product.soldOut" />}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <div className="flex items-center border border-line">
          <button type="button" aria-label={lessLabel} data-testid="quantity-minus"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="grid h-12 w-12 place-items-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-accent">
            <Icon name="minus" size={16} />
          </button>
          <output id="quantity" data-testid="quantity" className="tabular w-10 text-center font-display">{quantity}</output>
          <button type="button" aria-label={moreLabel} data-testid="quantity-plus"
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="grid h-12 w-12 place-items-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-accent">
            <Icon name="plus" size={16} />
          </button>
        </div>
        <button type="button" onClick={add} data-testid="add-to-cart" disabled={!inStock}
          className="label inline-flex items-center gap-2 whitespace-nowrap bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85 disabled:opacity-50">
          <Icon name="cart" size={16} />
          <T k={added ? "product.added" : "product.add"} />
        </button>
      </div>
      {added && (
        <Link to="/cart" data-testid="go-to-cart" className="label mt-4 inline-flex items-center gap-2 text-accent hover:underline">
          <T k="cart.heading" /><Icon name="arrow" size={16} />
        </Link>
      )}

      <ul className="mt-9 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-soft">
        <li className="flex items-start gap-3"><Icon name="shipping" size={16} className="mt-[2px] text-accent" /><T k="product.shipping" /></li>
        <li className="flex items-start gap-3"><Icon name="returns" size={16} className="mt-[2px] text-accent" /><T k="product.returns" /></li>
        <li className="flex items-start gap-3"><Icon name="quality" size={16} className="mt-[2px] text-accent" /><T k="product.warranty" /></li>
      </ul>
    </>
  );
}
