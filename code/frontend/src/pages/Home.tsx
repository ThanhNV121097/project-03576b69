import { Link } from "react-router-dom";
import { T, useContent, useList } from "../editable";
import { useCollection } from "../data";
import { Picture } from "../picture";
import Icon, { type IconName } from "../components/Icon";
import Rating from "../components/Rating";
import ProductImage from "../components/ProductImage";
import Price from "../components/Price";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import type { Category, Product, Review } from "../lib/catalogue";

/**
 * The home page. The first screen is the direction the owner chose: one dark
 * photograph of the listening room full-bleed across the top two thirds, the
 * headline over its left third running off the right edge of the viewport,
 * the street set vertically up the left margin, and three featured products
 * on dark tiles along the bottom — all in view at 1440×790.
 *
 * The hero and the showroom band carry the `room` class, which restates the
 * seven palette tokens dark inside them (theme.css), so the band is the dark
 * room in light mode too and nothing here needs a raw colour.
 */
export default function Home() {
  const { items: featured } = useCollection<Product>("products", { where: { featured: true }, pageSize: 3 });
  return (
    <>
      <Hero featured={featured} />
      <Categories />
      <Rest />
      <Promises />
      <Reviews />
      <Showroom />
    </>
  );
}

function Hero({ featured }: { featured: Product[] }) {
  const street = useContent<string>("site.street");
  return (
    <section className="room relative isolate overflow-hidden">
      {/* The photograph, full-bleed, across the top two thirds of the screen. */}
      <div className="absolute inset-x-0 top-0 h-[64%]">
        <Picture src="/images/studio-wide.jpg" alt="The listening room at 1142 Folsom Street"
          loading="eager" width={1600} height={900} className="h-full w-full object-cover opacity-[0.52]" />
      </div>

      {/* The street, vertically up the left margin: the counterweight. */}
      <span aria-hidden="true"
        className="label pointer-events-none absolute bottom-[38%] left-3 z-20 hidden text-ink-soft lg:block"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
        {street}
      </span>

      <div className="relative z-10 flex min-h-[calc(100svh-var(--header-h))] flex-col justify-between pt-[clamp(28px,6vh,64px)]">
        {/* The headline over the photograph's left third, running off the right edge. */}
        <div className="mx-auto w-full max-w-page px-[var(--gutter)]">
          <div className="max-w-[60%] lg:max-w-[46%]">
            <T k="hero.eyebrow" as="p" className="label rise text-accent" />
            <h1 className="rise mt-5 whitespace-nowrap" style={{ ["--rise-delay" as string]: "80ms" }}>
              <T k="hero.headline" />
            </h1>
            <div className="rise" style={{ ["--rise-delay" as string]: "160ms" }}>
              <T k="hero.sub" as="p" className="mt-5 max-w-[46ch] text-base leading-relaxed text-ink-soft md:text-lg" />
            </div>
            <div className="rise mt-7 flex flex-wrap items-center gap-3" style={{ ["--rise-delay" as string]: "240ms" }}>
              <Link to="/shop" data-testid="hero-shop"
                className="label whitespace-nowrap bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85">
                <T k="hero.cta.label" />
              </Link>
              <Link to="/contact"
                className="label whitespace-nowrap border border-line px-7 py-4 text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent">
                <T k="hero.secondary.label" />
              </Link>
            </div>
          </div>
        </div>

        {/* Three featured products on dark tiles along the bottom of the screen. */}
        <div className="mx-auto mt-[clamp(24px,4vh,48px)] w-full max-w-page px-[var(--gutter)] pb-[clamp(20px,4vh,44px)]">
          <T k="hero.featuredLabel" as="p" className="label rise mb-4 text-ink-soft"
            style={{ ["--rise-delay" as string]: "320ms" }} />
          <ul className="rise grid grid-cols-1 gap-3 sm:grid-cols-3" style={{ ["--rise-delay" as string]: "380ms" }}>
            {featured.map((p) => (
              <li key={p.id}>
                <Link to={`/product/${p.id}`} data-record={`products:${p.id}`} data-testid={`featured-${p.id}`}
                  className="group flex items-center gap-4 border border-line bg-surface p-3 transition-colors duration-[var(--duration-fast)] hover:border-accent">
                  <div className="w-[72px] shrink-0 sm:w-[80px]">
                    <ProductImage src={p.image} alt={p.name} aspect="1/1" eager
                      slot={`/images/products/${p.id}.png`} caption={p.name}
                      className="transition-transform duration-[var(--duration-fast)] group-hover:scale-[1.03]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[var(--size-h3)]">{p.name}</p>
                    <Price amount={p.price} was={p.oldPrice} className="mt-1 text-accent" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const { items } = useCollection<Category>("categories");
  return (
    <Reveal as="section" className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-24)]">
      <T k="home.categories.label" as="p" className="label text-ink-soft" />
      <T k="home.categories.heading" as="h2" className="mt-3" />
      <T k="home.categories.sub" as="p" className="mt-4 max-w-[52ch] text-ink-soft" />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((c) => (
          <li key={c.id}>
            <Link to={`/shop/${c.id}`} data-record={`categories:${c.id}`} data-testid={`category-${c.id}`}
              className="group flex h-full flex-col gap-4 border border-line bg-surface p-5 transition-colors duration-[var(--duration-fast)] hover:border-accent">
              <ProductImage src={c.image} alt={c.name} aspect="4/3" caption={c.name}
                slot={`/images/categories/${c.id}.png`}
                className="transition-transform duration-[var(--duration-fast)] group-hover:scale-[1.02]" />
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display">{c.name}</h3>
                <Icon name="arrow" size={18} className="text-accent" />
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">{c.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** The nine that are not in the hero, so the home page shows the whole shop. */
function Rest() {
  const { items, total } = useCollection<Product>("products", { pageSize: 12 });
  const rest = items.filter((p) => !p.featured);
  if (rest.length < 3) return null;
  return (
    <Reveal as="section" className="mx-auto max-w-page px-[var(--gutter)] pb-[var(--space-24)]">
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-8">
        <div>
          <T k="shop.label" as="p" className="label text-ink-soft" />
          <T k="shop.heading" as="h2" className="mt-3" />
        </div>
        <Link to="/shop" data-testid="shop-all"
          className="label flex items-center gap-2 whitespace-nowrap text-accent hover:underline">
          <span className="tabular">{total}</span>
          <T k="shop.countMany" />
          <Icon name="arrow" size={16} />
        </Link>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <li key={p.id}><ProductCard product={p} /></li>
        ))}
      </ul>
    </Reveal>
  );
}

function Promises() {
  const items = useList<{ icon: IconName; title: string; body: string }>("home.promises.items");
  return (
    <Reveal as="section" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <T k="home.promises.label" as="p" className="label text-ink-soft" />
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <li key={p.title} className="flex gap-4">
              <Icon name={p.icon} size={22} className="mt-1 text-accent" />
              <div>
                <T k={`home.promises.items.${i}.title`} as="h3" className="text-base" />
                <T k={`home.promises.items.${i}.body`} as="p" className="mt-2 text-sm leading-relaxed text-ink-soft" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function Reviews() {
  const { items } = useCollection<Review>("reviews", { pageSize: 4 });
  const said = items.filter((r) => r.quote);
  if (said.length < 3) return null;
  return (
    <Reveal as="section" className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-24)]">
      <T k="home.reviews.label" as="p" className="label text-ink-soft" />
      <T k="home.reviews.heading" as="h2" className="mt-3" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {said.map((r) => (
          <li key={r.id} data-record={`reviews:${r.id}`}
            className="flex flex-col gap-4 border-t border-line pt-5">
            <Rating value={r.rating} />
            <blockquote className="leading-relaxed">{r.quote}</blockquote>
            <p className="mt-auto text-sm text-ink-soft">{r.name} · {r.from}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Showroom() {
  return (
    <Reveal as="section" className="room relative isolate overflow-hidden">
      <Picture src="/images/turntable-close.jpg" alt="A record playing in the Loop Audio showroom"
        width={1200} height={900} className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="relative mx-auto max-w-page px-[var(--gutter)] py-[var(--space-24)]">
        <div className="max-w-[46ch]">
          <T k="home.showroom.label" as="p" className="label text-accent" />
          <T k="home.showroom.heading" as="h2" className="mt-3" />
          <T k="home.showroom.body" as="p" className="mt-4 leading-relaxed text-ink-soft" />
          <Link to="/contact" data-testid="showroom-contact"
            className="label mt-7 inline-flex items-center gap-2 whitespace-nowrap border border-line px-7 py-4 text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent">
            <Icon name="address" size={16} />
            <T k="home.showroom.cta.label" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
