import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { T, useList } from "../editable";
import { usePageMeta } from "../seo";
import { formatPrice } from "../lib/format";
import { useDemo } from "../lib/demo";
import { useSession } from "../lib/session";
import { useCart, cartTotals, clearCart, exampleLines } from "../lib/mock/cart";
import { pay } from "../lib/mock/orders";
import Icon, { type IconName } from "../components/Icon";
import Price from "../components/Price";
import SignInPanel from "../components/SignInPanel";

/**
 * Checkout. The lines as a summary, the total with the postage that makes it
 * up, the payment methods the owner named — Visa or Mastercard through
 * Stripe, and Apple Pay on a device that has it — and what happens after.
 *
 * Nothing is charged: src/lib/mock/orders.ts writes the order and the
 * confirmation page shows its number. A visitor who is not signed in is
 * asked to sign in first, because the order belongs to an account.
 */
export default function Checkout() {
  usePageMeta("pages.checkout.title", "pages.checkout.description");
  const navigate = useNavigate();
  const demo = useDemo();
  const session = useSession();
  const real = useCart();
  const lines = demo && real.length === 0 ? exampleLines : real;
  const { subtotal, shipping, total } = cartTotals(lines);
  const methods = useList<{ icon: IconName; label: string }>("checkout.methods");
  const [paying, setPaying] = useState(false);
  const input = "w-full bg-ground px-4 py-3 text-ink tabular";
  const textInput = "w-full bg-ground px-4 py-3 text-ink";

  if (!session && !demo) {
    return <SignInPanel noteKey="checkout.signInFirst" />;
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <T k="checkout.label" as="p" className="label text-ink-soft" />
        <T k="checkout.heading" as="h1" className="mt-3" />
        <T k="checkout.empty" as="p" className="mt-5 text-ink-soft" />
        <Link to="/shop" className="label mt-8 inline-flex items-center gap-2 bg-accent px-7 py-4 text-accent-ink hover:opacity-85">
          <T k="checkout.emptyCta.label" /><Icon name="arrow" size={16} />
        </Link>
      </div>
    );
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPaying(true);
    const order = await pay(lines, total);
    clearCart();
    navigate(`/order/${order.id}`);
  }

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      <T k="checkout.label" as="p" className="label text-ink-soft" />
      <T k="checkout.heading" as="h1" className="mt-3" />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
        <form onSubmit={(e) => void submit(e)} data-testid="checkout-form" className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-4 border-t border-line pt-6">
            <T k="checkout.payment" as="legend" className="label text-ink-soft" />
            <ul className="flex flex-wrap gap-3">
              {methods.map((m, i) => (
                <li key={m.label} className="flex items-center gap-2 border border-line px-4 py-3 text-sm">
                  <Icon name={m.icon} size={16} className="text-accent" />
                  <T k={`checkout.methods.${i}.label`} />
                </li>
              ))}
            </ul>
            <T k="checkout.paymentNote" as="p" className="max-w-[60ch] text-sm leading-relaxed text-ink-soft" />
          </fieldset>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <T k="checkout.cardName" className="label text-ink-soft" />
              <input id="card-name" name="card-name" autoComplete="cc-name" required className={textInput} />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <T k="checkout.cardNumber" className="label text-ink-soft" />
              <input id="card-number" name="card-number" inputMode="numeric" autoComplete="cc-number"
                placeholder="4242 4242 4242 4242" required className={input} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <T k="checkout.cardExpiry" className="label text-ink-soft" />
                <input id="card-expiry" name="card-expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="04 / 29" required className={input} />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <T k="checkout.cardCvc" className="label text-ink-soft" />
                <input id="card-cvc" name="card-cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" required className={input} />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm">
              <T k="checkout.email" className="label text-ink-soft" />
              <input id="receipt-email" name="receipt-email" type="email" autoComplete="email"
                defaultValue={session?.email ?? ""} required className="w-full border border-line bg-ground px-4 py-3 text-ink" />
            </label>
          </div>

          <div className="flex flex-col gap-4 border-t border-line pt-6">
            <button type="submit" data-testid="pay" disabled={paying}
              className="label inline-flex items-center justify-center gap-2 bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85 disabled:opacity-60">
              <Icon name="lock" size={16} />
              <T k={paying ? "checkout.paying" : "checkout.pay"} />
            </button>
            <T k="checkout.after" as="p" className="text-sm leading-relaxed text-ink-soft" />
          </div>
        </form>

        <aside className="flex h-fit flex-col gap-5 border border-line bg-surface p-6">
          <T k="checkout.summary" as="h2" className="text-[var(--size-h3)]" />
          <ul className="flex flex-col gap-3 text-sm">
            {lines.map((l) => (
              <li key={l.id} data-record={`products:${l.id}`} className="flex items-baseline justify-between gap-4">
                <span className="min-w-0">
                  {l.name} <span className="tabular text-ink-soft">× {l.quantity}</span>
                </span>
                <span className="tabular shrink-0 text-right">{formatPrice(l.price * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="flex flex-col gap-3 border-t border-line pt-4 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-ink-soft"><T k="checkout.subtotal" /></dt>
              <dd className="tabular text-right">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-ink-soft"><T k="checkout.shipping" /></dt>
              <dd className="tabular text-right">{shipping === 0 ? <T k="cart.freeShipping" /> : formatPrice(shipping)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <dt className="label"><T k="checkout.total" /></dt>
              <dd data-testid="checkout-total" className="text-right"><Price amount={total} size="lg" className="text-accent" /></dd>
            </div>
          </dl>
          <Link to="/cart" className="label inline-flex items-center gap-2 text-ink-soft hover:text-accent">
            <Icon name="back" size={14} /><T k="cart.heading" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
