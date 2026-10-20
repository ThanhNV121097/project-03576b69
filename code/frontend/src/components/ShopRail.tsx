import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import type { Category } from "../lib/catalogue";
import Icon from "./Icon";

export type Sort = "default" | "priceUp" | "priceDown";

/**
 * The shelves, the sort and the count: a rail down the left of the catalogue
 * from 1024px, a wrapping row of links below it.
 */
export default function ShopRail({ categories, category, total, sort, onSort }: {
  categories: Category[];
  category?: string;
  total: number;
  sort: Sort;
  onSort: (s: Sort) => void;
}) {
  const allLabel = useContent<string>("shop.all");
  const sortLabel = useContent<string>("shop.sortLabel");
  const sortNames: Record<Sort, string> = {
    default: useContent<string>("shop.sort.default"),
    priceUp: useContent<string>("shop.sort.priceUp"),
    priceDown: useContent<string>("shop.sort.priceDown"),
  };
  const link = "label flex items-center justify-between gap-3 border-b border-line pb-2 transition-colors duration-[var(--duration-fast)]";
  const on = "text-accent";
  const off = "text-ink-soft hover:text-ink";

  return (
    <aside className="flex flex-col gap-8">
      <nav className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-3">
        <Link to="/shop" data-testid="filter-all" className={`${link} ${category ? off : on}`}>
          {allLabel}
        </Link>
        {categories.map((c) => (
          <Link key={c.id} to={`/shop/${c.id}`} data-testid={`filter-${c.id}`}
            className={`${link} ${category === c.id ? on : off}`}>
            {c.name}
          </Link>
        ))}
      </nav>

      <label className="flex flex-col gap-2">
        <span className="label flex items-center gap-2 text-ink-soft">
          <Icon name="sort" size={14} />
          {sortLabel}
        </span>
        <select id="shop-sort" value={sort} onChange={(e) => onSort(e.target.value as Sort)}
          className="w-full bg-surface px-3 py-2 text-sm text-ink">
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
  );
}
