import { Link, useParams } from "react-router-dom";
import { T } from "../editable";
import { useRecord } from "../data";
import { usePageMeta } from "../seo";
import { formatDate } from "../lib/format";
import { paidOrder } from "../lib/mock/orders";
import Icon from "../components/Icon";
import Price from "../components/Price";
import type { OrderRow } from "../lib/catalogue";

/**
 * The confirmation, after the payment: the order number, what is in it and
 * what it cost. An order paid for in this browser is read from the mock; an
 * older one is read from src/data/orders.json, so the Studio and the walk
 * can open /order/la-2417 without paying first.
 */
export default function Order() {
  const { id } = useParams<{ id: string }>();
  usePageMeta("pages.order.title", "pages.order.description");
  const { item } = useRecord<OrderRow>("orders", id);
  const order = paidOrder(id ?? "") ?? item;

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      <T k="order.label" as="p" className="label text-ink-soft" />
      <h1 data-testid="order-confirmed" className="mt-3 flex items-center gap-3">
        <Icon name="done" size={30} className="text-accent" />
        <T k="order.heading" />
      </h1>
      <T k="order.sub" as="p" className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft" />

      {order && (
        <dl data-record={`orders:${order.id}`} className="mt-12 grid max-w-[640px] gap-0 border-t border-line">
          <Row label="order.number"><span data-testid="order-number" className="tabular uppercase">{order.id}</span></Row>
          <Row label="order.placed"><span className="tabular">{formatDate(order.placed, "medium")}</span></Row>
          <Row label="order.status">{order.status}</Row>
          <Row label="order.items">{order.items}</Row>
          <Row label="order.total"><Price amount={order.total} className="text-accent" /></Row>
        </dl>
      )}

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/account" data-testid="order-account"
          className="label inline-flex items-center gap-2 bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85">
          <Icon name="package" size={16} /><T k="order.cta.label" />
        </Link>
        <Link to="/shop"
          className="label inline-flex items-center gap-2 border border-line px-7 py-4 text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent">
          <T k="order.shopCta.label" />
        </Link>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-4">
      <T k={label} as="dt" className="label text-ink-soft" />
      <dd className="text-right">{children}</dd>
    </div>
  );
}
