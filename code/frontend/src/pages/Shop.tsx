import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import type { Category, Product } from "../lib/catalogue";

type Sort = "default" | "priceUp" | "priceDown";

/**
 * The catalogue, at /shop and /shop/<category>. Two columns, not three equal
 * ones: the shelves and the sort are a rail down the left from 1024px, the
 * products are the wider right column.
 */
export default function Shop() {
  const { category } = useParams<{ category?: string }>();
  usePageMeta(category ? "pages.category.title" : "pages.shop.title", category ? "pages.category.description" : "pages.shop.description");

  const [sort, setSort] = useState<Sort>("default");
  const { items: categories } = useCollection<Category>("categories");
  const { items, total, hasMore, loading, loadMore } = useCollection<Product>(
    "products",
    category ? { where: { category }, pageSize: 12 } : { pageSize: 6 },
  );

  const shown = useMemo(() => {
    const list = [...items];
    if (sort === "priceUp") list.sort((a, b) => a.price - b.price);
    if (sort === "priceDown") list.sort((a, b) => b.price - a.price);
    return list;
  }, [items, sort]);

  const here = categories.find((c) => c.id === category);
  const allLabel = useContent<string>("shop.all");
  const sortLabel = useContent<string>("shop.sortLabel");
  const sortNames: Record<Sort, string> = {
    default: useContent<string>("shop.sort.default"),
    priceUp: useContent<string>("shop.sort.priceUp"),
    priceDown: useContent<string>("shop.sort.priceDown"),
  };

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      <T k="shop.label" as="p" className="label text-ink-soft" />
      <h1 className="mt-3">{here ? here.name : <T k="shop.heading" />}</h1>
      <p className="mt-4 max-w-[52ch] text-ink-soft">
        {here ? here.description : <T k="shop.sub" />}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-12">
        <aside className="flex flex-col gap-8">
          <nav className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-3">
            <Link to="/shop" data-testid="filter-all"
              className={`label flex items-center justify-between gap-3 border-b border-line pb-2 transition-colors duration-[var(--duration-fast)] ${category ? "text-ink-soft hover:text-ink" : "text-accent"}`}>
              {allLabel}
            </Link>
            {categories.map((c) => (
              <Link key={c.id} to={`/shop/${c.id}`} data-testid={`filter-${c.id}`}
                className={`label flex items-center justify-between gap-3 border-b border-line pb-2 transition-colors duration-[var(--duration-fast)] ${category === c.id ? "text-accent" : "text-ink-soft hover:text-ink"}`}>
                {c.name}
              </Link>
            ))}
          </nav>

          <label className="flex flex-col gap-2">
            <span className="label flex items-center gap-2 text-ink-soft">
              <Icon name="sort" size={14} />
              {sortLabel}
            </span>
            <select id="shop-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}
              className="w-full border border-line bg-surface px-3 py-2 text-sm text-ink">
              <option value="default">{sortNames.default}</option>
              <option value="priceUp">{sortNames.priceUp}</option>
              <option value="priceDown">{sortNames.priceDown}</option>
            </select>
          </label>

          <p className="label text-ink-soft">
            <span className="tabular" data-testid="shop-count">{total}</span>{" "}
            <T k={total === 1 ? "shop.countOne" : "shop.countMany"} />
          </p>
        </aside>

        <div>
          {shown.length === 0 && !loading ? (
            <T k="shop.empty" as="p" className="text-ink-soft" />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((p, i) => (
                <Reveal as="li" key={p.id} delay={Math.min(i, 5) * 40}>
                  <ProductCard product={p} eager={i < 3} />
                </Reveal>
              ))}
            </ul>
          )}
          {loading && <T k="shop.loading" as="p" className="mt-8 text-sm text-ink-soft" />}
          {hasMore && !loading && (
            <button type="button" onClick={loadMore} data-testid="show-more"
              className="label mt-10 inline-flex items-center gap-2 border border-line px-7 py-4 text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent">
              <T k="shop.showMore" />
              <Icon name="expand" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
