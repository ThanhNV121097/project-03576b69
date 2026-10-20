import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection, useRecord } from "../data";
import { usePageMeta } from "../seo";
import Icon from "../components/Icon";
import Rating from "../components/Rating";
import ProductImage from "../components/ProductImage";
import ProductCard from "../components/ProductCard";
import Price from "../components/Price";
import Reveal from "../components/Reveal";
import { addLine } from "../lib/mock/cart";
import type { Product as ProductRow, Review } from "../lib/catalogue";

/**
 * One product. The first screen carries the large picture, the name, the
 * price, the stock line, the stepper and the add-to-cart button together; the
 * full spec table is a hairline-ruled two-column table below it.
 */
export default function Product() {
  const { id } = useParams<{ id: string }>();
  usePageMeta("pages.product.title", "pages.product.description");
  const { item, loading } = useRecord<ProductRow>("products", id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const stockLeft = useContent<string>("product.stockLeft");
  const lessLabel = useContent<string>("product.less");
  const moreLabel = useContent<string>("product.more");

  const { items: siblings } = useCollection<ProductRow>("products", item ? { where: { category: item.category }, pageSize: 12 } : { pageSize: 1 });
  const { items: reviews } = useCollection<Review>("reviews", item ? { where: { product: item.id }, pageSize: 4 } : { pageSize: 1 });
  const related = siblings.filter((p) => p.id !== item?.id).slice(0, 3);

  if (loading) return <p className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)] text-ink-soft"><T k="shop.loading" /></p>;
  if (!item) return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      <T k="shop.empty" as="p" className="text-ink-soft" />
      <Link to="/shop" className="label mt-6 inline-flex items-center gap-2 text-accent hover:underline">
        <Icon name="back" size={16} /><T k="product.backToShop" />
      </Link>
    </div>
  );

  function add() {
    addLine({ id: item!.id, name: item!.name, price: item!.price, image: item!.image, unit: item!.unit }, quantity);
    setAdded(true);
  }

  return (
    <div data-record={`products:${item.id}`} className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <Link to={`/shop/${item.category}`} data-testid="back-to-shelf"
        className="label inline-flex items-center gap-2 text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink">
        <Icon name="back" size={16} /><T k="product.backToShop" />
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <ProductImage src={item.image} alt={item.name} aspect="1/1" eager
          slot={`/images/products/${item.id}.png`} caption={item.name} />

        <div className="flex flex-col">
          <h1 className="text-[var(--size-h2)]">{item.name}</h1>
          <p className="mt-4 leading-relaxed text-ink-soft">{item.summary}</p>

          <div className="mt-7 flex items-baseline justify-between gap-4 border-t border-line pt-5">
            <span data-testid="product-price"><Price amount={item.price} was={item.oldPrice} size="lg" className="text-accent" /></span>
            <span className="label text-ink-soft">{item.unit}</span>
          </div>

          <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
            <Icon name={item.available && item.stock > 0 ? "check" : "alert"} size={16} className="text-accent" />
            {item.available && item.stock > 0
              ? <span><span className="tabular">{item.stock}</span> {stockLeft}</span>
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
                onClick={() => setQuantity((q) => Math.min(item.stock || 99, q + 1))}
                className="grid h-12 w-12 place-items-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-accent">
                <Icon name="plus" size={16} />
              </button>
            </div>
            <button type="button" onClick={add} data-testid="add-to-cart" disabled={!item.available || item.stock === 0}
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
        </div>
      </div>

      <Reveal as="section" className="mt-[var(--space-24)] grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <T k="product.about" as="h2" />
          <p className="mt-5 max-w-[60ch] leading-relaxed text-ink-soft">{item.details}</p>
        </div>
        <div>
          <T k="product.specs" as="h2" />
          <table className="mt-5 w-full border-collapse text-sm">
            <tbody>
              {item.specs.map((s) => (
                <tr key={s.label} className="border-b border-line">
                  <th scope="row" className="label w-[40%] py-3 pr-4 text-left align-top font-normal text-ink-soft">{s.label}</th>
                  <td className="py-3 align-top">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {reviews.length > 0 && (
        <Reveal as="section" className="mt-[var(--space-24)] border-t border-line pt-10">
          <T k="product.reviews" as="h2" />
          <ul className="mt-8 grid gap-8 sm:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.id} data-record={`reviews:${r.id}`} className="flex flex-col gap-3">
                <Rating value={r.rating} />
                <blockquote className="leading-relaxed">{r.quote}</blockquote>
                <p className="text-sm text-ink-soft">{r.name} · {r.from}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {related.length >= 3 && (
        <Reveal as="section" className="mt-[var(--space-24)] border-t border-line pt-10">
          <T k="product.related" as="h2" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
          </ul>
        </Reveal>
      )}
    </div>
  );
}
