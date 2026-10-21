import { useMemo, useState } from "react";
import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import Icon from "../components/Icon";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import ShopRail, { type Sort } from "../components/ShopRail";
import { useParams } from "react-router-dom";
import type { Category, Product } from "../lib/catalogue";

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

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      <T k="shop.label" as="p" className="label text-ink-soft" />
      <h1 className="mt-3">{here ? here.name : <T k="shop.heading" />}</h1>
      <p className="mt-4 max-w-[52ch] text-ink-soft">
        {here ? here.description : <T k="shop.sub" />}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-12">
        <ShopRail categories={categories} category={category} total={total} sort={sort} onSort={setSort} />

        <div>
          {shown.length === 0 && !loading ? (
            <T k="shop.empty" as="p" className="text-ink-soft" />
          ) : (
            <Grid max={3}>
              {shown.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 40}>
                  <ProductCard product={p} eager={i < 3} />
                </Reveal>
              ))}
            </Grid>
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
