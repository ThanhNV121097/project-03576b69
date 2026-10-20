import { Link } from "react-router-dom";
import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import type { Question } from "../lib/catalogue";

/**
 * The questions the shop is asked most, from src/data/faq.json. A row the
 * owner has not answered yet shows as a waiting line rather than an invented
 * answer — the Studio's Check asks them for it.
 */
export default function Help() {
  usePageMeta("pages.help.title", "pages.help.description");
  const { items } = useCollection<Question>("faq", { pageSize: 10 });
  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      {/* The questions and the two ways to reach the shop side by side, so the
          first screen's right half carries the phone and the email rather than
          nothing. */}
      <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
        <div>
      <T k="help.label" as="p" className="label text-ink-soft" />
      <T k="help.heading" as="h1" className="mt-3" />
      <T k="help.sub" as="p" className="mt-5 max-w-[52ch] text-ink-soft" />

      <dl className="mt-12 border-t border-line">
        {items.map((q, i) => (
          <Reveal key={q.id} delay={Math.min(i, 6) * 40}>
            <div data-record={`faq:${q.id}`} data-testid={`faq-${q.id}`}
              className="grid gap-2 border-b border-line py-6 md:grid-cols-[1fr_1.4fr] md:gap-10">
              <dt className="font-display text-[var(--size-h3)]">
                {q.question || <T k="help.waiting" />}
              </dt>
              <dd className="leading-relaxed text-ink-soft">
                {q.answer || <T k="help.waiting" />}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Link to="/contact" data-testid="help-contact"
        className="label mt-12 inline-flex items-center gap-2 bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85">
        <Icon name="chat" size={16} /><T k="help.contactCta.label" />
      </Link>
        </div>
        <Reach />
      </div>
    </div>
  );
}

/** The two ways to reach the shop, beside the questions. */
function Reach() {
  const phone = useContent<string>("contact.phone");
  const email = useContent<string>("contact.email");
  return (
    <aside className="flex h-fit flex-col gap-6 border-t border-line pt-8 lg:mt-[7.5rem]">
      <T k="contact.label" as="p" className="label text-ink-soft" />
      <div className="flex items-start gap-3">
        <Icon name="phone" size={18} className="mt-1 text-accent" />
        <div>
          <T k="contact.callLabel" as="p" className="label text-ink-soft" />
          <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} data-testid="help-phone"
            className="tabular mt-1 block font-display hover:text-accent">{phone}</a>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Icon name="mail" size={18} className="mt-1 text-accent" />
        <div>
          <T k="contact.mailLabel" as="p" className="label text-ink-soft" />
          <a href={`mailto:${email}`} data-testid="help-email" className="mt-1 block font-display hover:text-accent">{email}</a>
        </div>
      </div>
    </aside>
  );
}
