import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import Icon from "../components/Icon";
import ContactForm from "../components/ContactForm";
import { Picture } from "../picture";

/**
 * Contact: the owner's own phone, email, street and opening hours exactly as
 * they gave them, and the message form, which reaches the owner in Agent
 * Team. The home page's showroom button lands here, so the hours and the
 * directions it promises are on this page.
 */
export default function Contact() {
  usePageMeta("pages.contact.title", "pages.contact.description");
  const phone = useContent<string>("contact.phone");
  const email = useContent<string>("contact.email");
  const address = useContent<string>("contact.address");
  const hours = useContent<string>("contact.hours");
  return (
    <div className="mx-auto grid max-w-page gap-0 lg:grid-cols-[1fr_1fr]">
      <section className="room relative isolate overflow-hidden px-[var(--gutter)] py-[var(--space-16)]">
        <Picture src="/images/studio-wide.jpg" alt="The listening room at Loop Audio"
          width={1200} height={800} className="absolute inset-0 h-full w-full object-cover opacity-[0.32]" />
        <div className="relative max-w-[44ch]">
          <T k="contact.label" as="p" className="label text-accent" />
          <T k="contact.heading" as="h1" className="mt-3 text-[var(--size-h2)]" />
          <T k="contact.sub" as="p" className="mt-5 leading-relaxed text-ink-soft" />

          <ul className="mt-12 flex flex-col gap-6 border-t border-line pt-8">
            <li className="flex items-start gap-4">
              <Icon name="phone" size={20} className="mt-1 text-accent" />
              <div>
                <T k="contact.callLabel" as="p" className="label text-ink-soft" />
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} data-testid="contact-phone"
                  className="tabular mt-1 block font-display text-[var(--size-h3)] hover:text-accent">{phone}</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Icon name="mail" size={20} className="mt-1 text-accent" />
              <div>
                <T k="contact.mailLabel" as="p" className="label text-ink-soft" />
                <a href={`mailto:${email}`} data-testid="contact-email"
                  className="mt-1 block font-display text-[var(--size-h3)] hover:text-accent">{email}</a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-line px-[var(--gutter)] py-[var(--space-16)] lg:border-l lg:border-t-0">
        <T k="contact.formHeading" as="h2" />
        <T k="contact.formSub" as="p" className="mt-4 max-w-[44ch] leading-relaxed text-ink-soft" />
        <ContactForm className="mt-8 max-w-[480px]" />
      </section>
    </div>
  );
}
