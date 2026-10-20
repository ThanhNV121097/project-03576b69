import { Link } from "react-router-dom";
import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { formatDate, formatPrice } from "../lib/format";
import { useDemo } from "../lib/demo";
import { useSession, signOut } from "../lib/session";
import { paidOrders } from "../lib/mock/orders";
import Icon from "../components/Icon";
import SignInPanel from "../components/SignInPanel";
import type { OrderRow } from "../lib/catalogue";

/**
 * The account: who is signed in, their past orders, and the way out. The
 * orders are the ones paid for in this browser, then the two in
 * src/data/orders.json, so the page is never a heading over nothing.
 */
export default function Account() {
  usePageMeta("pages.account.title", "pages.account.description");
  const demo = useDemo();
  const session = useSession();
  const { items: past } = useCollection<OrderRow>("orders", { pageSize: 10 });
  const mine = paidOrders();
  const orders: OrderRow[] = [...mine, ...past.filter((p) => !mine.some((m) => m.id === p.id))];

  if (!session && !demo) return <SignInPanel noteKey="auth.signIn.sub" />;

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      <T k="account.label" as="p" className="label text-ink-soft" />
      <T k="account.heading" as="h1" className="mt-3" />
      <p className="mt-5 flex flex-wrap items-center gap-2 text-ink-soft">
        <Icon name="account" size={16} className="text-accent" />
        <T k="account.signedInAs" />
        <span data-testid="account-email" className="text-ink">{session?.email ?? "dana@example.com"}</span>
      </p>

      <section className="mt-14">
        <T k="account.orders" as="h2" />
        {orders.length === 0 ? (
          <div className="mt-6">
            <T k="account.noOrders" as="p" className="text-ink-soft" />
            <Link to="/shop" className="label mt-6 inline-flex items-center gap-2 text-accent hover:underline">
              <T k="account.noOrdersCta.label" /><Icon name="arrow" size={16} />
            </Link>
          </div>
        ) : (
          <table className="mt-6 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="label py-3 pr-4 text-left font-normal text-ink-soft"><T k="account.orderNumber" /></th>
                <th scope="col" className="label py-3 pr-4 text-left font-normal text-ink-soft"><T k="account.placed" /></th>
                <th scope="col" className="label hidden py-3 pr-4 text-left font-normal text-ink-soft sm:table-cell"><T k="order.items" /></th>
                <th scope="col" className="label py-3 pr-4 text-left font-normal text-ink-soft"><T k="account.status" /></th>
                <th scope="col" className="label py-3 text-right font-normal text-ink-soft"><T k="account.total" /></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} data-record={`orders:${o.id}`} data-testid={`order-${o.id}`} className="border-b border-line">
                  <td className="py-4 pr-4">
                    <Link to={`/order/${o.id}`} className="tabular uppercase hover:text-accent">{o.id}</Link>
                  </td>
                  <td className="tabular py-4 pr-4 text-ink-soft">{formatDate(o.placed, "medium")}</td>
                  <td className="hidden py-4 pr-4 text-ink-soft sm:table-cell">{o.items}</td>
                  <td className="py-4 pr-4">{o.status}</td>
                  <td className="tabular py-4 text-right">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mt-14 flex flex-col gap-5 border-t border-line pt-8">
        <T k="account.help" as="p" className="max-w-[56ch] text-sm leading-relaxed text-ink-soft" />
        <button type="button" onClick={signOut} data-testid="sign-out"
          className="label inline-flex w-fit items-center gap-2 border border-line px-7 py-4 text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent">
          <Icon name="logout" size={16} /><T k="account.signOut" />
        </button>
      </section>
    </div>
  );
}
