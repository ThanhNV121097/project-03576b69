import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import { formatPrice } from "../lib/format";
import { useDemo } from "../lib/demo";
import { useCart, setQuantity, removeLine, cartTotals, exampleLines } from "../lib/mock/cart";
import Icon from "../components/Icon";
import ProductImage from "../components/ProductImage";
import Price from "../components/Price";

/**
 * The cart: each line with its picture, name, unit price, a quantity that
 * changes, a remove, and the total with the postage that makes it up.
 *
 * A cart is empty to anyone who has clicked nothing, which is every drawer,
 * tester and owner looking at it for the first time — so in demo mode it
 * shows three real lines instead. The empty state is still here; a real
 * visitor with nothing in the cart sees it.
 */
export default function Cart() {
  usePageMeta("pages.cart.title", "pages.cart.description");
  const demo = useDemo();
  const real = useCart();
  const lines = demo && real.length === 0 ? exampleLines() : real;
  const { subtotal, shipping, total } = cartTotals(lines);
  const removeLabel = useContent<string>("cart.remove");
  const lessLabel = useContent<string>("cart.quantity");

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <T k="cart.label" as="p" className="label text-ink-soft" />
        <T k="cart.heading" as="h1" className="mt-3" />
        <T k="cart.empty" as="p" className="mt-5 text-ink-soft" />
        <Link to="/shop" data-testid="cart-empty-shop"
          className="label mt-8 inline-flex items-center gap-2 bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85">
          <T k="cart.emptyCta.label" /><Icon name="arrow" size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      <T k="cart.label" as="p" className="label text-ink-soft" />
      <T k="cart.heading" as="h1" className="mt-3" />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
        <ul className="flex flex-col border-t border-line">
          {lines.map((l) => (
            <li key={l.id} data-record={`products:${l.id}`} data-testid={`line-${l.id}`}
              className="flex flex-wrap items-center gap-4 border-b border-line py-5 sm:flex-nowrap">
              <Link to={`/product/${l.id}`} className="w-[88px] shrink-0">
                <ProductImage src={l.image} alt={l.name} aspect="1/1"
                  slot={`/images/products/${l.id}.png`} caption={l.name} />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/product/${l.id}`} className="font-display text-[var(--size-h3)] hover:text-accent">{l.name}</Link>
                <p className="tabular mt-1 text-sm text-ink-soft">
                  <T k="cart.unit" /> {formatPrice(l.price)} · {l.unit}
                </p>
              </div>
              <div className="flex items-center border border-line" aria-label={lessLabel}>
                <button type="button" data-testid={`line-minus-${l.id}`} aria-label={`${lessLabel} −`}
                  onClick={() => setQuantity(l.id, l.quantity - 1)}
                  className="grid h-10 w-10 place-items-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-accent">
                  <Icon name="minus" size={14} />
                </button>
                <span data-testid={`line-quantity-${l.id}`} className="tabular w-8 text-center text-sm">{l.quantity}</span>
                <button type="button" data-testid={`line-plus-${l.id}`} aria-label={`${lessLabel} +`}
                  onClick={() => setQuantity(l.id, l.quantity + 1)}
                  className="grid h-10 w-10 place-items-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-accent">
                  <Icon name="plus" size={14} />
                </button>
              </div>
              <p data-testid={`line-total-${l.id}`} className="tabular w-[96px] shrink-0 text-right font-display text-[var(--size-price)]">
                {formatPrice(l.price * l.quantity)}
              </p>
              <button type="button" onClick={() => removeLine(l.id)} aria-label={removeLabel}
                data-testid={`line-remove-${l.id}`}
                className="grid h-10 w-10 shrink-0 place-items-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-accent">
                <Icon name="remove" size={16} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="flex h-fit flex-col gap-4 border border-line bg-surface p-6">
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-ink-soft"><T k="cart.subtotal" /></dt>
              <dd className="tabular text-right">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-ink-soft"><T k="cart.shipping" /></dt>
              <dd className="tabular text-right">
                {shipping === 0 ? <T k="cart.freeShipping" /> : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <dt className="label"><T k="cart.total" /></dt>
              <dd data-testid="cart-total" className="text-right">
                <Price amount={total} size="lg" className="text-accent" />
              </dd>
            </div>
          </dl>
          <T k="cart.freeOver" as="p" className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft" />
          <Link to="/checkout" data-testid="to-checkout"
            className="label inline-flex items-center justify-center gap-2 bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85">
            <Icon name="lock" size={16} /><T k="cart.checkout" />
          </Link>
          <Link to="/shop" className="label inline-flex items-center justify-center gap-2 border border-line px-7 py-4 text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent">
            <T k="cart.keepShopping" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
